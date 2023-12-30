import type { PokemonSpecies } from "pokenode-ts";

export const pokemonCard = (pokemon: PokemonSpecies) => {
  const card = document.createElement("div");
  card.classList.add("pokemon-card");
  card.tabIndex = 1;
  card.dataset.species = pokemon.name;

  const colour = document.createElement("span");
  colour.classList.add("pokemon-card-colour");
  colour.classList.add(`pokemon-color-${pokemon.color.name}`);
  card.appendChild(colour);

  const content = document.createElement("div");
  content.classList.add("pokemon-card-content");

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

  content.appendChild(header);
  content.appendChild(description);
  card.appendChild(content);
  return card;
};

export const singlePokemon = (pokemon: PokemonSpecies) => {
  console.log(pokemon);
  const single = document.createElement("div");
  single.classList.add("pokemon-single");
  single.classList.add(`pokemon-color-${pokemon.color.name}`);

  const header = document.createElement("div");
  header.classList.add("pokemon-single-header");

  const title = document.createElement("h2");
  title.classList.add("pokemon-single-title");
  title.textContent = pokemon.name;
  header.appendChild(title);

  const id = document.createElement("span");
  id.classList.add("pokemon-single-id");
  id.textContent = `#${pokemon.id.toString().padStart(3, "0")}`;
  header.appendChild(id);
  single.appendChild(header);

  const badges = document.createElement("div");
  badges.classList.add("pokemon-single-badges");
  if (pokemon.is_mythical) {
    const mythical = document.createElement("span");
    mythical.classList.add("pokemon-single-mythical");
    mythical.textContent = "Mythical";
    badges.appendChild(mythical);
  }
  if (pokemon.is_legendary) {
    const legendary = document.createElement("span");
    legendary.classList.add("pokemon-single-legendary");
    legendary.textContent = "Legendary";
    badges.appendChild(legendary);
  }

  single.appendChild(badges);

  const description = document.createElement("p");
  description.classList.add("pokemon-single-description");
  // Find the english text if it exists, otherwise use the first one.
  description.textContent =
    pokemon.flavor_text_entries.find(
      (flavour) => flavour.language.name === "en"
    )?.flavor_text || pokemon.flavor_text_entries[0].flavor_text;
  single.appendChild(description);

  // dev
  const pre = document.createElement("pre");
  pre.innerText = JSON.stringify(Object.keys(pokemon), null, 2);

  return single;
};
