export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const BASE_URL_API = process.env.NEXT_PUBLIC_API_URL;

export const ROUTES_PATH = {
    home: "/",
    pokemon_list: "/pokemon",
    page_404: '/404'
};

export const STAT_COLORS: { [key: string]: string } = {
    hp: "#0571A6",
    attack: "#E66D00",
    defense: "#E6AB09",
    "special-attack": "#01B956",
    "special-defense": "#3C48CF",
    speed: "#DE2C2C",
  };
  
