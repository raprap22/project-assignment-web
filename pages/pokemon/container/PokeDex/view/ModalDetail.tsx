import React from "react";
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    Button,
    Chip,
    CircularProgress,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "react-query";
import { fetchPokemon } from "@pages/api";
import Image from "next/image";
import { useRouter } from "next/router";

interface DetailModalProps {
    open: boolean;
    onClose: () => void;
    pokemon: string;
}

const DetailModal: React.FC<DetailModalProps> = ({
    open,
    onClose,
    pokemon,
}) => {
    const router = useRouter();
    const {
        data: pokemonData,
        isLoading,
        error,
    } = useQuery(["pokemonDetail", pokemon], () => fetchPokemon(pokemon), {
        enabled: !!pokemon,
    });

    const handleDetail = (pokemon: string) => {
        router.push(`/pokemon/detail/${pokemon}`);
    };

    const handleClickType = (type: string) => {
        router.push(`pokemon-types/${type}`);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: "16px",
                },
            }}
        >
            <DialogContent
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#f9f9f9",
                }}
            >
                {isLoading ? (
                    <Box
                        sx={{
                            display: "inline-flex",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <IconButton
                            onClick={onClose}
                            sx={{
                                position: "absolute",
                                top: 16,
                                right: 16,
                                color: "grey",
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Box
                            sx={{
                                width: "45%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#B0B0B0",
                                borderRadius: "8px",
                            }}
                        >
                            <Image
                                src={pokemonData.image}
                                alt={pokemonData.name}
                                width={260}
                                height={260}
                            />
                        </Box>

                        <Box sx={{ width: "50%", ml: 2 }}>
                            <Typography
                                variant="h5"
                                sx={{ fontWeight: "bold" }}
                            >
                                {pokemon}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mt: 2,
                                }}
                            >
                                <Typography>
                                    <strong>Weight:</strong>{" "}
                                    {pokemonData.weight}
                                </Typography>
                                <Typography>
                                    <strong>Height:</strong>{" "}
                                    {pokemonData.height}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    justifyContent: "space-between",
                                    display: "inline-flex",
                                }}
                            >
                                <Typography
                                    sx={{
                                        mt: 2,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Abilities:
                                </Typography>
                                <ul>
                                    {pokemonData.abilities.map(
                                        (ability: string, index: number) => (
                                            <li key={index}>
                                                <Typography>
                                                    {ability}
                                                </Typography>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </Box>
                            <Box
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Typography sx={{ mr: 1 }}>
                                    <strong>Type:</strong>
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {pokemonData.types.map((type, index) => (
                                        <Chip
                                            key={index}
                                            label={type}
                                            color={
                                                index % 2 === 0
                                                    ? "primary"
                                                    : "secondary"
                                            }
                                            onClick={() =>
                                                handleClickType(type)
                                            }
                                        />
                                    ))}
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    backgroundColor: "#FFC107",
                                    color: "#fff",
                                    fontWeight: "bold",
                                }}
                                onClick={() => handleDetail(pokemon)}
                            >
                                More Detail
                            </Button>
                        </Box>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default DetailModal;
