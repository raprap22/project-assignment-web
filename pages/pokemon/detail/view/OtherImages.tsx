import { Container, Typography, Box, Chip, Grid, Avatar } from "@mui/material";
import { Pokemon } from "@types";

const OtherImages = ({ pokemon }: { pokemon: Pokemon }) => {
    return (
        <Box mb={4}>
            <Typography variant="h6" fontWeight="bold" paddingY={3}>
                Other Images:
            </Typography>
            <Grid container spacing={2}>
                {Object.values(pokemon?.sprites).map((sprite, index) =>
                    typeof sprite === "string" ? (
                        <Grid item xs={4} sm={2} key={index}>
                            <Avatar
                                src={sprite}
                                alt={`sprite-${index}`}
                                variant="square"
                                sx={{
                                    width: 200,
                                    height: 200,
                                    backgroundColor: "#B3B6B8",
                                }}
                            />
                        </Grid>
                    ) : null,
                )}
            </Grid>
        </Box>
    );
};

export default OtherImages;
