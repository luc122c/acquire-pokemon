import type { PokemonSpecies } from "pokenode-ts";

export const pokemonCard = (pokemon: PokemonSpecies) => {
  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  const header = document.createElement("div");
  header.classList.add("pokemon-card-header");

  const title = document.createElement("h2");
  title.textContent = pokemon.name;
  header.appendChild(title);

  const id = document.createElement("span");
  id.textContent = `#${pokemon.id.toString().padStart(3, "0")}`;
  header.appendChild(id);

  const description = document.createElement("p");
  // TODO: Find the english text
  description.textContent = pokemon.flavor_text_entries[0].flavor_text;

  card.appendChild(header);
  card.appendChild(description);

  return card;
};
