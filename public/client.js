/**
 * @type {HTMLInputElement}
 */
const messageBox = document.getElementById('client_message');


const socket = io.connect('/');

const getText = () => {
    return messageBox.value;
}

socket.on('message_received', (data) => {
    console.log(data + "HIEU");
});
/**
 * @param {Event} event
 */
const sendMessage = (event) => {  
    if(event.code === 'Enter') {
        const message = getText();
        socket.emit("user_played", message);
    }
};

['keydown'].forEach(event => messageBox.addEventListener(event, sendMessage));