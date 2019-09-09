

Stock Viewer - Lendesk challenge

## Features:
  ### Allow a user to choose from a list of company stock symbols
  ### Display information pertaining to the selected company stock
  ### Ability to mark a selected stock as a favourite
  ### Theme toggle

## Technical Decisions:
  ### Styling
  I made the choice to use a combination of [Emotion](https://github.com/emotion-js/emotion) 
  and a small library called [Rebass](https://rebassjs.org/) to handle layout and styling.
  Emotion provides a lot of flexability by giving the developer a choice of using the Styled Components 
  paradigm or by using a specific `css` prop to elements.
  Rebass provides React components for primitive UI elements.
  One of the main reasons to use this combination was for how quick layouts can get mocked up as everything is hooked up to a theme file.

  ### State management
  The main considerations I took when deiciding on how to manage state was to determine what data would be needed. 
  The select dropdown which displays a large list of company stock symbols gets its options from the `/ref-data/symbols` endpoint. More documentation for this endpoint is available here: https://iexcloud.io/docs/api/#stocks.
  Once a user selects a symbol we then need to display to the user a description of that company and also the latest stock price. At this point all data operations are read only (GET requests) so it would be overkill to introduce a library to handle state management.

  The final decision was to create a custom hook `useStocks()` which would be responsible for:
    Maintaining the currently selected symbol state,
    List of returned symbols shown in the select dropdown,
    The stock information containing the company description and latest price
    Loading and error states for above API calls

  ### Testing
  The main component behavior is tested using [React Testing Library](https://github.com/testing-library/react-testing-library) and the useStocks hook is tested with the accompanying [React Hooks Testing Library](https://github.com/testing-library/react-hooks-testing-library)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

#### API Key
Note that an API key is needed to authenticate the API calls to IEXCloud API.
Create a .env file in the root of this project and add an env variable as follows:
  REACT_APP_API_KEY={your_api_key}

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
