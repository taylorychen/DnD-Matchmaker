# Installation

First, install `Node v16.18.0` if it is not already installed. Then, run

```
git clone https://github.com/taylorychen/35L-project.git
```

To clone the repo to your local system. Go into the repository

```
cd 35L-Project
```

and install the dependencies by running

```
npm install
```

After the installation completes, you can start the locally by running

```
npm start
```

You will then be able to use it in your browser.

# Using Unhinged: A Dungeons & Dragons Matchmaker

This README was last updated 11/22/22 at around 7:00 PM PST.

## Home page

The front page will show a login screen. Users must be logged in to interact with posts, as well as access the Profile page. \
Users will be logged and authenticated with Google Authentication. This will automatically create an account.

## Postings

This page displays all of the active posts (excuding full games and the user's own posts). \
The posts show information about the owner/Dungeon Master's game including number of players, location, and title. For further information about the game, there is a more information button that will display additional information including the tags and description. \
Logged in users can interact with these posts by requesting to join them. \
The `CREATE` button for users to create their own posts. \
A toggle allows users to switch between a dark and light dungeons and dragons mode for the posting cards on the postings page depending on which color scheme they liked better. \
Postings are split up by pages in the postings page. Each page can have up to 24 postings and the application will automatically add a new page after one page fills up and decrease pages if enough postings are deleted.

### Searching

The top of the page displays a search bar. \
Users can search by a string that may appear in post's `Location` or `Title` \
Users can also filter by tags.

### Post interactions

Buttons appear under each post depending on the user's status in relation to them. \
If the user own the post, users will see options to `delete`, `deactivate`, view `requests` and the basic information and descriptions of users who sent requests, and view `approved` users along with additional information associated with those users such as discord contact information. \
Other posts will show with an option to `request to join`. \
If the user has already requested, a button to `unrequest` will appear instead. \
If the user is already approved, buttons will show to `leave group` and view `approved` users and their information like contact information associated with the other group members as well as the group owner's information.

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
