import React from "react";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const CustomLink = ({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) => {
    const router = useRouter();

    const handleNavigation = () => {
        router.push(href);
    };

    return (
        <Typography
            onClick={handleNavigation}
            sx={{
                cursor: "pointer",
                marginRight: 2,
                fontWeight:
                    router.pathname === href ||
                    router.pathname === href + "/detail/[id]" ||
                    router.pathname === href + "/[type]"
                        ? "bold"
                        : null,

                textDecoration: "none",
                padding: "10px",
                color:
                    router.pathname === href ||
                    router.pathname === href + "/detail/[id]" ||
                    router.pathname === href + "/[type]"
                        ? "secondary.main"
                        : "text.primary",
                "&:hover": {
                    borderBottom: "1px solid",
                    borderColor: "#ECEDED",
                    paddingBottom: "9px",
                },
            }}
        >
            {children}
        </Typography>
    );
};

export default CustomLink;
