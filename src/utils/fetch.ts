import { resolveURL } from "ufo";
import { $fetch } from "ofetch";
import type { Generation, PokemonSpecies } from "pokenode-ts";
import { localStorage } from "./cache";

const API_BASE_URL = "https://pokeapi.co/api/v2/";

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
 * Fetch a pokemon species by name or id.
 * Checks the cache first, and if it's not there, fetches it from the API.
 **/
export const getPokemonByName = async (name: PokemonSpecies["name"]) => {
  const pokemon = await localStorage.getItem<PokemonSpecies>(name);
  if (pokemon) return pokemon;
  else {
    const data = await fetchPokemonSpecies(name);
    await localStorage.setItem(name, data);
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
