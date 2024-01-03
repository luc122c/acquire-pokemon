import { createStorage } from "unstorage";
import indexedDbDriver from "unstorage/drivers/indexedb";
import type { Pokemon, PokemonSpecies } from "pokenode-ts";

const dbStorage = createStorage({
  driver: indexedDbDriver({
    dbName: "acquire-pokemon",
    storeName: "cache",
  }),
});

// Pokemon species
export const retrievePokemonSpecies = (name: PokemonSpecies["name"]) =>
  dbStorage.getItem<PokemonSpecies>(`species:${name}`);
export const storePokemonSpecies = (
  name: PokemonSpecies["name"],
  data: PokemonSpecies
) => dbStorage.setItem(`species:${name}`, data);

// Pokemon varieties
export const retrievePokemonVariety = (id: Pokemon["id"]) =>
  dbStorage.getItem<Pokemon>(`pokemon:${id}`);
export const storePokemonVariety = (id: Pokemon["id"], data: Pokemon) =>
  dbStorage.setItem(`pokemon:${id}`, data);
