var modal = document.getElementById("myModal");
var btn = document.getElementById("modal-button");
 var span = document.getElementsByClassName("close")[0];
 var maze = document.getElementsByClassName("")
 var mainContainer = document.querySelector(".mainContainer")
 var giphyLink = document.querySelector("#giphy-link")
 // var giphyLink = document.querySelector("#giphy-link")

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
giphy();
function giphy(){
  var giphyURL = "http://api.giphy.com/v1/gifs/search?q=green+maze&api_key=Y7ydLBRXvMZyDQOIVNwjMcWyI3mJmThc"
  fetch(giphyURL)
  .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var gifImg = document.getElementById("mazeGif");
      var gifURL = data.data[1].images.original.url;
      gifImg.setAttribute("src", gifURL);
    })
}

// function giphy(){
//   console.log("Will show a giphy");
//   // empty container
//   mainContainer.innerHTML = "";
//   var giphyURL = "http://api.giphy.com/v1/gifs/search?q=green+maze&api_key=Y7ydLBRXvMZyDQOIVNwjMcWyI3mJmThc"
//   fetch(giphyURL)
//   .then(function (response) {
//       return response.json();
//      })
//      .then(function (data) {
//        console.log(data.data[1].images.original.url)
//        var giphyLink = document.createElement("a")
//        var giphyURL = document.createElement("img");
//        giphyURL.setAttribute("id", "giphy");
//        // giphyURL.setAttribute("src", "http://api.giphy.com/v1/gifs/search?q=green+maze&api_key=Y7ydLBRXvMZyDQOIVNwjMcWyI3mJmThc");
//        giphyURL.setAttribute("alt", "maze giphy");
//        giphyURL.setAttribute("src", data.data[1].images.original.url);
//        giphyLink.setAttribute("href", data.data[1].images.original.url);
//        mainContainer.appendChild(giphyLink)
//        giphyLink.appendChild(giphyURL);

//      })
// 