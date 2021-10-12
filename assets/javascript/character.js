console.log("hello world");

var testKeys = document.getElementById("testkeys")

testKeys.addEventListener('keydown', function(event) {
  console.log(event)
  var key = event.key.toLowerCase();

  if ("wasd".indexOf(key) >= 0) {
    switch (key) {
      case "w":
        console.log("Move up");
        break;
    }
  }
});

testKeys.addEventListener('keydown', function(event) {
  var key = event.key.toLowerCase();

  if ("wasd".indexOf(key) >= 0) {
    switch (key) {
      case "s":
        console.log("Move down");
        break;
    }
  }
});

testKeys.addEventListener('keydown', function(event) {
  var key = event.key.toLowerCase();

  if ("wasd".indexOf(key) >= 0) {
    switch (key) {
      case "a":
        console.log("Move left");
        break;
    }
  }
});

testKeys.addEventListener('keydown', function(event) {
  var key = event.key.toLowerCase();

  if ("wasd".indexOf(key) >= 0) {
    switch (key) {
      case "d":
        console.log("Move right");
        break;
    }
  }
});

function displayCharacter() {
  var characterUrl = "https://acnhapi.com/v1/villagers";

  fetch(characterUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      console.log(data.bea02.icon_uri);
      bearIcon = data.bea02.icon_uri;
      $("#icon").attr("src", bearIcon);
    });
}
displayCharacter();

var startPoint = document.getElementById("00 00");

startPoint.textContent = "hi";

var iconImage = document.createElement("img");
iconImage.setAttribute("src", "https://acnhapi.com/v1/icons/villagers/10");
iconImage.setAttribute("alt", "bear icon");
iconImage.setAttribute("id", "userIcon");
startPoint.appendChild(iconImage);

// for(var i=0; i <)
console.log(playContainer)

