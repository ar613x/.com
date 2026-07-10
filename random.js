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