# MazeGen

## Description
The webpage is a maze game where user can test their skills to traverse through a set of fixed mazes and try and complete it in the fastest possible time.

The motivation was to create a relatively simple, enjoyable and possibly time consuming game which they can play when bored, need a break, and looking to improve their memorization and problem solving skills.

This webpage solves the problem when people need a break to de-stress and take their mind off of problems they're having as well as improve cognitive skills since mazes are used as a brain exercise.

During this project we learned how to work together as a team, the details and proper usage of branches when creating webpages. We also learned more about how to properly use API's and using a CSS framework. We furthered our knowledge of local storage, webpage layout with css styling, use of functions and click events, and how to connect each of them together to get a properly working webpage.

## Acceptance Criteria
As a user on the home page you are presented with an instructions and highscore button below the header.

When a user clicks instructions
- Then a user is presented with a modal containing the instructions for the game

When a user clicks highscores
- Then a user is presented with a modal containing previous highscores of past users

When a user clicks the start button
- Then the user is loaded in as a random animal onto a randomly selected maze and a timer begins

When a user wants to move
- Then user will have to use the "W' key to move up, the "A" key to move left, the "S" key to move down, and the "D" key to move right. The user can also use on-screen buttons to move if their screen is smaller than 800 pixels.

When a user runs into a wall
- Then the user character will shake

When a user reaches the end point which has a image saying "end"
- Then the user will be loaded into a new maze at the top left again

When a user completed all mazes
- Then the user will be presented with a form including what their time was and prompted to provide input for their name and favorite food

When a user submits the form 
- Then the user will be taken to the highscore page

When a user is on the highscore page
- Then the user will be able to view previous highscores with their most recent score listed in different color, click a homepage button, click a reset highscores button, and view a congratulating message on finishing the mazes with a related food gif

When a user clicks homepage
- Then a user is taken back to the homepage

When a user clicks reset highscores
- Then highscores are cleared from local storage

Goodluck!

# Pages
## Landing Page:
The landing page is a basic layout with a 
- header
- nav bar including 2 buttons which include instructions and highscore modals
- a greeting message
- start button
- maze gif

The landing page was styled in CSS and utilizing UIkit as a framework.

The landing page javascript had event listeners primarily which were looked for when either of the 3 buttons on the screen were clicked. It also had click events relating to the modals to display as well as hide them for either when the (X) was clicked or when a user clicks outside of the modal. The JS also included a function which called an api and an additional function relating to get highscores from local storage and displaying said highscores in the modal.

## Game Page:
The game page includes:
- randomly generated character which is a created img and appended to starting point initially
- maze with multi-colored walls wich are all div elements
- end point that is marked
- fixed timer at bottom center of screen which increments by the seconds

The game CSS was used to style the page as well as check the screen width for when the directional buttons will display. The game CSS was also responsible for the shake animation when a user hits a wall.

The game javascript was broken into 2 seperate JS files, one for maze generation (game.js) and one for character and movement (character.js). 

The character and movement used functions and events which:
- allows a user to user "WASD" keys to move their character, and if the screen is small enough, lets a user user directional buttons

- to get the character to move, the id for each div which was two sets of numbers (ex. #00 00) was broken down and the related direction would add or subtract 1 from the respective id component and then that new ID was assigned to variable and the character image was appended to the variable with the new ID.

- generates a random character from an api.

- contains the time function which increments time with other function for stopping time.

- has function to check if a user hit a wall, check if user is finished, response when user hits wall.

- functions to save highscore, get highscore, and display a modal when user finished mazes which they can view the time they finished and input their name and favorite food.

- Some of these functions had timeout set so it was delayed such as when a user hits the end point they sit there for half a second rather than not seeing their character hit the end point and immediately be placed on the next maze.

The game JS used functions and events which:
- T

## Highscore Page
The highscore page includes: 
- a header
- 2 buttons
- list of previous highscores
- container with a congratulations message
- related gif from user input
- direction to if user wants to go again. 
- The homepage button takes a user back to the starting page and the reset highscores function resets the saved highscores as you would expect. The gif is related to whatever the user put in as their favorite food.

The highscore CSS was styled so the last saved highscore is a different color as well as for the layout of the page and coloring of all content.

The highscore JS used functions which:
- get item to retrieve highscores from local storage.

- used a for loop and created list items and appended saved highscores to created li tags which were then appended to an existing ul element in the HTML.

- uses an API call to get the input of favorite food and find a related gif to display when the page is loaded.

- contained a click event which would remove highscores from local storage

- a click event to take user back to homepage

## Resources
Framework: 

[UIkit](https://cdn.jsdelivr.net/npm/uikit@3.7.6/dist/css/uikit.min.css)
- This was used to add styling to the webpage.

APIs:

[GIPHY](https://developers.giphy.com/)
- This API was used to generate a maze gif on the homepage as well as generate a gif related to user input after they completed the mazes and is displayed on the highscore page.

[ACNH](https://acnhapi.com/v1/villagers)
- This API was used to generate a random animal character that a user will play as when playing Maze Runner

## Github link
Click here to access the Github Repo: [Github](https://github.com/IsaacJCarnes/MazeGen.git)

## Deployed link
Click here to access the deployed link: [Github pages](https://isaacjcarnes.github.io/MazeGen/)

## Contributors

Adriana: 
- Landing page index.html 
- style.css of the landing page 
- Start button on land page
- fade in and shaken of the character using Uikit
- readme.md
- Checkout my [Github here](https://github.com/AdrianaBroadnax)

Phalen:  
- API calls for landing page gif, random character display, and for food gif on highscores page
- Character movement functions and keys events, checking if wall or if finished
- Highscore HTML, styling, and JS for displaying page, responsiveness, as well as accessing items saved in local storage, 
- buttons for changing pages and resetting saved items on highscore page
- modals on landingpage for instructions aprevious highscores
- form modal for filling out information when finished
- stlying the modals on landing page and after user completed mazes
- Description and Pages in readme
- Checkout my [Github here](https://github.com/PhalenH)

Isaac:
- Maze creation functions (game.js)
- CSS for maze styling
- Movement buttons for small screens
- Checkout my [Github here](https://github.com/IsaacJCarnes)


