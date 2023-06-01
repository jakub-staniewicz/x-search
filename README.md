# X search assignment task

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Data is hardcoded on the basis of:
[https://github.com/erik-sytnyk/movies-list/blob/master/db.json](https://github.com/erik-sytnyk/movies-list/blob/master/db.json)

Just for sake of presentation each title was mutated 6 times (prefix added) just to show that
_pagination_ works.

The implementation is a tad more complex than in assignment.
After keyword is provided to input, you can (let's assume input is filled with "Al"):

- click on suggestion -> search results for clicked string will be shown (results for Alive)
- press keyDown -> first suggestion will be highlighted
- press keyUp -> last suggestion will be highlighted
- press enter -> results for Al will be shown

Delete button is shown only if relevant: when suggestion is highlighted (when up/down keys are used) or hovered.

While search suggestion is clicked, results are shown, number of results and time of (faked search is real and based on random promise resolution delay).

Clicking on the results link opens a new tab with relevant google search.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
You can also test url integration to see searches related to Alive movie:
[http://localhost:3000/x-search?search=Alive](http://localhost:3000/x-search?search=Alive)

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

There are 20 unit tests provided.

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
