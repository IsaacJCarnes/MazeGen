//var playContainer = document.getElementById("playContainer");

var blocks = document.querySelectorAll("div");
var startPoint = document.getElementById("00 00");
var endPoint = document.getElementById("18 18");
var colPos = 0;
var rowPos = 0;
var iconImage = document.createElement("img");
var topStretch = 0;
var vertChange = 21;
var leftStretch = 0;
var horiChange = 21;

var timeContainer = document.querySelector("#timeContainer");
var seconds = 0;
var timeInterval;

var buttonContainer = document.getElementById("buttonContainer");

function stopTime() {
  clearInterval(timeInterval);
}
// stop countup

function countUp() {
  timeContainer.textContent = `TIME: ${seconds}`;
  timeInterval = setInterval(function () {
    seconds++;
    timeContainer.textContent = `TIME: ${seconds}`;
  }, 1000);
}
// increments time from 0 every second

function callCharacter() {
  var characterUrl = "https://acnhapi.com/v1/villagers";

  fetch(characterUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let bearIcon = data.bea02.icon_uri;
      let tigerIcon = data.tig04.icon_uri;
      let wolfIcon = data.wol04.icon_uri;
      let frogIcon = data.flg03.icon_uri;
      let goatIcon = data.goa02.icon_uri;
      let selectedAnimal = localStorage.getItem("animal")
      let icon = ""
      switch (true) {
        case selectedAnimal === "bear":
          icon = bearIcon
          break;
          case selectedAnimal === "tiger":
          icon = tigerIcon
          break;
          case selectedAnimal === "wolf":
          icon = wolfIcon
          break;
          case selectedAnimal === "frog":
          icon = frogIcon
          break;
          case selectedAnimal === "goat":
          icon = goatIcon
          break;
      }
      iconImage.setAttribute("src", icon);
    });
}
// api call get characters and then assigns character to icon image based on user selection

function placeCharacter() {
  iconImage.setAttribute("alt", "animal icon");
  iconImage.setAttribute("id", "userIcon");
  iconImage.setAttribute("class", "character-icon uk-animation-fade");
  setTimeout(
    function (imageElem) {
      imageElem.setAttribute("class", "character-icon");
    },
    1000,
    iconImage
  );
  iconImage.setAttribute("src", "assets/images/loading-circle.png");
  startPoint.appendChild(iconImage);
  movedRightBefore = false;
  movedDownBefore = false;
  var endImage = document.createElement("img");
  endImage.setAttribute("alt", "final icon");
  endImage.setAttribute("id", "endPointIcon");
  endImage.setAttribute("class", "character-icon");
  endImage.setAttribute("src", "assets/images/last-cell.png");
  endPoint.appendChild(endImage);
}
// places character on startpoint with fade in, adds image on start/end point

function moveCharacterLeft() {
  var cellID = iconImage.parentNode.id;
  var cellArray = cellID.split(" ");
  var firstIndex = parseInt(cellArray[0]);
  var movedToCell = firstIndex - 1;
  var backToString = JSON.stringify(movedToCell);
  var revertedString = "0";
  var completedID = "";
  if (backToString.length === 1) {
    completedID = revertedString + backToString;
  } else if (backToString.length === 2) {
    completedID = backToString;
  }
  cellArray[0] = completedID;
  var newLocation = cellArray.join(" ");
  document.getElementById(`${newLocation}`).appendChild(iconImage);
  leftStretch = leftStretch + horiChange;
  document.getElementById("playContainer").style.left = leftStretch + "%";
}
// takes img element's current div location ID, changess ID which assigns it to the div element to the left of the character

var movedRightBefore = false;
function moveCharacterRight() {
  var cellID = iconImage.parentNode.id;
  var cellArray = cellID.split(" ");
  var firstIndex = parseInt(cellArray[0]);
  var movedToCell = firstIndex + 1;
  var backToString = JSON.stringify(movedToCell);
  var revertedString = "0";
  var completedID = "";
  if (backToString.length === 1) {
    completedID = revertedString + backToString;
  } else if (backToString.length === 2) {
    completedID = backToString;
  }
  cellArray[0] = completedID;
  var newLocation = cellArray.join(" ");
  document.getElementById(`${newLocation}`).appendChild(iconImage);

  if (movedRightBefore == false) {
    movedRightBefore = true;
  } else {
    leftStretch = leftStretch - horiChange;
    document.getElementById("playContainer").style.left = leftStretch + "%";
  }
}
// takes img element's current div location ID, changess ID which assigns it to the div element to the right of the character. Also won't move screen on first move to right.

function moveCharacterUp() {
  var cellID = iconImage.parentNode.id;
  var cellArray = cellID.split(" ");
  var firstIndex = parseInt(cellArray[1]);
  var movedToCell = firstIndex - 1;
  var backToString = JSON.stringify(movedToCell);
  var revertedString = "0";
  var completedID = "";
  if (backToString.length === 1) {
    completedID = revertedString + backToString;
  } else if (backToString.length === 2) {
    completedID = backToString;
  }
  cellArray[1] = completedID;
  var newLocation = cellArray.join(" ");
  document.getElementById(`${newLocation}`).appendChild(iconImage);

  topStretch = topStretch + vertChange;
  document.getElementById("playContainer").style.top = topStretch + "%";
}
// takes img element's current div location ID, changess ID which assigns it to the div element above the character.

var movedDownBefore = false;
function moveCharacterDown() {
  var cellID = iconImage.parentNode.id;
  var cellArray = cellID.split(" ");
  var firstIndex = parseInt(cellArray[1]);
  var movedToCell = firstIndex + 1;
  var backToString = JSON.stringify(movedToCell);
  var revertedString = "0";
  var completedID = "";
  if (backToString.length === 1) {
    completedID = revertedString + backToString;
  } else if (backToString.length === 2) {
    completedID = backToString;
  }
  cellArray[1] = completedID;
  var newLocation = cellArray.join(" ");
  document.getElementById(`${newLocation}`).appendChild(iconImage);

  if (movedDownBefore == false) {
    movedDownBefore = true;
  } else {
    topStretch = topStretch - vertChange;
    document.getElementById("playContainer").style.top = topStretch + "%";
  }
}
// takes img element's current div location ID, changess ID which assigns it to the div element below the character. Also won't move screen on first move down.

function checkIfWall(x, y) {
  var cellArray = [x, y];
  var newLocation = cellArray.join(" ");
  return (
    document.getElementById(`${newLocation}`).getAttribute("data-is-wall") ===
    "true"
  );
}
// function to check if new location is a wall

function checkIfFinished(x, y) {
  var cellArray = [x, y];
  var newLocation = cellArray.join(" ");
  let rows =
    document.getElementById("playContainer").getAttribute("data-rows") - 1;
  let cols =
    document.getElementById("playContainer").getAttribute("data-cols") - 1;
  document.getElementById(rows + " " + cols);
  if (cols == x && rows == y) {
    return true;
  } else {
    return false;
  }
}
// function to check if character is on bottom right div element

function upEventHandler() {
  var cellID = iconImage.parentNode.id;
  var cellArray = cellID.split(" ");
  var firstIndex = parseInt(cellArray[1]);
  var movedToCell = firstIndex - 1;
  var backToString = JSON.stringify(movedToCell);
  var revertedString = "0";
  var completedID = "";
  if (backToString.length === 1) {
    completedID = revertedString + backToString;
  } else if (backToString.length === 2) {
    completedID = backToString;
  }
  cellArray[1] = completedID;
  if (checkIfWall(cellArray[0], cellArray[1])) {
    characterHitWall();
  } else {
    moveCharacterUp();
    rowPos--;
  }
}
//handler for logic of event

function downEventHandler() {
  var cellID = iconImage.parentNode.id;
  var cellArray = cellID.split(" ");
  var firstIndex = parseInt(cellArray[1]);
  var movedToCell = firstIndex + 1;
  var backToString = JSON.stringify(movedToCell);
  var revertedString = "0";
  var completedID = "";
  if (backToString.length === 1) {
    completedID = revertedString + backToString;
  } else if (backToString.length === 2) {
    completedID = backToString;
  }
  cellArray[1] = completedID;
  if (checkIfWall(cellArray[0], cellArray[1])) {
    characterHitWall();
  } else {
    moveCharacterDown();
    rowPos++;
    if (checkIfFinished(cellArray[0], cellArray[1]) > 0) {
      setTimeout(function () {
        if (randomMaze() == null) {
          stopTime();
          displayForm();
        } else {
          topStretch = 0;
          leftStretch = 0;
          document.getElementById("playContainer").style.top = 0 + "%";
          document.getElementById("playContainer").style.left = 0 + "%";
        }
      }, 500);
      setTimeout(function () {
        callCharacter();
      }, 500);
      setTimeout(function () {
        placeCharacter();
      }, 500);
    }
  }
}
//handler for logic of event, with additional code for checking if finished with timeout so character can be seen moving to final spot on maze

function rightEventHandler() {
  var cellID = iconImage.parentNode.id;
  var cellArray = cellID.split(" ");
  var firstIndex = parseInt(cellArray[0]);
  var movedToCell = firstIndex + 1;
  var backToString = JSON.stringify(movedToCell);
  var revertedString = "0";
  var completedID = "";
  if (backToString.length === 1) {
    completedID = revertedString + backToString;
  } else if (backToString.length === 2) {
    completedID = backToString;
  }
  cellArray[0] = completedID;
  if (checkIfWall(cellArray[0], cellArray[1])) {
    characterHitWall();
  } else {
    moveCharacterRight();
    colPos++;
    if (checkIfFinished(cellArray[0], cellArray[1]) > 0) {
      setTimeout(function () {
        if (randomMaze() == null) {
          stopTime();
          displayForm();
        } else {
          topStretch = 0;
          leftStretch = 0;
          document.getElementById("playContainer").style.top = 0 + "%";
          document.getElementById("playContainer").style.left = 0 + "%";
        }
      }, 500);
      setTimeout(function () {
        callCharacter();
      }, 500);
      setTimeout(function () {
        placeCharacter();
      }, 500);
    }
  }
}
//handler for logic of event, with additional code for checking if finished with timeout so character can be seen moving to final spot on maze

function leftEventHandler() {
  var cellID = iconImage.parentNode.id;
  var cellArray = cellID.split(" ");
  var firstIndex = parseInt(cellArray[0]);
  var movedToCell = firstIndex - 1;
  var backToString = JSON.stringify(movedToCell);
  var revertedString = "0";
  var completedID = "";
  if (backToString.length === 1) {
    completedID = revertedString + backToString;
  } else if (backToString.length === 2) {
    completedID = backToString;
  }
  cellArray[0] = completedID;
  if (checkIfWall(cellArray[0], cellArray[1])) {
    characterHitWall();
  } else {
    moveCharacterLeft();
    colPos--;
  }
}
//handler for logic of event

document.addEventListener("keydown", function (event) {
  var key = event.key.toLowerCase();

  if ("wasd".indexOf(key) >= 0) {
    switch (key) {
      case "s":
        downEventHandler();
        break;
      case "w":
        upEventHandler();
        break;
      case "d":
        rightEventHandler();
        break;
      case "a":
        leftEventHandler();
        break;
    }
  }
});
// event listeners which calls others events and actually moves the character

function moveFromButton(event) {
  //Called by buttons visible only when screen width < 800px
  var element = event.target;
  if (element.nodeName === "BUTTON") {
    switch (element.id) {
      case "buttonDown":
        downEventHandler(event);
        break;
      case "buttonUp":
        upEventHandler(event);
        break;
      case "buttonRight":
        rightEventHandler(event);
        break;
      case "buttonLeft":
        leftEventHandler(event);
        break;
    }
  }
}
// allows movement by clicking buttons

function characterHitWall() {
  iconImage.setAttribute("class", "character-icon uk-animation-shake");
  setTimeout(
    function (imageElem) {
      imageElem.setAttribute("class", "character-icon");
    },
    250,
    iconImage
  );
}
// calls a response for when character hits a wall

var modal = document.getElementById("highModal");
var span = document.getElementsByClassName("close")[0];
var timeH2 = document.getElementById("finished-time-display");

function getHighscoresFromLocalStorage() {
  return JSON.parse(localStorage.getItem("highScores")) || [];
}
// function for retrieving items saved in local storage

function displayForm() {
  var allHighScores = getHighscoresFromLocalStorage();
  timeH2.innerHTML = `You finished the mazes in ${seconds} seconds. Enter your name below to save your score`;
  modal.style.display = "block";

  var formContainer = document.getElementById("userForm");
  formContainer.addEventListener("submit", function (event) {
    event.preventDefault();
    var userInput = document.querySelector("#user-name-text");
    var foodInput = document.querySelector("#user-food-text");
    var nameHighScore = {
      score: seconds,
      userName: userInput.value,
      userFood: foodInput.value,
    };

    allHighScores.push(nameHighScore);
    saveHighScores(allHighScores);
    document.location = "highScore.html";
  });
}
// function for modal, as well as pushing the user input and final score to the array in local storage

function saveHighScores(arr) {
  localStorage.setItem("highScores", JSON.stringify(arr));
}
// saves highscores to local storage

callCharacter();
placeCharacter();
countUp();
