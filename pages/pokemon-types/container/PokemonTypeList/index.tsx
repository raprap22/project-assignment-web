import {
    Avatar,
    Box,
    Card,
    Chip,
    Container,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
import PokemonCard from "../PokemonCard";
import Image from "next/image";
import { useRouter } from "next/router";

interface PokemonListProps {
    pokemons: {
        image: string;
        name: string;
        id: number;
        types: string[];
    }[];
}

const PokemonTypeList: React.FC<PokemonListProps> = ({ pokemons }) => {
    const router = useRouter();

    return pokemons.map((pokemon) => (
        <>
            <Box
                display="flex"
                margin={3}
                justifyContent="space-between"
                sx={{
                    ":hover": {
                        backgroundColor: "#F7F8F8",
                    },
                    alignItems: "center",
                    cursor: "pointer",
                }}
                onClick={() => router.push(`/pokemon/detail/${pokemon.name}`)}
            >
                <Avatar
                    src={pokemon.image}
                    alt={pokemon.name}
                    sx={{
                        width: 150,
                        height: 150,
                        backgroundColor: "#B3B6B8",
                        objectFit: "cover",
                        maxWidth: 150,
                    }}
                    variant="square"
                />
                <Box
                    marginLeft={3}
                    // borderLeft="1px solid #d7dbdb"
                    // borderRight="1px solid #d7dbdb"
                    height={150}
                    width={150}
                    alignItems="center"
                    display="flex"
                    justifyContent="center"
                >
                    <Typography
                        sx={{
                            paddingX: 3,
                            fontWeight: "bold",
                            fontSize: 20,
                            width: 100,
                            color: "text.primary",
                        }}
                    >
                        #{String(pokemon?.id).padStart(3, "0")}
                    </Typography>
                </Box>
                <Box
                    // borderRight="1px solid #d7dbdb"
                    height={150}
                    width={200}
                    alignItems="center"
                    textAlign="start"
                    display="flex"
                >
                    <Typography
                        sx={{
                            paddingX: 3,
                            fontWeight: "bold",
                            fontSize: 20,
                            color: "text.primary",
                        }}
                    >
                        {pokemon.name}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                        paddingX: pokemon?.types?.length > 1 ? 1 : 5,
                    }}
                >
                    {pokemon?.types?.map((type, index) => (
                        <Chip
                            key={index}
                            label={type}
                            color={index % 2 === 0 ? "primary" : "secondary"}
                        />
                    ))}
                </Box>
            </Box>
            <Divider />
        </>
    ));
};

export default PokemonTypeList;
