# Acquire Digital Front-End Developer Task

> See online at: https://acquire-pokemon.pages.dev/

## Stack

The major components are listed below:

- Vite
- TypeScript
- [oFetch](https://unjs.io/packages/ofetch) - Typed fetch with built-in JSON decoding
- [unstorage](https://unjs.io/packages/unstorage) - Typed access to local storage API
- [ufo](https://unjs.io/packages/ufo) - Utilities for parsing and normalising URLs.
- [Promise Pool](https://superchargejs.com/docs/3.x/promise-pool) - Used to limit concurrent requests to the API.
- [pokenode-ts](https://github.com/Gabb-c/pokenode-ts) - TypeScript wrapper for the API. I am only using this for TypeScript interfaces.

## Design

- [CSS reset](https://npm.im/the-new-css-reset)
- Grid / Card layout for pokemon
- Separate page for viewing a single Pokemon

## Methodology

The two views have their own entrypoint in `src`: `main.ts` and `inspect.ts`. Shared functionality can be found in the `utils` folder.

The main page calls the API to check for the list of pokemon. While this could be cached locally, it is a small call and it appears to already get cached elsewhere (either the browser or Cloudflare, I can't tell). Once the list has been retrived, each Pokemon resource is retrived. The cache is checked first and if there is no hit, the API is called. This activity is throttled using a promise pool, mainly for the initial load where 151 external API requests are required. If there is a search term, the result is filtered. The list is sorted by the pokedex ID.
