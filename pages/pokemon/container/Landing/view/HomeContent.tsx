import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";

const HomeContent = ({ onCheckPokedex }: { onCheckPokedex: () => void }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                minHeight: "80vh",
                color: "text.primary",
                paddingY:7
            }}
        >
            <Box width="534px" sx={{ marginRight: "140px" }}>
                <Typography
                    variant="h2"
                    sx={{ fontWeight: "bold", marginBottom: 2 }}
                >
                    All the Pokémon data you'll ever need in one place!
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{ marginBottom: 4, color: "text.secondary" }}
                >
                    Thousands of data compiled into one place
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ borderRadius: "14px" }}
                >
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            color: "white",
                            fontSize: "15px",
                            paddingX: "15px",
                            paddingY: "5px",
                        }}
                        onClick={onCheckPokedex}
                    >
                        Check PokèDex
                    </Typography>
                </Button>
            </Box>
            <Box>
                <Image
                    src="/Image/pokemon.png"
                    alt="Pokemon"
                    width={500}
                    height={500}
                />
            </Box>
        </Box>
    );
};

export default HomeContent;
