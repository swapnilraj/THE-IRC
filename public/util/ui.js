/**
* @type {HTMLInputElement}
*/
const messageBox = document.getElementById('messageBox');
const nicknameBox = document.getElementById('nicknameBox');
const chatbox = document.getElementById('messageDisplay');
const languageBox = document.getElementById('languageBox');
const nickDisplay = document.getElementById('nickDisplay');

let toLanguage;
let nickname;

/**
* @param {HTMLElement} elem
*/
const getValue = (elem) => {
    return elem.value;
};
/**
* @param {HTMLElement} elem
*/
const hideElement = (elem) => {
    elem.style.display = 'none';
};

/**
* @param {HTMLElement} elem
 */
const showElement = (elem) => {
    elem.style.display = '';
};

const setStyle = (data) => {
    let elem = document.createElement('p');
    let name = document.createElement('span');
    name.innerHTML = data.nickname + ': ';
    elem.innerText = data.message;
    elem.insertBefore(name,elem.firstChild);
    chatbox.appendChild(elem);
    if(data.nickname != nickname) {
        notify(temp);
    }
};