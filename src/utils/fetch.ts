import { resolveURL } from "ufo";
import { $fetch } from "ofetch";
import type { Generation, PokemonSpecies, Pokemon } from "pokenode-ts";
import {
  storePokemonSpecies,
  retrievePokemonSpecies,
  retrievePokemonVariety,
  storePokemonVariety,
} from "./cache";

const API_BASE_URL = process.env.API_BASE_URL ?? "https://pokeapi.co/api/v2";

/**
 * Fetch a list of all pokemon species in a generation.
 * @link https://pokeapi.co/docs/v2#generations
 **/
export const fetchPokemonSpeciesList = (
  generation: Generation["id"] | Generation["name"]
) =>
  $fetch<Generation>(
    resolveURL(API_BASE_URL, `/generation/${generation}`)
  ).then((generation) => generation.pokemon_species);

/**
 * Fetch a pokemon species by name or id.
 * @link https://pokeapi.co/docs/v2#pokemon-species
 */
export const fetchPokemonSpecies = (
  nameOrId: PokemonSpecies["name"] | PokemonSpecies["id"]
) =>
  $fetch<PokemonSpecies>(
    resolveURL(API_BASE_URL, `/pokemon-species/${nameOrId}`)
  );

/**
 * Fetch a pokemon by id.
 * @link https://pokeapi.co/docs/v2#pokemon-section
 */
export const fetchPokemonById = (id: Pokemon["id"]) =>
  $fetch<Pokemon>(resolveURL(API_BASE_URL, `/pokemon/${id}`));

/**
 * Fetch a pokemon species by name or id.
 * Checks the cache first, and if it's not there, fetches it from the API.
 **/
export const getPokemonSpeciesByName = async (name: PokemonSpecies["name"]) => {
  const pokemon = await retrievePokemonSpecies(name);
  if (pokemon) return pokemon;
  else {
    const data = await fetchPokemonSpecies(name);
    await storePokemonSpecies(name, data);
    return data;
  }
};

/**
 * Finds the default pokemon id for a pokemon species.
 */
export const getDefaultVarietyId = (pokemon: PokemonSpecies) => {
  const variety = pokemon.varieties.find((variety) => variety.is_default)!;
  const url = variety.pokemon.url.split("/");
  return Number(url[url.length - 2]);
};

/**
 * Gets a pokemon by id.
 * Checks the cache first, and if it's not there, fetches it from the API.
 **/
export const getPokemonById = async (id: Pokemon["id"]) => {
  const pokemon = await retrievePokemonVariety(id);
  if (pokemon) return pokemon;
  else {
    const data = await fetchPokemonById(id);
    await storePokemonVariety(id, data);
    return data;
  }
};

export function searchPokemonSpecies(
  array: PokemonSpecies[],
  search: ReturnType<typeof URLSearchParams.prototype.get>
) {
  if (!search) return array;

  // Filter names and ids by the search term
  return array.filter(
    ({ name, id }) => name.includes(search) || id.toString() == search
  );
}

export function filterPokemonSpecies(
  array: PokemonSpecies[],
  filter: ReturnType<typeof URLSearchParams.prototype.getAll>
) {
  filter.forEach((filter) => {
    array = array.filter((pokemon) => pokemon[filter as keyof PokemonSpecies]);
  });
  return array;
}
