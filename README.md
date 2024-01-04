# Acquire Digital Front-End Developer Task

> See online at: https://acquire-pokemon.pages.dev/

## Stack

The major components are listed below:

- Vite
- TypeScript
- [ofetch](https://unjs.io/packages/ofetch) - Typed fetch with built-in JSON decoding
- [unstorage](https://unjs.io/packages/unstorage) - Typed access to IndexedDB API
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

The 'inspect' page shows a single pokemon. Additional information is loaded and cached by finding the default variant of the species. This includes the sprite (image), stats, moves and types.

## Accessibility

Consideration has been taken to ensure colours and font keep text legible. The page has been tested with lighthouse and gets 100% for accessibility:

- [Grid view](https://pagespeed.web.dev/analysis/https-acquire-pokemon-pages-dev/c6xe0devg7?form_factor=mobile)
- [Inspect view](https://pagespeed.web.dev/analysis/https-acquire-pokemon-pages-dev-inspect/vfcovbcmbk?form_factor=mobile)

## Development

There are two ways to get a development server up and running. You can run it locally with the following commands:

```sh
# Install dependencies
pnpm install

# Run the dev server
pnpm run dev
```

A [devcontainer.json](https://code.visualstudio.com/docs/devcontainers/containers) has also been provided. If you are using VSCode, use the "Rebuild and Reopen in Container" command. You could also use [GitHub Codespaces](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/adding-a-dev-container-configuration/introduction-to-dev-containers).
