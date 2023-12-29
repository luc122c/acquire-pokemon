import "the-new-css-reset/css/reset.css";
import "./style.css";

import { PromisePool } from "@supercharge/promise-pool";
import {
  fetchPokemonSpeciesList,
  getPokemonByName,
  filterPokemonSpecies,
} from "./fetch";
import { pokemonCard } from "./rendering";

const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerText = "Loading...";

setupClearFormButton();

const params = new URLSearchParams(window.location.search);
const search = params.get("search");
// Get the initial list of pokemon species
fetchPokemonSpeciesList(1)
  .then((pokemon_species) =>
    // Use a promise pool to limit the number of concurrent requests
    PromisePool.withConcurrency(10)
      .for(pokemon_species)
      .process((species) => getPokemonByName(species.name))
  )
  .then(({ results }) => filterPokemonSpecies(results, search))
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

    // Clear the div
    app.innerHTML = "";
    app.appendChild(grid);
  });

function setupClearFormButton() {
  const clearButton =
    document.querySelector<HTMLButtonElement>("#clear-search")!;
  clearButton.addEventListener("click", () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("search");
    window.location.href = url.href;
  });
}
