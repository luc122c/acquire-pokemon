import "the-new-css-reset/css/reset.css";
import "./style.css";

const backButton = document.querySelector<HTMLButtonElement>("#back-button")!;
backButton.addEventListener("click", () => {
  window.location.href = "/";
});

const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerText = "Loading...";

const params = new URLSearchParams(window.location.search);
const name = params.get("name");
// Sanitise text

if (!name) {
  app.innerText = "No name provided";
  throw new Error("No name provided");
}

// TODO: Validate the name

import {
  getPokemonSpeciesByName,
  getDefaultVarietyId,
  getPokemonById,
} from "./utils/fetch";
import { singlePokemon } from "./utils/rendering";
getPokemonSpeciesByName(name)
  .then(async (species) => {
    const id = getDefaultVarietyId(species);
    const pokemon = await getPokemonById(id);
    return { species, pokemon };
  })
  .then(({ species, pokemon }) => {
    app.innerText = "";
    app.appendChild(singlePokemon(species, pokemon));
  })
  .catch(() => {
    app.innerText = "Error loading pokemon: " + name;
  });
