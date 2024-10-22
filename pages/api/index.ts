import { BASE_URL_API } from "@constants/config";
import axios from "axios";

const BASE_URL = BASE_URL_API;

export const fetchPokemonList = async (page: number, limit: number) => {
    const offset = (page - 1) * limit;
    const response = await axios.get(
        `${BASE_URL + "/pokemon"}?offset=${offset}&limit=${limit}`,
    );
    const pokemonList = await Promise.all(
        response.data.results.map(
            async (pokemon: { name: string; url: string }) => {
                const pokemonDetail = await axios.get(pokemon.url);
                return {
                    id: pokemonDetail.data.id,
                    name: pokemonDetail.data.name,
                    image: pokemonDetail.data.sprites.front_default,
                    types: pokemonDetail.data.types.map(
                        (typeInfo: any) => typeInfo.type.name,
                    ),
                };
            },
        ),
    );
    return { pokemons: pokemonList, total: response.data.count };
};

export const fetchPokemonTypeList = async () => {
    const response = await axios.get(`${BASE_URL}/type`);
    const types = response.data.results.map(
        (type: { name: string; url: string }) => ({
            name: type.name,
            url: type.url,
        }),
    );
    return types;
};

export const fetchPokemonByType = async (
    type: string,
    page: number,
    perPage: number,
) => {
    const limit = perPage;
    const offset = (page - 1) * limit;

    const response = await axios.get(`${BASE_URL_API}/type/${type}`);

    const pokemonList = await Promise.all(
        response.data.pokemon
            .slice(offset, offset + limit)
            .map(
                async ({
                    pokemon,
                }: {
                    pokemon: { name: string; url: string };
                }) => {
                    const pokemonDetail = await axios.get(pokemon.url);
                    return {
                        id: pokemonDetail.data.id,
                        name: pokemonDetail.data.name,
                        image: pokemonDetail.data.sprites.front_default,
                        types: pokemonDetail.data.types.map(
                            (typeInfo: any) => typeInfo.type.name,
                        ),
                    };
                },
            ),
    );

    return { pokemons: pokemonList, total: response.data.pokemon.length };
};

export const fetchPokemon = async (namePokemon: string) => {
    const response = await axios.get(`${BASE_URL}/pokemon/${namePokemon}`);
    const pokemonDetail = response.data;

    return {
        id: pokemonDetail.id,
        name: pokemonDetail.name,
        image: pokemonDetail.sprites.front_default,
        types: pokemonDetail.types.map((typeInfo: any) => typeInfo.type.name),
        height: pokemonDetail.height,
        weight: pokemonDetail.weight,
        abilities: pokemonDetail.abilities.map(
            (abilityInfo: any) => abilityInfo.ability.name,
        ),
    };
};

export const fetchPokemonDetail = async (name: string | string[]) => {
    const { data } = await axios.get(`${BASE_URL}/pokemon/${name}`);
    return data;
};

export const fetchPokemonSpecies = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/pokemon-species/${id}/`);
    return response.data.evolution_chain.url;
};

export const fetchEvolutionChain = async (url: string) => {
    const response = await axios.get(url);
    return response.data.chain;
};
