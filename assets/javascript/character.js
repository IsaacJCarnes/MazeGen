//var playContainer = document.getElementById("playContainer");

var blocks = document.querySelectorAll("div");
var startPoint = document.getElementById("00 00");
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

// var finishedTime = [];
// if (localStorage.getItem("finshedTime") != null) {
//   finishedTime = JSON.parse(localStorage.getItem("finishedtime"));
// }
// function saveFinishedTime() {
//   localStorage.setItem("finishedTime", JSON.stringify(finishedTime));
// }

function stopTime() {
  clearInterval(timeInterval);
  // var score = seconds
  // finishedTime.push(score);
  // saveFinishedTime();
}

function countUp() {
  timeContainer.textContent = `TIME: ${seconds}`;
  timeInterval = setInterval(function () {
    seconds++;
    timeContainer.textContent = `TIME: ${seconds}`;
  }, 1000);
}

function callCharacter() {
  var characterUrl = "https://acnhapi.com/v1/villagers";

  fetch(characterUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      bearIcon = data.bea02.icon_uri;
      tigerIcon = data.tig04.icon_uri;
      wolfIcon = data.wol04.icon_uri;
      frogIcon = data.flg03.icon_uri;
      goatIcon = data.goa02.icon_uri;

      icon = [bearIcon, tigerIcon, wolfIcon, frogIcon, goatIcon];
      iconImage.setAttribute(
        "src",
        icon[Math.floor(Math.random() * icon.length)]
      );
    });
}

function placeCharacter() {
  iconImage.setAttribute("alt", "bear icon");
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
}

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

  leftStretch = leftStretch - horiChange;
  document.getElementById("playContainer").style.left = leftStretch + "%";
}

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

  topStretch = topStretch - vertChange;
  document.getElementById("playContainer").style.top = topStretch + "%";
}

function checkIfWall(x, y) {
  var cellArray = [x, y];
  var newLocation = cellArray.join(" ");
  return (
    document.getElementById(`${newLocation}`).getAttribute("data-is-wall") ===
    "true"
  );
}

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

function upEventHandler(event) {
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
  // var newLocation = cellArray.join(" ");
  if (checkIfWall(cellArray[0], cellArray[1])) {
    // "do nothing"
    characterHitWall();
  } else {
    moveCharacterUp();
    rowPos--;
  }
}

function downEventHandler(event) {
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
  // var newLocation = cellArray.join(" ");
  if (checkIfWall(cellArray[0], cellArray[1])) {
    // "do nothing"
    characterHitWall();
  } else {
    moveCharacterDown();
    rowPos++;
    if (checkIfFinished(cellArray[0], cellArray[1]) > 0) {
      setTimeout(function () {
        if (randomMaze() == null) {
          stopTime();
          displayForm();
          // document.location = "highScore.html";
          // console.log(seconds) this does stop and log the correct time when a user finishes the last maze
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
function rightEventHandler(event) {
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
  // var newLocation = cellArray.join(" ");
  if (checkIfWall(cellArray[0], cellArray[1])) {
    // "do nothing"
    characterHitWall();
  } else {
    moveCharacterRight();
    colPos++;
    if (checkIfFinished(cellArray[0], cellArray[1]) > 0) {
      setTimeout(function () {
        if (randomMaze() == null) {
          stopTime();
          displayForm();
          // document.location = "highScore.html"; have this part of on submit function
          // console.log(seconds) logs correct time, how to get this onto highscores
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

function leftEventHandler(event) {
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
  // var newLocation = cellArray.join(" ");
  if (checkIfWall(cellArray[0], cellArray[1])) {
    // "do nothing"
    characterHitWall();
  } else {
    moveCharacterLeft();
    colPos--;
  }
}

document.addEventListener("keydown", function (event) {
  var key = event.key.toLowerCase();

  if ("wasd".indexOf(key) >= 0) {
    switch (key) {
      case "s":
        downEventHandler(event);
        break;
      case "w":
        upEventHandler(event);
        break;
      case "d":
        rightEventHandler(event);
        break;
      case "a":
        leftEventHandler(event);
        break;
    }
  }
});

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

var modal = document.getElementById("highModal");
var span = document.getElementsByClassName("close")[0];
var timeH2 = document.getElementById("finished-time-display");

function getHighscoresFromLocalStorage() {
    return JSON.parse(localStorage.getItem("highScores")) || [];
}


function displayForm() {
  var allHighScores = getHighscoresFromLocalStorage();
  timeH2.innerHTML = `You finished the mazes in ${seconds} seconds. Enter your name below to save your score`;
  modal.style.display = "block";

  var formContainer = document.getElementById("userForm")
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
    // displayHighScores();
    document.location = "highScore.html";
  });
}

function saveHighScores(arr) {
  localStorage.setItem("highScores", JSON.stringify(arr));
}

callCharacter();
placeCharacter();
countUp();
