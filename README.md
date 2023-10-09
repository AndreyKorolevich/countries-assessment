# Take home assessment
### [Deploy Link](https://65246f9afe4e9939c7d5bed4--radiant-dango-c0cfcc.netlify.app/)

This React application is built using modern web technologies to provide a dynamic and responsive user experience. It leverages the following key technologies and libraries:

- **React:** The foundation of the application, providing a component-based architecture for building user interfaces.

- **TypeScript:** Enhancing code quality and developer productivity through static typing and improved tooling.

- **Apollo Client:** Seamlessly integrating GraphQL APIs with the application, allowing efficient data fetching and management.

- **Material-UI (MUI):** A popular and customizable React component library that ensures a consistent and visually appealing design across the application.


## Solution

- Countries fetch and display in a grid. Each country card in the grid displays a flag, name,
and continent. The server provide emoji for every flag, but Windows does not support countries 
flag emoji what bring poor  experience for users. 
More detail in this post: https://prinsfrank.nl/2021/01/25/Non-existing-flag-emojis-on-windows. I decided to use 'react-country-flag' library for cross platform support.

- Created a search field that enables users to filter countries by name with case sensetive input. In this example, the backend does not support pagination and and case insensitiveinput and therefore gives the entire set of countries at the first request. But the search still works using backend queries. Since this is more close to real conditions and is a good practice, because the backend has more complete and updated information. And when the backend is expanded in the future, you will not have to change the logic on the client.
Displayed an empty state if no countries are found.
When a country card is clicked, the popover displays with the country’s language(s) that is spoken, currency, and number of states.

- Implemented pagination on the clien side.
- Implemented  Error handling.
- Implemented  loading states with skeleton approach.
- Add test coverage using Jest, RTL
- Since backed does not support mutation the feature that allows users to mark a country (or countries) as a favorite implemented usin Localstorage as alternative.


###  Getting Started

### `yarn install`
### `yarn dev`