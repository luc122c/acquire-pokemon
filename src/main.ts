import "the-new-css-reset/css/reset.css";
import "./style.css";

import { PromisePool } from "@supercharge/promise-pool";
import { fetchPokemonSpeciesList, getPokemonByName } from "./fetch";

// Get the initial list of pokemon species
const results = () =>
  fetchPokemonSpeciesList(1)
    .then((pokemon_species) =>
      // Use a promise pool to limit the number of concurrent requests
      PromisePool.withConcurrency(10)
        .for(pokemon_species)
        .process((species) => getPokemonByName(species.name))
    )
    .then(({ results, errors }) => results);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <pre>
      ${JSON.stringify(results, null, 2)}
    </pre>
    <p>Count: ${results.length}</p>
  </div>
`;
