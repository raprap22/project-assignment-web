import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    CardMedia,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

interface PokeCardProps {
    id: number;
    name: string;
    types: string[];
    image: string;
    onClick: () => void;
}

const PokeCard: React.FC<PokeCardProps> = ({
    id,
    name,
    types,
    image,
    onClick,
}) => {
    const route = useRouter();
    const handleClickType = (type: string) => {
        route.push(`pokemon-types/${type}`);
    };
    
    return (
        <Card
            onClick={onClick}
            sx={{
                maxWidth: 370,
                paddingX: 3,
                paddingY: 6,
                margin: "auto",
                borderRadius: "14px",
                boxShadow: 0,
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                    boxShadow: "0 10px 26px rgba(0, 0, 0, 0.3)",
                },
                cursor: "pointer",
            }}
        >
            <CardMedia
                component="img"
                src={image}
                alt={name}
                sx={{
                    backgroundColor: "#B3B6B8",
                    height: 250,
                    textAlign: "center",
                    marginBottom: 1,
                }}
            />
            <CardContent>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                >
                    #{String(id).padStart(3, "0")}
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: "bold", fontSize: "22px" }}
                >
                    {name}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {types.map((type, index) => (
                        <Chip
                            key={index}
                            label={type}
                            color={index % 2 === 0 ? "primary" : "secondary"}
                            onClick={() => handleClickType(type)}
                        />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default PokeCard;
