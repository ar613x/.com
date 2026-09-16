var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var continuebtn = document.getElementById("continuebutton");

span.onclick = function() {
    modal.style.display = "none";
}

continuebtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
