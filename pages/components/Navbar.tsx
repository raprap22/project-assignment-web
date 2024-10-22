import React from "react";
import { AppBar, Toolbar, Box, Container } from "@mui/material";
import Image from "next/image";
import CustomLink from "@pages/pokemon/components/Link";

const TopNavbar: React.FC = () => {
    return (
        <Container maxWidth="xl">
            <Box component="div">
                <AppBar position="static" color="transparent" elevation={0}>
                    <Toolbar>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Image
                                src="/Image/pokemon-logo.png"
                                alt="Pokemon Logo"
                                width={160}
                                height={50}
                            />
                        </Box>
                        <Box
                            sx={{
                                marginLeft: "60px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <CustomLink href="/pokemon">Home</CustomLink>
                            <CustomLink href="/pokemon-types">
                                Pokemon Type
                            </CustomLink>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </Container>
    );
};

export default TopNavbar;
