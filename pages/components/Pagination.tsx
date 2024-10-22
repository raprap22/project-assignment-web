import { Pagination, Box, Select, MenuItem, Typography } from "@mui/material";

interface PaginationProps {
    page: number;
    count: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    perPage: number;
    setPerPage: (value: number) => void;
    totalData: number;
    color: string;
}

const PokePagination: React.FC<PaginationProps> = ({
    page,
    count,
    onChange,
    perPage,
    setPerPage,
    totalData,
    color,
}) => {
    const primaryColor = color === "blue" ? "#0779B0" : "#FFFFFF";
    const hoverColor = color === "blue" ? "none" : "none";

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                borderRadius: 2,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: "bold",
                        color: primaryColor,
                    }}
                >
                    Per Page:
                </Typography>
                <Select
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                    sx={{
                        ml: 1,
                        backgroundColor: "none",
                        borderRadius: "4px",
                        border: `2px solid ${primaryColor}`,
                        color: primaryColor,
                        fontWeight: "bold",
                        ".MuiOutlinedInput-notchedOutline": {
                            border: 0,
                            padding: 0,
                        },
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
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={18}>18</MenuItem>
                    <MenuItem value={27}>27</MenuItem>
                </Select>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Pagination
                    page={page}
                    count={count}
                    onChange={onChange}
                    variant="outlined"
                    shape="rounded"
                    sx={{
                        "& .MuiPaginationItem-root": {
                            backgroundColor: "none",
                            borderRadius: "8px",
                            border: `2px solid ${primaryColor}`,
                            margin: "0 4px",
                            padding: "2px",
                            color: primaryColor,
                            "&.Mui-selected": {
                                backgroundColor: primaryColor,
                                color: color === "blue" ? "white" : "#FFCB3B",
                            },
                            "&:hover": {
                                backgroundColor: hoverColor,
                            },
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
                        },
                    }}
                />
            </Box>

            <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: primaryColor, zIndex: 10 }}
            >
                Total Data: {totalData}
            </Typography>
        </Box>
    );
};

export default PokePagination;
