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

import { getPokemonByName } from "./fetch";
getPokemonByName(name)
  .then((pokemon) => {
    const pre = document.createElement("pre");
    pre.innerText = JSON.stringify(Object.keys(pokemon), null, 2);
    app.innerText = "";
    app.appendChild(pre);
  })
  .catch((error) => {
    app.innerText = "Error loading pokemon: " + name;
  });
