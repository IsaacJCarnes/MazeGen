var instructionModal = document.getElementById("instructionModal");
var hsModal = document.getElementById("highScoreModal");

var instructionBtn = document.getElementById("modal-button");
var hsBtn = document.getElementById("highScore-button");

var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];

var maze = document.getElementsByClassName("");
var mainContainer = document.querySelector(".mainContainer");
var giphyLink = document.querySelector("#giphy-link");

// When the user clicks the button, open the modals
instructionBtn.addEventListener("click", function () {
  instructionModal.style.display = "block";
});

hsBtn.addEventListener("click", function () {
  hsModal.style.display = "block";
});

// When the user clicks on <span> (x), close the modals
span.addEventListener("click", function () {
  instructionModal.style.display = "none";
});
span2.addEventListener("click", function () {
  console.log("clicked");
  hsModal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function (event) {
  if (event.target == instructionModal || event.target == hsModal) {
    instructionModal.style.display = "none";
    hsModal.style.display = "none";
  }
});

var startBtn = document.querySelector("#start-button");
const playContainer = document.getElementById("playContainer");
startBtn.addEventListener("click", function () {
  console.log("start");
  document.location = "mazePage.html";
  // takes user to maze page
});

giphy();
function giphy() {
  var giphyURL =
    "https://api.giphy.com/v1/gifs/search?q=green+maze&api_key=Y7ydLBRXvMZyDQOIVNwjMcWyI3mJmThc";
  fetch(giphyURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var gifImg = document.getElementById("mazeGif");
      var gifURL = data.data[1].images.original.url;
      gifImg.setAttribute("src", gifURL);
    });
}
// calls api and assigns it to img elements

function getHighscoresFromLocalStorage() {
  return JSON.parse(localStorage.getItem("highScores")) || [];
}
// retrieves highscores from local storage

var highScoreModalContainer = document.querySelector("#hs-modal-container");
function renderHighScores() {
  var allHighScores = getHighscoresFromLocalStorage();
  highScoreModalContainer.innerHTML = "";

  for (var i = 0; i < allHighScores.length; i++) {
    var highScoreName = allHighScores[i].userName;
    var highScore = allHighScores[i].score;

    var li = document.createElement("li");
    li.setAttribute("data-index", i);
    highScoreModalContainer.appendChild(li);
    li.textContent = `${highScoreName}: ${highScore} seconds`;
  }
}
// modal which getss highscores and assigns them to list items through a for loop 

function saveAnimal() {
  var character = document.getElementById("animal").value
  localStorage.setItem("animal", character);
} 
// saved animal selection from menu to local storafge to be accessed in character js 

renderHighScores();
