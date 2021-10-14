var modal = document.getElementById("myModal");
var btn = document.getElementById("modal-button");
var span = document.getElementsByClassName("close")[0];
var maze = document.getElementsByClassName("image")

// When the user clicks the button, open the modal 
btn.addEventListener("click", function () {
  modal.style.display = "block";
})

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", function () {
  modal.style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
})

var startBtn = document.querySelector("#start-button");
const playContainer = document.getElementById("playContainer");

startBtn.addEventListener("click", function () {
    console.log("start");
    document.location = "mazePage.html"
    const playContainer = ["#playContainer"]
})

// var giphyURL = "api.giphy.com/v1/gifs/Y7ydLBRXvMZyDQOIVNwjMcWyI3mJmThc/{ecf05e476vqxvb7rpq4mkbel0b2nu5s97gyf9z2o0ueki1g4}"
// fetch(giphyURL)
// .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data)
//   })

// var giphyURL = "api.giphy.com/v1/gifs/search?q=green+maze&api_key=Y7ydLBRXvMZyDQOIVNwjMcWyI3mJmThc"
// fetch(giphyURL)
// .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data)
//   })

  //api.giphy.com/v1/gifs/search?q=green+maze&api_key=Y7ydLBRXvMZyDQOIVNwjMcWyI3mJmThc
  // http:api.giphy.com/v1/gifs/search?q=green+maze&api_key=Y7ydLBRXvMZyDQOIVNwjMcWyI3mJmThc

 

var giphyURL = "http://api.giphy.com/v1/gifs/search?q=green+maze&api_key=Y7ydLBRXvMZyDQOIVNwjMcWyI3mJmThc"
fetch(giphyURL)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data.data[1].images.original.url)
  })

