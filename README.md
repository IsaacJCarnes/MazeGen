# MazeGen

## The Maze Runner
As a user on the home page you are presented with an instructions button on the left.
An animal will appear, the user will use the animal to navigate through different mazes.
The user will have to use the "W' key to move up, the "A" key to move left, the "S" key to move down, and the "D" key to move right. The user can also use on-screen buttons to move if their screen is smaller than 800 pixels.
The objective of the maze is to see how fast the maze runner can make it out of the multiple mazes.
When the user gets to the end of the mazes, an alert will pop up letting the user know they've completed the mazes in x amount of seconds, and to put their name on the highscore page.
The highscore page will also be on the home page on the top right.
Goodluck!

## Resources
Framework: UIkit 
[UIkit]("https://cdn.jsdelivr.net/npm/uikit@3.7.6/dist/css/uikit.min.css")

Maze api on home page: "http://api.giphy.com/v1/gifs/search?q=green+maze&api_key=Y7ydLBRXvMZyDQOIVNwjMcWyI3mJmThc"

[GIPHY]("https://developers.giphy.com/")

[ACNH]("https://acnhapi.com/v1/villagers")

## Github link
[github](https://github.com/IsaacJCarnes/MazeGen.git)

## Deployed link
[github pages](https://isaacjcarnes.github.io/MazeGen/)

## Contributors

Adriana - Landing page index.html -style.css of the landing page -fade in of the character using uikit -shaken of the character usuing uikit -readme.md

Phalen  - API calls for landing page gif, random character display, and for food gif on highscores
        - Character movement functions and keys events, checking if wall or if finished
        - Highscore HTML and JS for displaying page as well as items saved in local storage
        - buttons for changing pages on landingpage and highscores
        - modals on landingpage for instructions and when user completes maze
        - form for filling out information when finished
        - stlying the modals and highscore page
Isaac   - Maze creation functions (game.js)
        - CSS for maze styling
        - Movement buttons for small screens


