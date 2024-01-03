import "the-new-css-reset/css/reset.css";
import "./style.css";
import "./utils/forms";

import { PromisePool } from "@supercharge/promise-pool";
import { withQuery } from "ufo";
import {
  fetchPokemonSpeciesList,
  getPokemonSpeciesByName,
  searchPokemonSpecies,
  filterPokemonSpecies,
} from "./utils/fetch";
import { pokemonCard } from "./utils/rendering";

const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerText = "Loading...";

const params = new URLSearchParams(window.location.search);
// Get the initial list of pokemon species
fetchPokemonSpeciesList(1)
  .then((pokemon_species) =>
    // Use a promise pool to limit the number of concurrent requests
    PromisePool.withConcurrency(10)
      .for(pokemon_species)
      .process((species) => getPokemonSpeciesByName(species.name))
  )
  .then(({ results }) => {
    const search = params.get("search");
    return searchPokemonSpecies(results, search);
  })
  .then((results) => {
    const filter = params.getAll("filter");
    return filterPokemonSpecies(results, filter);
  })
  .then((results) => {
    const grid = document.createElement("div");
    grid.classList.add("card-grid");

    // Render the pokemon cards to the screen
    results
      .sort((a, b) => a.id - b.id)
      .forEach((pokemon) => {
        grid.appendChild(pokemonCard(pokemon));
      });

    if (!results.length) {
      const noResults = document.createElement("p");
      noResults.classList.add("no-results");
      noResults.textContent = "No results found.";
      grid.appendChild(noResults);
    }

    grid.addEventListener("click", maybeInspectPokemon);
    grid.addEventListener("keydown", (event) => {
      if (event.key === "Enter") maybeInspectPokemon(event);
    });

    // Clear the div
    app.innerHTML = "";
    app.appendChild(grid);
  });

function maybeInspectPokemon({ target }: Event) {
  if (!(target instanceof HTMLElement)) return;
  // If click comes from a 'pokemon-card' div or within one
  if (
    target.classList.contains("pokemon-card") ||
    target.closest(".pokemon-card")
  ) {
    // get the pokemon card element
    const card = target.classList.contains("pokemon-card")
      ? target
      : target.closest(".pokemon-card")!;

    const name = card.getAttribute("data-species");
    if (!name) return;

    // redirect to the pokemon details page
    window.location.href = withQuery("/inspect/", { name });
  }
}
