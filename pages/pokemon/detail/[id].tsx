import { useRouter } from "next/router";
import { Container, Box, CircularProgress } from "@mui/material";
import { Pokemon } from "@types";
import { useQuery } from "react-query";
import { fetchPokemonDetail } from "@pages/api";
import Stat from "./view/Stat";
import OtherImages from "./view/OtherImages";
import ProfilePokemon from "./view/ProfilePokemon";
import Evolution from "./view/Evolution";
import NoticeBanner from "@pages/components/NoticeBanner";

const PokemonDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const pokemonId = Array.isArray(id) ? id[0] : id;

    const {
        data: pokemon,
        isLoading,
        error,
    } = useQuery<Pokemon>(
        ["pokemon", pokemonId],
        () => fetchPokemonDetail(pokemonId as string),
        {
            enabled: !!pokemonId,
        },
    );

    if (isLoading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        );
    if (error)
        return (
            <NoticeBanner shortTitle="Error Fetching Data" color="error.main" />
        );

    return (
        <Container maxWidth="xl">
            <Box component="div">
                <ProfilePokemon pokemon={pokemon} />

                <Box sx={{ paddingX: 3 }}>
                    <OtherImages pokemon={pokemon} />
                    <Stat pokemon={pokemon} />
                    <Evolution id={pokemonId} />
                </Box>
            </Box>
        </Container>
    );
};

export default PokemonDetail;
