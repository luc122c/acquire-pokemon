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

// Validate the name

import { getPokemonSpeciesByName } from "./utils/fetch";
import { singlePokemon } from "./utils/rendering";
getPokemonSpeciesByName(name)
  .then((pokemon) => {
    // TODO: Get the default for the sprite etc.
    console.log(pokemon.varieties.find((variety) => variety.is_default));

    app.innerText = "";
    app.appendChild(singlePokemon(pokemon));
  })
  .catch(() => {
    app.innerText = "Error loading pokemon: " + name;
  });
