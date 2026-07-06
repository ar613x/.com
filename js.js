
// changelog dynamic date
for (const el of document.querySelectorAll(".date")) {
    const date = new Date(el.dataset.date);
    const now = new Date();

    const days = Math.floor(
        (now - date) / (1000 * 60 * 60 * 24)
    );

    el.textContent += ` (${days} day${days !== 1 ? "s" : ""} ago)`;
}

// ========================================================

// modal 
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// ========================================================

// splash text
const splashEl = document.getElementById("splash");

const splashes = ["Now low calorie!", "Two more than one!", "Buy a watch!", "Now in 3D!", "Now with more bugs and less features!", "Watch out for Mr. Dunkin!"];

function setSplash() {
  splashEl.textContent =
    splashes[Math.floor(Math.random() * splashes.length)];
}

setSplash();