import { STAT_COLORS } from "@constants/config";
import { Container, Typography, Box, Chip, Grid, Avatar } from "@mui/material";
import { Pokemon } from "@types";

const Stat = ({ pokemon }: { pokemon: Pokemon }) => {
    return (
        <Box mb={4}>
            <Typography fontWeight="bold" paddingY={3}>
                Stats:
            </Typography>
            <Grid container spacing={2}>
                {pokemon?.stats.map((stat, index) => {
                    const colorStat = STAT_COLORS[stat.stat.name] || "black";

                    return (
                        <Grid item xs={4} sm={2} key={index}>
                            <Box
                                textAlign="center"
                                sx={{
                                    border: `40px solid ${colorStat}`,
                                    borderRadius: 900,
                                    height: 120,
                                    padding: 2,
                                    width: 120,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    display: "flex",
                                }}
                            >
                                <Box>
                                    <Typography
                                        color={colorStat}
                                        variant="h3"
                                        fontWeight="bold"
                                    >
                                        {stat.base_stat}
                                    </Typography>
                                    <Typography color={colorStat}>
                                        {stat.stat.name}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default Stat;
