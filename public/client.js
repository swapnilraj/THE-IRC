/**
 * @type {HTMLInputElement}
 */
const messageBox = document.getElementById('messageBox');
const nicknameBox = document.getElementById('nicknameBox');

const socket = io.connect('/');

const getText = () => {
    return messageBox.value;
}

const getnickname = () => {
    return nicknameBox.value;
}
/**
 * @param {HTMLElement} elem 
 */
const hideElement = (elem) => {
    console.log(elem);
    elem.style.display = 'none';
}

/**
 * @param {HTMLElement} elem 
 */
const showElement = (elem) => {
    console.log(elem);
    elem.style.display = '';
}

socket.on('message_received', (data) => {
    console.log(data);
});
/**
 * @param {Event} event
 */
const sendMessage = (event) => {  
    if(event.code === 'Enter') {
        socket.emit("user_played", getText());
    }
};

/**
 * @param {Event} event
 */
const sendNickname = (event) => {
    if(event.code === 'Enter') {
        socket.emit('send_nickname', getnickname());
         hideElement(nicknameBox);
         showElement(messageBox);
    }    
}

messageBox.addEventListener('keydown', sendMessage);
hideElement(messageBox);
nicknameBox.addEventListener('keydown', sendNickname);