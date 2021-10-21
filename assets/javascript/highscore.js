var highScoreContainer = document.querySelector("#highScore-container");
var homePageButton = document.querySelector("#go-back-button");
var clearHighscoreButton = document.querySelector("#reset-highScores");

homePageButton.addEventListener("click", function () {
  document.location = "index.html";
});
// click event to take user back to homepage

function getHighscoresFromLocalStorage() {
  return JSON.parse(localStorage.getItem("highScores")) || [];
}
// function for retrieving items saved in local storage

function renderHighScores() {
  var allHighScores = getHighscoresFromLocalStorage();
  highScoreContainer.innerHTML = "";

  for (var i = 0; i < allHighScores.length; i++) {
    var highScoreName = allHighScores[i].userName;
    var highScore = allHighScores[i].score;

    var li = document.createElement("li");
    li.setAttribute("data-index", i);
    highScoreContainer.appendChild(li);
    li.textContent = `${highScoreName}: ${highScore} seconds`;
  }
}
// empties container, then uses for loop to create list items for all items in local storage (name and score)

function displayHighScores() {
  renderHighScores();
}
// displays highscores to page

function clearHighScores() {
  clearHighscoreButton.addEventListener("click", function () {
    localStorage.removeItem("highScores");
    var highList = document.getElementById("highScore-container");
    highList.innerHTML = "";
    var resetMessage = document.querySelector("#congrats");
    resetMessage.innerHTML = "All Reset!";
  });
}
//empties saved items and clears list items from page

function foodGif() {
  var allHighScores = getHighscoresFromLocalStorage();
  var favFood = allHighScores[allHighScores.length - 1].userFood;
  var foodURL = `https://api.giphy.com/v1/gifs/search?q=${favFood}&api_key=Y7ydLBRXvMZyDQOIVNwjMcWyI3mJmThc`;
  fetch(foodURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var foodImg = document.getElementById("foodGif");
      var foodURL = data.data[1].images.original.url;
      foodImg.setAttribute("src", foodURL);
    });
  var finishMessage = document.querySelector("#congrats");
  finishMessage.textContent = `Great job, you finished! Treat yourself to some ${favFood}.`;
}
// api function which takes user input and applies that to api call and assign that url to existing empty image elements

foodGif();
clearHighScores();
displayHighScores();
