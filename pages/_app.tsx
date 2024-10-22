import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import TopNavbar from "./components/TopNavbar";
import Navbar from "./components/Navbar";

import "@styles/global.css";
import "@styles/vars.css";
import { useLocation } from "react-use";

const theme = createTheme({
    palette: {
        text: {
            primary: "#42494D",
            secondary: "#7B8082",
        },
        secondary: {
            main: "#E6AB09",
        },
        background: {
            default: "#FFCB3B",
        },
        info: {
            main: "#0571A6",
        },
        error: {
            main: "#E66D00",
        },
    },
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const [queryClient] = useState(() => new QueryClient());
    const [isMounted, setIsMounted] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                {isMounted && location?.pathname !== "/" && (
                    <>
                        <TopNavbar />
                        <Navbar />
                    </>
                )}
                <Component {...pageProps} />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default MyApp;
