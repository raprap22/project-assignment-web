import { Box, Typography, Avatar, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";
import { useQuery } from "react-query";
import {
    fetchEvolutionChain,
    fetchPokemon,
    fetchPokemonSpecies,
} from "@pages/api";
import { useRouter } from "next/router";
import NoticeBanner from "@pages/components/NoticeBanner";

const Evolution = ({ id }: { id: string }) => {
    const router = useRouter();

    const buildEvolutionChain = (chain) => {
        const evolutions = [];
        let current = chain;

        while (current) {
            evolutions.push({
                name: current.species.name,
                url: current.species.url,
            });
            current = current.evolves_to[0] || null;
        }

        return evolutions;
    };

    const { data: evolutionChainUrl } = useQuery(["pokemon-species", id], () =>
        fetchPokemonSpecies(id),
    );

    const { data: evolutionChain } = useQuery(
        ["evolution-chain", evolutionChainUrl],
        () => fetchEvolutionChain(evolutionChainUrl),
        { enabled: !!evolutionChainUrl },
    );

    const evolutions = evolutionChain
        ? buildEvolutionChain(evolutionChain)
        : [];

    const { data: pokemonImages } = useQuery(
        ["evolution-images", evolutions],
        async () => {
            const imagePromises = evolutions.map((evolution) => {
                const pokemonId = evolution.url
                    .split("/")
                    .filter(Boolean)
                    .pop();
                return fetchPokemon(pokemonId);
            });
            return Promise.all(imagePromises);
        },
        { enabled: evolutions.length > 0 },
    );

    const getBorderColor = (index: number) => {
        const colors = ["#01B956", "#E6AB09", "#E66D00", "#DE2C2C"];
        return colors[index % colors.length];
    };

    const handleEvolutionClick = (pokemonName: string) => {
        router.push(`/pokemon/detail/${pokemonName}`);
    };

    return (
        <Box mt={4} mb={4}>
            <Typography fontWeight="bold" paddingY={3}>
                Evolution:
            </Typography>
            <Grid
                container
                alignItems="start"
                justifyContent="start"
                spacing={2}
            >
                {!pokemonImages ? (
                    <NoticeBanner shortTitle="Evolution Not Found" color="error.main"/>
                ) : (
                    pokemonImages?.map((pokemon, index) => (
                        <Grid
                            container
                            item
                            xs={3}
                            key={pokemon.id}
                            alignItems="center"
                        >
                            <Grid
                                item
                                textAlign="center"
                                onClick={() =>
                                    handleEvolutionClick(pokemon.name)
                                }
                                sx={{ cursor: "pointer" }}
                            >
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                        border: `8px solid ${getBorderColor(
                                            index,
                                        )}`,
                                        borderRadius: "50%",
                                        height: 150,
                                        width: 150,
                                        textAlign: "center",
                                    }}
                                >
                                    <Avatar
                                        src={pokemon.image}
                                        sx={{ width: 100, height: 100 }}
                                    />
                                </Box>
                                <Typography
                                    variant="body1"
                                    fontWeight="bold"
                                    mt={1}
                                >
                                    {pokemon.name}
                                </Typography>
                            </Grid>
                            {index < pokemonImages.length - 1 && (
                                <Grid item>
                                    <ArrowForwardIcon
                                        sx={{
                                            fontSize: 40,
                                            color: "#000",
                                            marginLeft: 10,
                                            fontWeight: "bold",
                                        }}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default Evolution;
