
// changelog dynamic date
for (const el of document.querySelectorAll(".date")) {
    const date = new Date(el.dataset.date);
    const now = new Date();

    const days = Math.floor(
        (now - date) / (1000 * 60 * 60 * 24)
    );

    if (days >= 365) {
        el.textContent += ` (${Math.round(days/365)} years ${Math.round((days%365)/30)} months ${days%30} day${days !== 1 ? "s" : ""} ago)`;
    }
    else if (days >= 30) {
        el.textContent += ` (${Math.round(days/30)} months ${days%30} day${days !== 1 ? "s" : ""} ago)`;
    }
    else {
        el.textContent += ` (${days} day${days !== 1 ? "s" : ""} ago)`;
    }
}

// ========================================================

// splash text;
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

if (splashEl) {
  function setSplash() {
    splashEl.textContent =
      splashes[Math.floor(Math.random() * splashes.length)];
  }
  setSplash();
}

setSplash();

// ========================================================

