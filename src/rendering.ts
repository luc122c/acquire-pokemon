import type { PokemonSpecies } from "pokenode-ts";

export const pokemonCard = (pokemon: PokemonSpecies) => {
  const card = document.createElement("div");
  card.classList.add("pokemon-card");
  card.tabIndex = 1;

  const header = document.createElement("div");
  header.classList.add("pokemon-card-header");

  const title = document.createElement("h2");
  title.classList.add("pokemon-card-title");
  title.textContent = pokemon.name;
  header.appendChild(title);

  const id = document.createElement("span");
  id.classList.add("pokemon-card-id");
  id.textContent = `#${pokemon.id.toString().padStart(3, "0")}`;
  header.appendChild(id);

  const description = document.createElement("p");
  description.classList.add("pokemon-card-description");
  // Find the english text if it exists, otherwise use the first one.
  description.textContent =
    pokemon.flavor_text_entries.find(
      (flavour) => flavour.language.name === "en"
    )?.flavor_text || pokemon.flavor_text_entries[0].flavor_text;

  card.appendChild(header);
  card.appendChild(description);

  return card;
};
