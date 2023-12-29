import "the-new-css-reset/css/reset.css";
import "./style.css";

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

import { getPokemonByName } from "./fetch";
getPokemonByName(name)
  .then((pokemon) => {})
  .catch((error) => {
    app.innerText = "Error loading pokemon: " + name;
  });
