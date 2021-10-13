// console.log("hello world");

var blocks = document.querySelectorAll("div");
var startPoint = document.getElementById("00 00");

function callCharacter() {
  var characterUrl = "https://acnhapi.com/v1/villagers";

  fetch(characterUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      bearIcon = data.bea02.icon_uri;
      tigerIcon = data.tig04.icon_uri;
      wolfIcon = data.wol04.icon_uri;
      frogIcon = data.flg03.icon_uri;
      goatIcon = data.goa02.icon_uri;

      icon = [bearIcon, tigerIcon, wolfIcon, frogIcon, goatIcon];
      console.log(icon);
    });
}
callCharacter();

// function createBearIcon(bearIcon) {
var iconImage = document.createElement("img");
// iconImage.setAttribute("src", bearIcon);
iconImage.setAttribute("src", "https://acnhapi.com/v1/icons/villagers/10");
iconImage.setAttribute("alt", "bear icon");
iconImage.setAttribute("id", "userIcon");
iconImage.setAttribute("class", "bear-icon");
startPoint.appendChild(iconImage);
// }

function moveRight() {
  document.addEventListener("keydown", function (event) {
    var key = event.key.toLowerCase();

    if ("wasd".indexOf(key) >= 0) {
      switch (key) {
        case "d":
          console.log("Move right");
          var cellID = iconImage.parentNode.id;
          // console.log(cellID);
          var cellArray = cellID.split(" ");
          // console.log(cellArray);
          var firstIndex = parseInt(cellArray[0]);
          // console.log(firstIndex);
          var movedToCell = firstIndex + 1;
          // console.log(movedToCell);
          var backToString = JSON.stringify(movedToCell);
          // console.log(backToString);
          var revertedString = "0";
          // console.log(backToString.length);
          var completedID = "";
          if (backToString.length === 1) {
            completedID = revertedString + backToString;
          } else if (backToString.length === 2) {
            completedID = backToString;
          }
          // console.log(completedID);
          cellArray[0] = completedID;
          // console.log(cellArray);
          // console.log(completedID);
          var newLocation = cellArray.join(" ");
          // console.log(newLocation);
          
          // console.log(document.getElementById(`${newLocation}`))
          // // console.log(document.getElementById(`${newLocation}`).getAttribute("data-is-wall"))
          // document.getElementById(`${newLocation}`).appendChild(iconImage)
          // if (document.getElementById(`${newLocation}`).getAttribute("data-is-wall") === true) {
          //   return;
          // } else {
          document.getElementById(`${newLocation}`).appendChild(iconImage);
          // }
          break;
      }
    }
  });
}

function moveUp() {
  document.addEventListener("keydown", function (event) {
    var key = event.key.toLowerCase();

    if ("wasd".indexOf(key) >= 0) {
      switch (key) {
        case "w":
          console.log("Move up");
          var cellID = iconImage.parentNode.id;
          var cellArray = cellID.split(" ");
          var secondIndex = parseInt(cellArray[1]);
          var movedToCell = secondIndex - 1;
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
          console.log(newLocation);
          // console.log(document.getElementById(`${newLocation}`))
          // console.log(document.getElementById(`${newLocation}`).getAttribute("data-is-wall"))
          document.getElementById(`${newLocation}`).appendChild(iconImage);
          break;
      }
    }
  });
}

function moveDown() {
  document.addEventListener("keydown", function (event) {
    var key = event.key.toLowerCase();

    if ("wasd".indexOf(key) >= 0) {
      switch (key) {
        case "s":
          console.log("Move down");
          var cellID = iconImage.parentNode.id;
          var cellArray = cellID.split(" ");
          var secondIndex = parseInt(cellArray[1]);
          var movedToCell = secondIndex + 1;
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
          // console.log(document.getElementById(`${newLocation}`))
          // console.log(document.getElementById(`${newLocation}`).getAttribute("data-is-wall"))
          document.getElementById(`${newLocation}`).appendChild(iconImage);
          break;
      }
    }
  });
}

function moveLeft() {
  document.addEventListener("keydown", function (event) {
    var key = event.key.toLowerCase();

    if ("wasd".indexOf(key) >= 0) {
      switch (key) {
        case "a":
          console.log("Move left");
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
          // console.log(document.getElementById(`${newLocation}`))
          // console.log(document.getElementById(`${newLocation}`).getAttribute("data-is-wall"))
          document.getElementById(`${newLocation}`).appendChild(iconImage);
          break;
      }
    }
  });
}

// function numberToStringID(numberID) {
//   //Returns string id
//   var split = numberID.split(" ", 2);
//   var newId = "";
//   if (split[0] < 10) {
//     //Col
//     newId = newId.concat("0" + split[0]);
//   } else {
//     newId = newId.concat(split[0]);
//   }
//   newId = newId.concat(" ");
//   if (split[1] < 0) {
//     //Row
//     newId = newId.concat("-" + "0" + Math.abs(split[1]));
//   } else if (split[1] < 10) {
//     newId = newId.concat("0" + split[1]);
//   } else {
//     newId = newId.concat(split[1]);
//   }
//   return newId;
// }

// console.log(blocks)
// for (var i = 0; i < 19; i++) {
//   var blockData = blocks[i].getAttribute("data-is-wall");
//   console.log(blockData);
// }

// function startPlacement(){
// for(var i = 0; i < 2; i++){
//   for(var j = 0; j <= i; j++){
//     console.log(numberToStringID(i + " " + j));
//     console.log(numberToStringID(j + " " + i));
//   }
// }
// }

// startPlacement();
moveUp();
moveDown();
moveLeft();
moveRight();
