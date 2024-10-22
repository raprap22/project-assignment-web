import { useState } from "react";
import { useQuery } from "react-query";
import {
    Avatar,
    Box,
    Card,
    Chip,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import { fetchPokemonByType, fetchPokemonTypeList } from "@pages/api";
import Sidebar from "./container/SideBar";
import PokePagination from "@pages/components/Pagination";
import { useRouter } from "next/router";
import NoticeBanner from "@pages/components/NoticeBanner";

const PokemonTypePage = () => {
    const router = useRouter();
    const { type } = router.query;

    const [page, setPage] = useState(1);
    const [selectedType, setSelectedType] = useState("");

    const {
        data: dataListType,
        isLoading: loadingType,
        isError: errorType,
    } = useQuery(["pokemonTypeList"], () => fetchPokemonTypeList());

    const handleSelectType = (type: string) => {
        setSelectedType(type);
        setPage(1);
    };

    return (
        <Container maxWidth="xl">
            <Box
                component="div"
                display="flex"
                paddingX={5}
                marginTop={10}
                gap={5}
            >
                <Box
                    width={200}
                    component="div"
                    borderRight="1px solid #d7dbdb"
                >
                    <Sidebar
                        types={dataListType}
                        isLoading={loadingType}
                        onSelectType={handleSelectType}
                    />
                </Box>
                <Box width={"100%"}>
                    <NoticeBanner shortTitle="Please select a Pokemon Type" color="info.main" />
                </Box>
            </Box>
        </Container>
    );
};

export default PokemonTypePage;
