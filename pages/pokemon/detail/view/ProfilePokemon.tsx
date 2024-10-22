import { Typography, Box, Chip, Avatar } from "@mui/material";
import { Pokemon } from "@types";

const ProfilePokemon = ({ pokemon }: { pokemon: Pokemon }) => {
    return (
        <Box
            display="flex"
            alignItems="start"
            mb={4}
            sx={{ paddingX: 3, marginTop: 10 }}
        >
            <Box mr={4}>
                <Avatar
                    variant="square"
                    src={pokemon?.sprites.front_default}
                    alt={pokemon?.name}
                    sx={{
                        width: 350,
                        height: 350,
                        backgroundColor: "#B3B6B8",
                    }}
                />
            </Box>
            <Box display="flex" flexDirection="column" gap={5}>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="text.primary"
                    textTransform="capitalize"
                >
                    {pokemon?.name}
                </Typography>
                <Box display="inline-flex" gap={10}>
                    <Typography fontWeight="bold" display="inline-flex" gap={2}>
                        Weight:{" "}
                        <Typography fontWeight="light">
                            {pokemon?.weight}
                        </Typography>
                    </Typography>
                    <Typography fontWeight="bold" display="inline-flex" gap={2}>
                        Height:{" "}
                        <Typography fontWeight="light">
                            {pokemon?.height}
                        </Typography>
                    </Typography>
                </Box>
                <Box
                    sx={{
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
                        {pokemon?.abilities.map((ability, index) => (
                            <li key={index}>{ability.ability.name}</li>
                        ))}
                    </ul>
                </Box>
                <Box mb={4} display="inline-flex" gap={3}>
                    <Typography fontWeight="bold">Type:</Typography>
                    <Box display="flex" gap={2}>
                        {pokemon?.types.map((type, index) => (
                            <Chip
                                key={index}
                                label={type.type.name}
                                color="primary"
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePokemon;
