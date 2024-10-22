import { Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';

interface PokemonCardProps {
    id: number;
    name: string;
    image: string;
    types: string[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, types }) => {
    return (
        <Card>
            <CardMedia component="img" height="140" image={image} alt={name} />
            <CardContent>
                <Typography variant="h6">#{id} {name}</Typography>
                {types.map((type) => (
                    <Chip key={type} label={type} />
                ))}
            </CardContent>
        </Card>
    );
};

export default PokemonCard;