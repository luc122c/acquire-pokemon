import type { PokemonSpecies, Pokemon } from "pokenode-ts";

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

  const description = createDescription(pokemon.flavor_text_entries);
  description.classList.add("pokemon-card-description");

  content.appendChild(header);
  content.appendChild(description);
  card.appendChild(content);
  return card;
};

export const singlePokemon = (species: PokemonSpecies, pokemon: Pokemon) => {
  console.log(species, pokemon);
  const single = document.createElement("div");
  single.classList.add("pokemon-single");
  single.classList.add(`pokemon-color-${species.color.name}`);

  const header = document.createElement("div");
  header.classList.add("pokemon-single-header");

  const sprite =
    pokemon.sprites.other?.["official-artwork"].front_default ??
    pokemon.sprites.front_default;
  if (sprite) {
    const image = document.createElement("img");
    image.classList.add("pokemon-single-image");
    image.src = sprite;
    image.alt = species.name;
    image.width = image.height = 100;
    header.appendChild(image);
  }

  const title = document.createElement("h2");
  title.classList.add("pokemon-single-title");
  title.textContent = species.name;
  header.appendChild(title);

  const id = document.createElement("span");
  id.classList.add("pokemon-single-id");
  id.textContent = `#${species.id.toString().padStart(3, "0")}`;
  header.appendChild(id);
  single.appendChild(header);

  const badges = createBadges(species);
  if (badges.children.length) single.appendChild(badges);

  const descriptionHeading = document.createElement("h3");
  descriptionHeading.textContent = "Description";
  single.appendChild(descriptionHeading);
  const description = createDescription(species.flavor_text_entries);
  description.classList.add("pokemon-single-description");
  single.appendChild(description);
  return single;
};

function createBadges(pokemon: PokemonSpecies) {
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
  return badges;
}

function createDescription(entries: PokemonSpecies["flavor_text_entries"]) {
  const description = document.createElement("p");
  // Find the english text if it exists, otherwise use the first one.
  const text =
    entries.find((flavour) => flavour.language.name === "en")?.flavor_text ||
    entries[0].flavor_text;
  /**
   * Remove control characters from the text.
   * @link https://stackoverflow.com/a/51602415/2527692
   */
  description.textContent = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, " ");
  console.log(description.textContent);
  return description;
}
