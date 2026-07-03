// variable setup


// changelog dynamic date
for (const el of document.querySelectorAll(".date")) {
    const date = new Date(el.dataset.date);
    const now = new Date();

    const days = Math.floor(
        (now - date) / (1000 * 60 * 60 * 24)
    );

    el.textContent += ` (${days} day${days !== 1 ? "s" : ""} ago)`;
}

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