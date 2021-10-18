console.log("hello world");

var highScoreButton = document.querySelector("#highScore-button");
var highScoreContainer = document.querySelector("#highScore-container");
var homePageButton = document.querySelector("#go-back-button");
var formContainer = document.querySelector("#userForm");
var clearHighscoreButton = document.querySelector("#reset-highScores");

homePageButton.addEventListener("click", function () {
  document.location = "index.html";
});

var allHighScores = [];
if (localStorage.getItem("highScores") != null) {
  allHighScores = JSON.parse(localStorage.getItem("highScores"));
}

formContainer.addEventListener("submit", function (event) {
  event.preventDefault();
  var userInput = document.querySelector("#user-name-text");
  var nameHighScore = {
//  score: seconds, 
//  seconds reset back to 0 after user finished and loaded up highscore page, fixable?
    score: JSON.parse(localStorage.getItem("finishedTime")),
    userName: userInput.value,
  };

  allHighScores.push(nameHighScore);
  saveHighScores();
  displayHighScores();
});

function saveHighScores() {
  localStorage.setItem("highScores", JSON.stringify(allHighScores));
}

function renderHighScores() {
  highScoreContainer.innerHTML = "";

  for (var i = 0; i < allHighScores.length; i++) {
    var highScoreName = allHighScores[i].userName;
    var highScore = allHighScores[i].score;

    var p = document.createElement("p");
    p.setAttribute("data-index", i);
    highScoreContainer.appendChild(p);
    p.textContent = `${highScoreName} finished in ${highScore} seconds`;
  }
}

function displayHighScores() {
  formContainer.setAttribute("style", "display: none");
  renderHighScores();
}

function clearHighScores() {
  clearHighscoreButton.addEventListener("click", function () {
    localStorage.removeItem("highScores");
    location.reload();
  });
}

clearHighScores();

// function viewHighScores() {
//   highScoreButton.addEventListener("click", function () {});
//   document.location = "highScore.html";
//   displayHighScores();
// }