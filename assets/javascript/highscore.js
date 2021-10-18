console.log("hello world");

var highScoreButton = document.querySelector("#highScore-button");
var highScoreContainer = document.querySelector("#highScore-container");
var homePageButton = document.querySelector("#go-back-button");
var formContainer = document.querySelector("#userForm")

homePageButton.addEventListener("click", function () {
  document.location = "index.html";
});

var allHighScores = [];
if (localStorage.getItem("highScores") != null) {
  allHighScores = JSON.parse(localStorage.getItem("highScores"));
}

// after click or submit event
formContainer.addEventListener("submit", function(event){
event.preventDefault();
var userInput = document.querySelector("#user-name-text");
var nameHighScore = {
  score: seconds,
  userName: userInput.value,
};

allHighScores.push(nameHighScore);
saveHighScores();
displayHighScores();

})
// line from event.preventDefault to displayhighscores(); will be placed inside a function that will be called after a user
// completed all the mazes or the time runs out

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
  // create container or set container to display
}

function viewHighScores() {
  highScoreButton.addEventListener("click", function () {});
  // create container or set container to display
  displayHighScores();
}

var clearHighscoreButton = document.querySelector("#reset-highScores");
function clearHighScores() {
  clearHighscoreButton.addEventListener("click", function () {
    localStorage.removeItem("highScores");
    location.reload();
  });
}

clearHighScores();
