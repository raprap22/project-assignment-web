import { useState } from "react";
import {
    Grid,
    Typography,
    Box,
    CircularProgress,
    Container,
} from "@mui/material";
import { useQuery } from "react-query";
import { fetchPokemonList } from "@pages/api";
import PokeCard from "@pages/pokemon/components/Card";
import PokePagination from "@pages/components/Pagination";
import DetailModal from "./view/ModalDetail";
import NoticeBanner from "@pages/components/NoticeBanner";

const PokeDex: React.FC<{ pokeDexRef: React.RefObject<HTMLElement> }> = ({
    pokeDexRef,
}) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(9);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading, error } = useQuery(
        ["pokemons", page, perPage],
        () => fetchPokemonList(page, perPage),
    );

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPage(value);
    };

    const handlePerPageChange = (value: number) => {
        setPerPage(value);
        setPage(1);
    };

    const handleCardClick = (pokemon: any) => {
        setSelectedPokemon(pokemon);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <NoticeBanner shortTitle="Error Fetching Data" color="error.main"/>;
    }

    return (
        <Box
            sx={{ backgroundColor: "background.default", position: "relative" }}
            component="div"
            ref={pokeDexRef}
        >
            <Container maxWidth="xl">
                <Box component="div">
                    <Box sx={{ paddingY: "60px" }}>
                        <Typography
                            variant="h4"
                            align="center"
                            gutterBottom
                            sx={{ fontWeight: "bold", color: "text.primary" }}
                        >
                            PokèDex
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            sx={{ marginBottom: 2, color: "text.primary" }}
                        >
                            All Generation totaling
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            sx={{ marginBottom: 2, color: "text.primary" }}
                        >
                            {data?.total} Pokemon
                        </Typography>
                    </Box>

                    <Grid
                        container
                        spacing={10}
                        sx={{ position: "relative", zIndex: 9 }}
                    >
                        {data?.pokemons.map((pokemon) => (
                            <Grid item xs={12} sm={6} md={4} key={pokemon.id}>
                                <PokeCard
                                    id={pokemon.id}
                                    name={pokemon.name}
                                    types={pokemon.types}
                                    image={pokemon.image}
                                    onClick={() => handleCardClick(pokemon)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100px",
                            height: "100px",
                            borderBottom: "200px solid #FFD86C",
                            borderRight: "200px solid #FFD86C",
                            borderRadius: "0 0 550px 0",
                        }}
                    />
                    <PokePagination
                        page={page}
                        count={Math.ceil(data?.total / perPage)}
                        onChange={handlePageChange}
                        perPage={perPage}
                        setPerPage={handlePerPageChange}
                        totalData={data?.total}
                        color="white"
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            width: "100px",
                            height: "100px",
                            borderTop: "200px solid #FFD86C",
                            borderLeft: "200px solid #FFD86C",
                            borderRadius: "550px 0 0 0",
                        }}
                    />
                </Box>
                {selectedPokemon && (
                    <DetailModal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        pokemon={selectedPokemon.name}
                    />
                )}
            </Container>
        </Box>
    );
};

export default PokeDex;
