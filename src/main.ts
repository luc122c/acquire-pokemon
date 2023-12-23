import "the-new-css-reset/css/reset.css";
import "./style.css";

import { PromisePool } from "@supercharge/promise-pool";
import { fetchPokemonSpeciesList, getPokemonByName } from "./fetch";
import { pokemonCard } from "./rendering";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerText = "Loading...";

// Get the initial list of pokemon species
fetchPokemonSpeciesList(1)
  .then((pokemon_species) =>
    // Use a promise pool to limit the number of concurrent requests
    PromisePool.withConcurrency(10)
      .for(pokemon_species)
      .process((species) => getPokemonByName(species.name))
  )
  .then(({ results }) => {
    const grid = document.createElement("div");
    grid.classList.add("card-grid");

    // Render the pokemon cards to the screen
    results
      .sort((a, b) => a.id - b.id)
      .forEach((pokemon) => {
        const card = pokemonCard(pokemon);
        grid.appendChild(card);
      });

    // Clear the div
    app.innerHTML = "";
    app.appendChild(grid);
  });
