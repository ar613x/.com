
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

const splashes = ["Now low calorie!",
     "Two more than one!",
     "Buy a watch!",
     "Now in 3D!",
     "Now with more bugs and less features!",
     "Watch out for Mr. Dunkin!",
     "Brush your teeth!",
     "Sometimes funny!",
     "Too school for cool!",
     "Use the force!",
     "Quick, hide the body!",
     "Look who showed up!",
     "Chicken Change!",
     "Get an answer!",
     "Get a question!"
    ];

function setSplash() {
  splashEl.textContent =
    splashes[Math.floor(Math.random() * splashes.length)];
}

setSplash();

// ========================================================

// random page
const randombutton = document.getElementById("randombutton");
const pages = [
  "anur/home.html",
  "anur/novitulat.html",
  "atomclicker/factory.html",
  "atomclicker/main.html",
  "buttonclicker/index.html",
  "buttonclicker/modaltesting.html",
  "changelog.html",
  "connectgo/4player.html",
  "connectgo/index.html",
  "connectgo/rules.html",
  "connectgo/strategy.html",
  "detector.html",
  "index.html",
  "projects.html",
  "shegdnivishn.html",
  "wallpapers.html",
  "wobsite/about.html",
  "wobsite/cart.html",
  "wobsite/contact.html",
  "wobsite/faq.html",
  "wobsite/feedback.html",
  "wobsite/locat.html",
  "wobsite/placeholder.html",
  "wobsite/product1.html",
  "wobsite/product2.html",
  "wobsite/products.html",
  "wobsite/t&c.html",
  "wobsite/title.html"
];

function randomPage() {
    randombutton.href = pages[Math.floor(Math.random() * pages.length)];
}

randomPage();
