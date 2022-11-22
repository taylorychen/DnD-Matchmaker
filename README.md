# Installation

`git clone https://github.com/taylorychen/35L-project.git` \
To clone the repo to your local system \
`npm install` \
To install the important npm modules \
`npm start` \
To start the app locally

# Using Unhinged: A Dungeons & Dragons Matchmaker

This README was last updated 11/19/22 at around 1:00 PM PST.

## Home page

The front page will show a login screen. Users must be logged in to interact with posts, as well as access the Profile page. \
Users will be logged and authenticated with Google Authentication. This will automatically create an account.

## Postings

This page displays all of the availible posts. \
The posts show information about the Dungeon Master's game, including number of players, tags, location, and description. \
Logged in users can interact with these posts by requesting to join them. \
The `CREATE` button for users to create their own posts. \
A toggle allows users to switch between dark and light mode.

### Post interactions

Buttons appear under each post depending on the user's status in relation to them. \
If the user own the post, users will see options to `delete`, `deactivate`, view `requests`, and view `approved` users. \
Other posts will show with an option to `request to join`. \
If the user has already requested, a button to `unrequest` will appear instead. \
If the user is already approved, buttons will show to `leave group` and view `approved` users.

## Profile

If the user is logged in, the Profile page will show a side tab showing the user's name, email, and discord tag. \
The main window has three options: Edit Profile, My Postings, and My Requests.

### Edit Profile

Users can update their name, discord tag, and description if they wish. Pressing the `Update` button confirms these changes. \
Note: Discord tags and description are not set to anything by default.

### My Postings

Users can view the posts they've created. \
Posts will be split into `ACTIVE` and `INACTIVE`. \
Similar to the Postings page, users will see options to `delete`, `deactivate`, view `requests`, and view `approved` users. \
For inactive posts, users will see options to `delete` or `activate`.

### Pending

Users can view the posts they've requested to join and `unrequest` if they wish.

### Approved

Users can view the posts they've been approved to join. and `leave` if they wish. \
Users can also view other `approved` users.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
