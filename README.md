# pagin8

A paginated table implementation.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Reasons behind decisions

Here I will explain some of the reasons behind the decisions I made.

### Installing dependencies to develop, then merge to master

`To avoid diluting the amount of code/ logic going in to the code.`

- By not including package.lock.json in my pull request,
  I can see it easier how much code/logic is required to achieve the result.

- I want to try this with and without redux to see the difference in amount of code required,
  to achieve the same outcome.i

- In this way in the pull request from develop to master we can clearly see the updates

### Using the create react app with Redux and Typescript

- In a bigger project, I would have started from scratch by starting the react project and adding each library extension one by one and configuring them carefuly. As this is a demo I am using a pre built boiler palte to base my project.
  The reason is that it already has all the required library installed by default and tested.

- This being an official boiler plate, I am more likely to find support for my problems online. Support including documentation and community questions and tutorials.

## Approach

- [ ] Create a functional component for the paginated table
      ~~- [ ] Remove Redux stuff for now. ~~ Decided that may not be worth the effort to remove and re add it. Later I may find a better way to find the how much extra code is required for Redux.
  - [x] Make the fisrst API call with hardcoded data and show it on console
  - [x] Add type for the API response
  - [x] Store the data in component state and display it in a Material UI (MUI) table
  - [x] Update the table to be a paginated MUI table
  - [x] Make the paginations buttons to be saved in to components state
  - [x] Make the pagination events trigger the data to update
  - [x] Add loading state
  - [ ] Make the pagination events connected to the router (URL)
- [ ] Write some tests
- [ ] Convert the functional component to legacy class component
- [ ] Move the state for page number, page size and the data for the table in to Redux store
- [ ] Write some unit test(s)
- [ ] Add search field feature
