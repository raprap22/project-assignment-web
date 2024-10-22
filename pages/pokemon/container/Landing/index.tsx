import { Box, Container } from "@mui/material";
import HomeContent from "./view/HomeContent";

const Landing = ({ onCheckPokedex }: { onCheckPokedex: () => void }) => {
    return (
        <Container maxWidth="xl">
            <Box component="div">
                <HomeContent onCheckPokedex={onCheckPokedex} />
            </Box>
        </Container>
    );
};

export default Landing;
