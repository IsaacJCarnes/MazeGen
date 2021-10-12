console.log("hello world");

// var testKeys = document.getElementById("testkeys")

// testKeys.addEventListener('keydown', function(event) {
//   console.log(event)
//   var key = event.key.toLowerCase();

//   if ("wasd".indexOf(key) >= 0) {
//     switch (key) {
//       case "w":
//         console.log("Move up");
//         break;
//     }
//   }
// });

// testKeys.addEventListener('keydown', function(event) {
//   var key = event.key.toLowerCase();

//   if ("wasd".indexOf(key) >= 0) {
//     switch (key) {
//       case "s":
//         console.log("Move down");
//         break;
//     }
//   }
// });

// testKeys.addEventListener('keydown', function(event) {
//   var key = event.key.toLowerCase();

//   if ("wasd".indexOf(key) >= 0) {
//     switch (key) {
//       case "a":
//         console.log("Move left");
//         break;
//     }
//   }
// });

// testKeys.addEventListener('keydown', function(event) {
//   var key = event.key.toLowerCase();

//   if ("wasd".indexOf(key) >= 0) {
//     switch (key) {
//       case "d":
//         console.log("Move right");
//         break;
//     }
//   }
// });

function displayCharacter() {
  var characterUrl = "https://acnhapi.com/v1/villagers";

  fetch(characterUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      // console.log(data.bea02.icon_uri);
      bearIcon = data.bea02.icon_uri;
      createBearIcon(bearIcon)
    });
}
displayCharacter();

var startPoint = document.getElementById("00 00");

function createBearIcon(bearIcon) {
var iconImage = document.createElement("img");
iconImage.setAttribute("src", bearIcon);
iconImage.setAttribute("alt", "bear icon");
iconImage.setAttribute("id", "userIcon");
iconImage.setAttribute("class", "bear-icon");
startPoint.appendChild(iconImage);
}


function numberToStringID(numberID){ //Returns string id
  var split = numberID.split(' ', 2);
  var newId = '';
  if(split[0] < 10){ //Col
      newId = newId.concat('0' + split[0]);
  } else{
      newId = newId.concat(split[0]);
  }
  newId = newId.concat(' ');
  if(split[1] < 0){ //Row
      newId = newId.concat('-' + '0' + Math.abs(split[1]));
  } else if(split[1] < 10){
      newId = newId.concat('0' + split[1]);
  } else{
      newId = newId.concat(split[1]);
  }
  return newId;
}

// function startPlacement(){
// for(var i = 0; i < 5; i++){
//   for(var j = 0; j <= i; j++){
//     console.log(numberToStringID(i + " " + j));
//     console.log(numberToStringID(j + " " + i));
//     // if(document.getElementById("").data-wall == false){
//     //   something.appendChild(iconImage)
//     // }
//   }
// }
// }

var blocks = document.querySelectorAll("div");
console.log(blocks)
for (var i = 0; i < 19; i++) {
var blockData = blocks[i].getAttribute("data-is-wall")
console.log(blockData)
}