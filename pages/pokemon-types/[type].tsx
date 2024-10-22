import { useState } from "react";
import { useQuery } from "react-query";
import {
    Box,
    Card,
    CircularProgress,
    Container,
    Typography,
} from "@mui/material";
import { fetchPokemonByType, fetchPokemonTypeList } from "@pages/api";
import Sidebar from "./container/SideBar";
import PokePagination from "@pages/components/Pagination";
import { useRouter } from "next/router";
import PokemonTypeList from "./container/PokemonTypeList";
import NoticeBanner from "@pages/components/NoticeBanner";

const PokemonTypePage = () => {
    const router = useRouter();
    const { type } = router.query;

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(9);
    const [selectedType, setSelectedType] = useState("");

    const { data, isLoading, isError } = useQuery(
        ["pokemonByType", selectedType, page],
        () =>
            fetchPokemonByType(
                (selectedType as string) || (type as string),
                page,
                perPage,
            ),
        {
            enabled: !!(selectedType || type),
        },
    );

    const {
        data: dataListType,
        isLoading: loadingType,
        isError: errorType,
    } = useQuery(["pokemonTypeList"], () => fetchPokemonTypeList());

    const handleSelectType = (type: string) => {
        setSelectedType(type);
        setPage(1);
    };

    const handlePerPageChange = (value: number) => {
        setPerPage(value);
        setPage(1);
    };

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPage(value);
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
                    {isLoading ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : isError ? (
                        <NoticeBanner
                            shortTitle="Error Fetching Data"
                            color="error.main"
                        />
                    ) : (
                        <Box>
                            <Container maxWidth="xl">
                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                    marginBottom={5}
                                    color="text.primary"
                                >
                                    Pokemon with {type} type
                                </Typography>
                                <Card
                                    sx={{
                                        boxShadow:
                                            "0 10px 26px rgba(0, 0, 0, 0.1)",
                                        borderRadius: 6,
                                        width: "100%",
                                        padding: 4,
                                        marginY: 5,
                                    }}
                                >
                                    <PokemonTypeList
                                        pokemons={data?.pokemons}
                                    />
                                    <PokePagination
                                        page={page}
                                        count={Math.ceil(data?.total / perPage)}
                                        onChange={handlePageChange}
                                        perPage={perPage}
                                        setPerPage={handlePerPageChange}
                                        totalData={data?.total}
                                        color="blue"
                                    />
                                </Card>
                            </Container>
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default PokemonTypePage;
