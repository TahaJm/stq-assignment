# StoryTeq Assignment

This template should help get you started developing with Vue 3 in Vite.


## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## Overview
- **Debounce Functionality**: Although the data is fetched directly from the store in this example, in a real-world scenario, data typically comes from an API. To handle such cases efficiently, debounce functionality is implemented for the search input.
- **Accessibility**: Ensures that the application is accessible by providing focus management and keyboard navigation.
- **Separation of Concerns**: Divides the functionality into modular components and composables for better maintainability and readability.
- added some accessibility features such as selecting result with enter or hiding results with escape and test it with screen reader

## Further improvements
- Further enhance accessibility by adding more ARIA roles and attributes where applicable.
- Expand the unit test coverage to include more components and edge cases.
- Consider adding end-to-end tests to verify the complete user journey.
- **Personal Note**: I tried to follow best practices, but since I am more comfortable with React, some places might seem a little off. This project does not fully reflect my best performance.
## State Management
Pinia is used for state management to handle fetching and storing search results. This provides a centralized store and makes the state predictable and easier to manage.