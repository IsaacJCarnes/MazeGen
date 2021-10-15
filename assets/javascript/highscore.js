console.log("hello world");
var highScoreButton = document.getElementById("highScores");

var homePageButton = document.querySelector("#go-back-button")
  homePageButton.addEventListener("click", function () {
    document.location = "index.html"
  })

var allHighScores = [];
if (localStorage.getItem("highScores") != null) {
  allHighScores = JSON.parse(localStorage.getItem("highScores"));
}

// after click or submit event
event.preventDefault;
var userInput = document.getElementById("fill-this-in-with-actual-id");
var nameHighScore = {
  // score: value retrieved from mazes complete
  userName: userInput.value,
};

allHighScores.push(nameHighScore);
saveHighScores();
displayHighScores();
// line 10-20 will be placed inside a function that will be called after a user
// completed all the mazes or the time runs out

function saveHighScores() {
  localStorage.setItem("highScores", JSON.stringify(allHighScores));
}

function renderHighScores() {
  somethingContainer.innerHTML = "";

  for (var i = 0; i < highScores.length; i++) {
    var higSscoreName = highScores[i].userName;
    var highScore = highScores[i].score;

    var p = document.createElement("p");
    p.setAttribute("data-index", i);
    document.querySelector("#ID FROM CONTAINER").appendChild(p);
    p.textContent = `${highScoreName} ${highScore}`;
  }
}

function displayHighScores() {
  // user inner html or something to say "Highscores"
  // create container or set container to display
  renderHighScores();
}

function viewHighScores() {
  highScoreButton.addEventListener("click", function () {});
  // create container or set container to display
  displayHighScores();
}

var clearHighscoreButton = document.querySelector("#reset-highScores")
function clearHighScores() {
  clearHighscoreButton.addEventListener("click", function () {
    localStorage.removeItem("highscores");
  });
}
// clear highscores button and function?
