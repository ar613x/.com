let number = 0;
let numberGain = 1;
let clickergainamt = 0;
let autoclickerunlocked = false;
let totalnumber = 0;

// load number
setInterval(() => {
    clickCount.textContent = `NUMBER: ${Math.round(number)}`;
    if (number >= 500 && !autoclickerunlocked) {
        autoclicker.style.display = 'block';
        feedback.innerHTML = `<span style="color: #ff00ffff; text-align: center;">Auto Clicker Unlocked!</span>`;
        setTimeout(() => { feedback.innerHTML = ''; }, 2000);
        feedbackdiv.style.border = "3px solid #ff00ff";
        setTimeout(() => { feedbackdiv.style.border = "3px solid white"; }, 2000);
        autoclickerunlocked = true;
}
}, 100);

const button = document.getElementById('theButton');
const clickCount = document.getElementById('clickCount');
const clickergain = document.getElementById('clickergain');
const feedback = document.getElementById('feedback');
const floatingnumber = document.getElementById('floatingnumber');
const feedbackdiv = document.getElementById('feedbackdiv');
const totalNumberDisplay = document.getElementById('totalnumber');

let clickergaincost = 50;
let costgain = 1.15;

let spaceHeld = false;

window.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !spaceHeld) {
        event.preventDefault(); // prevent default scrolling
        spaceHeld = true;
        number += numberGain;
        totalnumber += numberGain;
        clickCount.textContent = `NUMBER: ${Math.round(number)}`; 
        button.classList.add('buttonactive');
    }
});

window.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
        spaceHeld = false;
        button.classList.remove('buttonactive');
    }
});

button.addEventListener('click', () => {
    number += numberGain;
    totalNumber += numberGain;
    clickCount.textContent = `NUMBER: ${Math.round(number)}`;

});

clickergain.addEventListener('click', () => {
    if (number >= clickergaincost) {
        number -= clickergaincost;
        numberGain += 1;
        clickergainamt += 1;
    // round costs so displayed value matches the actual required amount
    clickergaincost = Math.round(clickergaincost * costgain);

        // ROUND EVERYWHERE DISPLAYED
        clickCount.textContent = `NUMBER: ${Math.round(number)}`;
        totalNumberDisplay.textContent = `Total NUMBER: ${Math.round(totalnumber)}`;
        clickergain.innerHTML = `Click Booster <br> ${Math.round(clickergaincost)} NUMBER <br> Current Amount: ${clickergainamt}`;

        feedback.innerHTML = '<span style="color: #00ff00; text-align: center;">+1 Click Booster</span>';
        setTimeout(() => { feedback.innerHTML = ''; }, 1000);
        feedbackdiv.style.border = "3px solid #00FF00";
        setTimeout(() => { feedbackdiv.style.border = "3px solid white"; }, 1000);
    } else {
        feedback.innerHTML = `<span style="color: #ff0000; text-align: center; font-size: 18px;">You need ${Math.round(clickergaincost - number)} more NUMBER</span>`;
        setTimeout(() => { feedback.innerHTML = ''; }, 1000);
        feedbackdiv.style.border = "3px solid #ff0000";
        setTimeout(() => { feedbackdiv.style.border = "3px solid white"; }, 1000);
    }
});

const autoclicker = document.getElementById('autoclicker');
let autoclickercost = 500;
let autoclickeramt = 0;
let autoclickergain = 1;

autoclicker.addEventListener('click', () => {
    if (number >= autoclickercost) {
        number -= autoclickercost;
        autoclickeramt += 1;
    // round costs so displayed value matches the actual required amount
    autoclickercost = Math.round(autoclickercost * (costgain - 0.1)); // a bit cheaper

        clickCount.textContent = `NUMBER: ${Math.round(number)}`;
        autoclicker.innerHTML = `Auto Clicker <br> ${Math.round(autoclickercost)} NUMBER <br> Current Amount: ${autoclickeramt}`;

        feedback.innerHTML = `<span style="color: #00ff00; text-align: center;">+1 Auto Clicker</span>`;
        setTimeout(() => { feedback.innerHTML = ''; }, 1000);
        feedbackdiv.style.border = "3px solid green";
        setTimeout(() => { feedbackdiv.style.border = "3px solid white"; }, 1000);
    } else {
        feedback.innerHTML = `<span style="color: #ff0000; text-align: center;">You need ${Math.round(autoclickercost - number)} more NUMBER</span>`;
        setTimeout(() => { feedback.innerHTML = ''; }, 1000);
        feedbackdiv.style.border = "3px solid red";
        setTimeout(() => { feedbackdiv.style.border = "3px solid white"; }, 1000);
        
    }
});

// BIG IMPORTANT LOOP
setInterval(() => {
            number += autoclickergain * autoclickeramt;
            totalNumber += autoclickergain * autoclickeramt;
            clickCount.textContent = `NUMBER: ${Math.round(number)}`;
        }, 1000);

    
// save game
function saveGame() {
    const saveData = {
        number: number,
        numberGain: numberGain,
        clickergainamt: clickergainamt,
        clickergaincost: clickergaincost,
        autoclickercost: autoclickercost,
        totalnumber: totalnumber,
        autoclickeramt: autoclickeramt
    };

    localStorage.setItem("numberGameSave", JSON.stringify(saveData));
    feedback.innerHTML = `<span style="color: #0000ff; text-align: center;">Game Saved</span>`;
    setTimeout(() => { feedback.innerHTML = ''; }, 1000);
    feedbackdiv.style.border = "3px solid #0000ff";
    setTimeout(() => { feedbackdiv.style.border = "3px solid white"; }, 1000);
}

loadGame();
function loadGame() {
    const savedData = JSON.parse(localStorage.getItem("numberGameSave"));
    if (savedData) {
        number = savedData.number || 0;
        numberGain = savedData.numberGain || 1;
        clickergainamt = savedData.clickergainamt || 0;
        clickergaincost = savedData.clickergaincost || 50;
        autoclickercost = savedData.autoclickercost || 500;
        autoclickeramt = savedData.autoclickeramt || 0;
        totalnumber = savedData.totalNumber || 0;

        clickCount.textContent = `NUMBER: ${Math.round(number)}`;
        totalNumberDisplay.textContent = `Total NUMBER: ${Math.round(totalnumber)}`;
        clickergain.innerHTML = `Click Booster <br> ${Math.round(clickergaincost)} NUMBER <br> Current Amount: ${clickergainamt}`;
        autoclicker.innerHTML = `Auto Clicker <br> ${Math.round(autoclickercost)} NUMBER <br> Current Amount: ${autoclickeramt}`;
    }
}

setInterval(() => {
    floatingnumber.innerHTML = clickCount.textContent;
}, 100);

//============================
// menu overlays 
//============================


let settingsOpen = false;
let statsOpen = false;
let mainOpen = true;

const settings = document.getElementById('settings');
const stats = document.getElementById('stats');
const maincontent = document.getElementById('gamemain');
const settingsmenu = document.getElementById('settingsmain');
const statsmenu = document.getElementById('statsmain');

function updateui() {
    if (settingsOpen == false) {
        settingsmain.style.display = "none";
    } else {
        settingsmain.style.display = "block";
    }

    if (mainOpen == false) {
        gamemain.style.display = "none";
    } else {
        gamemain.style.display = "block";
    }
    if (statsOpen == false) {
        statsmenu.style.display = "none";
    } else {
        statsmenu.style.display = "block";
    }
}
updateui();
settings.addEventListener('click', () => {
    settingsOpen = !settingsOpen;
    mainOpen = !mainOpen;
    updateui();
});

stats.addEventListener('click', () => {
    statsOpen = !statsOpen;
    mainOpen = !mainOpen;
    updateui();
});

let main = document.querySelectorAll(".main");

main.forEach(button => {
    button.addEventListener('click', () => {
        settingsOpen = false;
        statsOpen = false;
        mainOpen = true;
        updateui();
    });
});

// reset game
let resetbutton = document.getElementById('resetgame');
resetbutton.addEventListener('click', () => {
    localStorage.removeItem("numberGameSave");
    location.reload();
});