var modal = document.getElementById("myModal");
var btn = document.getElementById("modal-button");
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var startBtn = document.querySelector("#start-button");
const playContainer = document.getElementById("playContainer");

startBtn.addEventListener("click"), function () {
    console.log("start");
    const playContainer = ["#playContainer"]
}