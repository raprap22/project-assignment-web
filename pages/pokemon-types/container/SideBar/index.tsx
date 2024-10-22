import {
    Box,
    CircularProgress,
    List,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { ListType } from "@types";
import { useState } from "react";
import { useRouter } from "next/router";

interface SidebarProps {
    types: ListType[];
    isLoading: boolean;
    onSelectType: (type: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    types,
    onSelectType,
    isLoading,
}) => {
    const router = useRouter();
    const [selectedType, setSelectedType] = useState("");

    return (
        <List>
            <Typography fontWeight="bold" variant="h6" color="text.primary">
                Pokemon Type
            </Typography>
            {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                </Box>
            ) : (
                types?.map((type, index) => (
                    <>
                        <ListItemButton
                            key={index}
                            onClick={() => {
                                onSelectType(type?.name);
                                setSelectedType(type?.name);
                                router.pathname === "/pokemon-types" &&
                                    router.push(`/pokemon-types/${type?.name}`);
                            }}
                            sx={{
                                ":hover": {
                                    color: "#0779B0",
                                },
                            }}
                        >
                            <FiberManualRecordIcon
                                sx={{
                                    color: "text.secondary",
                                    width: 10,
                                    marginRight: 1,
                                }}
                            />
                            <ListItemText
                                primary={type?.name}
                                sx={{
                                    color:
                                        selectedType === type?.name
                                            ? "#0779B0"
                                            : "inherit",
                                }}
                            />
                        </ListItemButton>
                    </>
                ))
            )}
        </List>
    );
};

export default Sidebar;
