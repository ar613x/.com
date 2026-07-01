let a1open = true;
let b2open = false;
let c3open = false;

let modal1 = document.getElementById("modal1");
let modal2 = document.getElementById("modal2");
let modal3 = document.getElementById("modal3");

function update() {
    if (a1open == false) {
        modal1.style.display = "none";
    } else {
        modal1.style.display = "block";
    }

    if (b2open == false) {
        modal2.style.display = "none";
    } else {
        modal2.style.display = "block";
    }

    if (c3open == false) {
        modal3.style.display = "none";
    } else {
        modal3.style.display = "block";
    }
}

update();

let open1 = document.querySelectorAll(".open1");
let open2 = document.querySelectorAll(".open2");
let open3 = document.querySelectorAll(".open3");

open1.forEach(btn => {
    btn.addEventListener('click', () => {
        a1open = true;
        b2open = false;
        c3open = false;
        update();
    });
});

open2.forEach(btn => {
    btn.addEventListener('click', () => {
        a1open = false;
        b2open = true;
        c3open = false;
        update();
    });
});

open3.forEach(btn => {
    btn.addEventListener('click', () => {
        a1open = false;
        b2open = false;
        c3open = true;
        update();
    });
});
