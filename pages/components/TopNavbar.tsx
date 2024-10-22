import React from "react";
import { Box, Container, MenuItem, Select } from "@mui/material";
import common from "../../locales/id/common.json";
import setLanguage from "next-translate/setLanguage";
import LanguageIcon from "@mui/icons-material/Language";

const TopNavbar: React.FC = () => {
    const language = Object.entries(common) as [string, string][];
    let lang: string;

    const handleChangeLanguage = async (langSelected: string) => {
        lang = langSelected;
        console.log(typeof lang);

        await setLanguage(lang);
    };

    return (
        <Box sx={{ backgroundColor: "#F7F8F8", paddingRight: "20px" }}>
            <Container
                maxWidth="xl"
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    color: "#7B8082",
                }}
            >
                <LanguageIcon sx={{ width: "20px" }} />
                <Select
                    defaultValue={"id"}
                    sx={{
                        color: "text.secondary",
                        fontSize: "14px",
                        boxShadow: "none",
                        ".MuiOutlinedInput-notchedOutline": { border: 0 },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: 0,
                        },
                        "&.Mui-focused": {
                            outline: "none",
                            boxShadow: "none",
                        },
                        "&:active": {
                            outline: "none",
                            boxShadow: "none",
                        },
                    }}
                >
                    {language.map((lang) => (
                        <MenuItem
                            key={lang[0]}
                            value={lang[0]?.split("language-")[1]}
                            onClick={() =>
                                handleChangeLanguage(
                                    lang[0]?.split("language-")[1],
                                )
                            }
                        >
                            {lang[1]}
                        </MenuItem>
                    ))}
                </Select>
            </Container>
        </Box>
    );
};

export default TopNavbar;
