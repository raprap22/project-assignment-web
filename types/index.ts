export interface Pokemon {
    name: string;
    weight: number;
    height: number;
    abilities: {
        ability: {
            name: string;
        };
    }[];
    types: {
        type: {
            name: string;
        };
    }[];
    sprites: {
        front_default: string;
        [key: string]: string | null;
    };
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}

export interface PokemonTypes {
    id: number;
    name: string;
    types: string[];
    sprite: string;
}

export interface ListType {
    name: string;
    url: string;
}
