import { Box, Typography } from "@mui/material";

interface Title {
    shortTitle: string;
    color: string;
}

const NoticeBanner: React.FC<Title> = ({ shortTitle, color }) => {
    return (
        <Box
            color="white"
            paddingY={4}
            marginX={2}
            borderRadius={6}
            textAlign="center"
            width="100%"
            sx={{
                backgroundColor: color,
            }}
        >
            <Typography variant="h3" fontWeight="bold">
                {shortTitle}
            </Typography>
        </Box>
    );
};

export default NoticeBanner;
