span that declares the score
input for the user to inser their initials
submit button

--> click listener for the submit button to kick of a save score function

save score function
get the value of the score
get the value of the initials (use .value() method)

take the score and initials and set into an object
    var newHighScore = {
        "initials": initials,
        "score": score
    }

Create empty array of scores to add score objects to:
var allHighScores = [];

allHighScores.push(newHighScore);

localStorage.setItem("highScores", allHighScores)

localStorage.getItem("highScores")