console.log("hello world");
// var highScoreButton = document.querySelector("#highScore-button");
// var highScoreContainer = document.querySelector("#highScore-container");
// var homePageButton = document.querySelector("#go-back-button");

// homePageButton.addEventListener("click", function () {
//   document.location = "index.html";
// });

// var allHighScores = [];
// if (localStorage.getItem("highScores") != null) {
//   allHighScores = JSON.parse(localStorage.getItem("highScores"));
// }

// // after click or submit event
// event.preventDefault;
// var userInput = document.querySelector("#user-name-text");
// var nameHighScore = {
//   // score: value retrieved from mazes complete
//   userName: userInput.value,
// };

// allHighScores.push(nameHighScore);
// saveHighScores();
// displayHighScores();
// // line 10-20 will be placed inside a function that will be called after a user
// // completed all the mazes or the time runs out

// function saveHighScores() {
//   localStorage.setItem("highScores", JSON.stringify(allHighScores));
// }

// function renderHighScores() {
//   highScoreContainer.innerHTML = "";

//   for (var i = 0; i < allHighScores.length; i++) {
//     var highScoreName = allHighScores[i].userName;
//     var highScore = allHighScores[i].score;

//     var p = document.createElement("p");
//     p.setAttribute("data-index", i);
//     highScoreContainer.appendChild(p);
//     p.textContent = `${highScoreName} ${highScore}`;
//   }
// }

// function displayHighScores() {
//   // user inner html or something to say "Highscores"
//   // create container or set container to display
//   renderHighScores();
// }

// function viewHighScores() {
//   highScoreButton.addEventListener("click", function () {});
//   // create container or set container to display
//   displayHighScores();
// }

// var clearHighscoreButton = document.querySelector("#reset-highScores");
// function clearHighScores() {
//   clearHighscoreButton.addEventListener("click", function () {
//     localStorage.removeItem("highscores");
//   });
// }
// clear highscores button and function?

// var timeContainer = document.querySelector("#time");
// var secondsLeft = 0;
// var timeInterval;
// function stopTime() {
//   clearInterval(timeInterval);
// }
// function countUp() {
//   timeContainer.textContent = `TIME: ${secondsLeft}`;
//   timeInterval = setInterval(function () {
//     secondsLeft++;
//     timeContainer.textContent = `TIME: ${secondsLeft}`;
//   }, 1000);
// }
// console.log(timeInterval)
