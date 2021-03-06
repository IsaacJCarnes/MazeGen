## Title
Maze Generator Game

## Description (1 paragraph)
A game where a user has to navigate through a randomly generatored maze using 

## APIs (Third-party)
Giphy- To be displayed when user completes maze
(https://developers.giphy.com/docs/api#quick-start-guide)

Character- User will move around maze as character/sprite 
(http://acnhapi.com/doc)

another character- villain character that could be placed somewhere
(https://psychonauts-api.herokuapp.com/characters?name=razputin)

## Wireframe or Design for the website
![Alt text](https://github.com/IsaacJCarnes/MazeGen/blob/main/assets/images/webScreenshot-rough.png "Website Screenshot")

## List of Tasks or Acceptance Criteria

```
Given a webpage with a start game button
When a user presses start game
Then a maze is generated randomly from set parameters and a character (retrieved from character API) appears on the start block
When a user wants to move, user presses W(up), A(left), S(down), or D(down)
Then the character will move according to the assigned direction
When a user gets to end block of the maze
Then a message displays (retrieved from giphy API) and the game is over and their time is saved as their score

```

## First Task for each member
Adriana: Create html file for landing page that will include a button to start the game which will take user to html file with maze, link js to html

Isaac: Working on adding layers between start/end point so it's a maze rather than a path

Phalen: Find a sprite/character to use and rendering it to the page at the start position, creating a function that allows it to move

## What does the functioning prototype have in features for the first week?
A page with a start button that initializes the game, a character rendered at starting point with ability to move, and a randomly generated path from start to finish.