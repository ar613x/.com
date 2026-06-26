// This page has been created and modified soley by Snehanshu Srijan Dasgupta, NOT Ali Raja.
// Any use of this code by anyone other than Snehanshu Srijan Dasgupta, especially Ali Raja is without permission and is possibly maybe not not a violation of copyright law.
function validateSignUp() {
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let confirm = document.getElementById('confirm');
    let changed_password = password.value.replace(/[^A-Za-z]/, "");
    let error = document.getElementById('error');
    if (username.value === '' || password.value === '' || confirm.value === '') {
        error.innerText = 'NO BLANKS';
        return false;
    } else if (password.value != confirm.value) {
        error.innerText = 'PASSWORD NO MATCH';
        return false;
    } else if (password.value.length<6) {
        error.innerText = 'PASSWORD BE LONG';
        return false;
    } else if (password.value === changed_password) {
        error.innerText = 'PASSWORD NUMBER HAS NO';
        return false;
    } else if (!document.getElementById('termsandconditions').checked) {
        error.innerHTML = '<b>ACCEPT.</b>';
        return false;
    } else {
        document.removeChild(document.getElementById('modal'));
        return true;
    }
}
async function signUpModal() {
    let modal = document.createElement('div');
    modal.id = 'modal';
    modal.style.color = 'black';
    modal.innerHTML = `<div id="background" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4); display: flex; justify-content: center; align-items: center;">
        <div style="background-color: white; padding: 20px; border-radius: 5px; width: 320px;" id="Modal">
            <span style="float: right; cursor: pointer; font-size:24px; color: black;" id="modalClose">&times;</span>
                    <form id="signUp" onsubmit='return validateSignUp()' action="https://www.w3schools.com/action_page.php">
            <br><br>
            <fieldset>
                <label for="username" style="color: black;">Username:</label><br>
                <input type="text" id="username" name="username"><br><br>
                <label for="password" style="color: black;">Password:</label><br>
                <input type="password" id="password" name="password"><br><br>
                <label for="confirm" style="color: black;">Confirm:</label><br>
                <input type="password" id="confirm" name="confirm"><br><br>
                <input type="checkbox" id="termsandconditions" name="termsandconditions"><label for='termsandconditions' style="color: black;">Accept the <a href='t&c.html' style="color: black;">Terms and Conditions</a></label>
            </fieldset><br><br>
            <input type="submit" value="Submit" class="button" id="submit"><br><br>
            <span id='error' style="color: red; font-family: Verdana, sans-serif;"></span>
        </form>
        </div></div>`;
    document.body.appendChild(modal);
    // document.getElementById('background').onclick = function () {
    //     document.body.removeChild(modal);
    // }
    document.getElementById('modalClose').onclick = function () {
        document.body.removeChild(modal);
    }
}
async function promptModal(prompt, type="text") {
    let modal = document.createElement("div");
    modal.innerHTML = `
    <div id="background" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4); display: flex; justify-content: center; align-items: center;">
        <div style="background-color: white; padding: 20px; border-radius: 5px; width: 320px;">
            <span style="float: right; cursor: pointer; font-size:24px;" id="modalClose">&times;</span>
            <label for="modalInput">${prompt}</label>
            <input type="${type}" id="modalInput" style="width: 90%; margin: 10px;"/>
            <button id="modalSubmit" style="margin-top: 10px;">Submit</button>
        </div>
    </div>
    `;
    document.body.appendChild(modal);
    document.getElementById("modalClose").onclick = function () {
        document.body.removeChild(modal);
    };
    // document.getElementById("background").onclick = function (event) {
    //     if (event.target.id === "background") {
    //         document.body.removeChild(modal);
    //     }
    // };
    document.getElementById("modalInput").focus();
    try {
        return await new Promise((resolve) => {

            document.getElementById("modalSubmit").onclick = function () {
                let input = document.getElementById("modalInput").value;
                document.body.removeChild(modal);
                resolve(input);
            };
        });
    } finally {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    }
}
async function selectModal(prompt, options) {
    let modal = document.createElement("div");
    let optionsHtml = options.map(option => `<option value="${option}">${option}</option>`).join("");
    modal.innerHTML = `
    <div id="background"style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4); display: flex; justify-content: center; align-items: center;">
        <div style="background-color: white; padding: 20px; border-radius: 5px; width: 320px;">
            <span style="float: right; cursor: pointer; font-size:24px;" id="modalClose">&times;</span>
            <label for="modalSelect">${prompt}</label>
            <select id="modalSelect" style="width: 90%; margin: 10px;">
                ${optionsHtml}
            </select>
            <button id="modalSubmit" style="margin-top: 10px;">Submit</button>
        </div>
    </div>
    `;
    document.body.appendChild(modal);
    document.getElementById("modalClose").onclick = function () {
        document.body.removeChild(modal);
    };
    // document.getElementById("background").onclick = function (event) {
    //     if (event.target.id === "background") {
    //         document.body.removeChild(modal);
    //     }
    // };
    document.getElementById("modalSelect").focus();
    try {
        return await new Promise((resolve) => {

            document.getElementById("modalSubmit").onclick = function () {
                let input = document.getElementById("modalSelect").value;
                document.body.removeChild(modal);
                resolve(input);
            };
        });
    } finally {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    }
}
async function multipleSelectModal(prompt, options, type="checkbox") {
    let modal = document.createElement("div");
    let optionsHtml = options.map(option => `<input type="${type}" name="modalOptions" value="${option}"/><label>${option}</label><br>`).join("");
    modal.innerHTML = `
    <div id="background" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4); display: flex; justify-content: center; align-items: center;">
        <div style="background-color: white; padding: 20px; border-radius: 5px; width: 320px;">
            <span style="float: right; cursor: pointer; font-size:24px;" id="modalClose">&times;</span>
            <label>${prompt}</label><br>
            ${optionsHtml}
            <button id="modalSubmit" style="margin-top: 10px;">Submit</button>
        </div>
    </div>
    `;
    document.body.appendChild(modal);
    document.getElementById("modalClose").onclick = function () {
        document.body.removeChild(modal);
    };
    // document.getElementById("background").onclick = function (event) {
    //     if (event.target.id === "background") {
    //         document.body.removeChild(modal);
    //     }
    // };
    let firstOption = document.getElementsByName("modalOptions")[0];
    if (firstOption) {
        firstOption.focus();
    }
    try {
        return await new Promise((resolve) => {

            document.getElementById("modalSubmit").onclick = function () {
                let selectedOptions = Array.from(document.getElementsByName("modalOptions"))
                    .filter(input => input.checked)
                    .map(input => input.value);
                document.body.removeChild(modal);
                resolve(selectedOptions);
            };
        });
    } finally {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    }
}
async function confirmModal(message) {
    let modal = document.createElement("div");
    modal.innerHTML = `
    <div id="background" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4); display: flex; justify-content: center; align-items: center;">
        <div style="background-color: white; padding: 20px; border-radius: 5px; width: 320px;">
            <span style="float: right; cursor: pointer; font-size:24px;" id="modalClose">&times;</span>
            <p>${message}</p>
            <button id="modalYes" style="margin-top: 10px; margin-right: 10px;">Yes</button>
            <button id="modalNo" style="margin-top: 10px;">No</button>
        </div>
    </div>
    `;
    document.body.appendChild(modal);   
    document.getElementById("modalClose").onclick = function () {
        document.body.removeChild(modal);
    };
    // document.getElementById("background").onclick = function (event) {
    //     if (event.target.id === "background") {
    //         document.body.removeChild(modal);
    //     }
    // };
    document.getElementById("modalYes").focus();
    try {
        return await new Promise((resolve) => {

            document.getElementById("modalYes").onclick = function () {
                document.body.removeChild(modal);
                resolve(true);
            };
            document.getElementById("modalNo").onclick = function () {
                document.body.removeChild(modal);
                resolve(false);
            };
        });
    } finally {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    }
}
async function infoModal(message) {
    let modal = document.createElement("div");
    modal.innerHTML = `
    <div id="background" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4); display: flex; justify-content: center; align-items: center;">
        <div style="background-color: white; padding: 20px; border-radius: 5px; width: 320px;">
            <span style="float: right; cursor: pointer; font-size:24px;" id="modalClose">&times;</span>
            <p>${message}</p>
            <button id="modalOk" style="margin-top: 10px;">OK</button>
        </div>
    </div>
    `;
    document.body.appendChild(modal);
    document.getElementById("modalClose").onclick = function () {
        document.body.removeChild(modal);
    };
    // document.getElementById("background").onclick = function (event) {
    //     if (event.target.id === "background") {
    //         document.body.removeChild(modal);
    //     }
    // };
    document.getElementById("modalOk").focus();
    try {
        return await new Promise((resolve) => {

            document.getElementById("modalOk").onclick = function () {
                document.body.removeChild(modal);
                resolve();
            };
        });
    } finally {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    }
}
async function startLoading() {
    return new Promise((resolve) => {
        let elem = document.getElementById("myBar");
        let width = 0;
        elem.style.width = "0%";
        elem.textContent = "0%";

        let id = setInterval(() => {
            if (width >= 100) {
                clearInterval(id);
                resolve();
            } else {
                width++;
                elem.style.width = width + "%";
                elem.textContent = width + "%";
            }
        }, 1); // update every 50ms
    });
}
function updateProgress(value) {
    if (value<0) {
        value = 0;
    }
    if (value>100) {
        value = 100;
    }
    let elem = document.getElementById("myBar");
    elem.style.width = value + "%";
    elem.textContent = value + "%";
}
async function load() {
    document.getElementById('body').style.display = 'none';
    let loading = document.createElement('div');
    loading.innerHTML = `<h1 style='text-align: center;'>Loading</h1><div class="progress-container" style="display: inline-block; margin: 20% 25% 0 25%;">
    <div class="progress-bar" id="myBar">0%</div>
    </div>`;
    document.body.appendChild(loading);
    setTimeout(async function() {
        await startLoading();
        document.body.removeChild(loading);
        document.getElementById('body').style.display = 'initial';
    }, 200);
}
load();
function toggle(num) {
    let text = document.getElementsByClassName(`text ${num}`)[0];
    let header = document.getElementById(`header${num}`);
    let span = document.getElementsByClassName(`toggle ${num}`)[0];
    if (text.style.display === 'none' || text.style.display === '') {
        span.innerHTML = '&minus;';
        text.style.display = 'block';
        header.style.width = "100%";
    } else {
        span.textContent = '+';
        text.style.display = 'none';
        header.style.width = "100%";
    }
    header.classList.toggle('active');
}
function getPage() {
    let active = document.getElementsByClassName('active')[0];
    if (active) {
        if (active.getAttribute('href')) {
            return active.getAttribute('href');
        } else {
            return active.getAttribute('onclick').replace("window.location.href='", '').replace("'", '');
        }
    } else {
        return 'title.html';
    }
}
const pages = ['title.html', 'products.html', 'contact.html', 'about.html', 'cart.html', 'faq.html', 'locat.html'];
function getIndex() {
    let page = getPage();
    let index = pages.findIndex(function (testNew) {
        return page === testNew;
    });
    return index;
}
function left() {
    let index = getIndex();
    window.open(pages.at(index-1), '_self');
}
function right() {
    let index = getIndex();
    window.open(pages.at((index+1) % pages.length), '_self');
}
document.addEventListener('keydown', function (event) {
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName != 'INPUT' && activeElement.tagName != 'TEXTAREA' && activeElement.tagName != 'SELECT')) {
        if (event.key === 'ArrowLeft' || event.code === 'ArrowLeft') {
            event.preventDefault();
            if (confirm('Are you sure you want to leave this page?')) {
                left();
            }
        } else if (event.key === 'ArrowRight' || event.code === 'ArrowRight') {
            if (confirm('Are you sure you want to leave this page?')) {
                event.preventDefault();
                right();
            }
        }
    }
});