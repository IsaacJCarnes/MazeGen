console.log("hello world");

var highScoreContainer = document.querySelector("#highScore-container");
var homePageButton = document.querySelector("#go-back-button");
var clearHighscoreButton = document.querySelector("#reset-highScores");

homePageButton.addEventListener("click", function () {
  document.location = "index.html";
});

function getHighscoresFromLocalStorage() {
  return JSON.parse(localStorage.getItem("highScores")) || [];
}

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

function displayHighScores() {
  renderHighScores();
}

function clearHighScores() {
  clearHighscoreButton.addEventListener("click", function () {
    localStorage.removeItem("highScores");
    location.reload();
  });
}

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
    var finishMessage = document.querySelector("#congrats")
    finishMessage.textContent = `Great job, you finished! Treat yourself with some ${favFood}.`
}
foodGif();
clearHighScores();
displayHighScores();
