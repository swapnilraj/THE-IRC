'use strict';

(() => {
    /**
     * @type {HTMLInputElement}
     */
    const messageBox = document.getElementById('messageBox');
    const nicknameBox = document.getElementById('nicknameBox');

    let nickname;

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
        elem.style.display = 'none';
    }

    /**
     * @param {HTMLElement} elem 
     */
    const showElement = (elem) => {
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
            let data = {'message' : getText(), 'nickname' : nickname};
            messageBox.value = '';
            socket.emit("user_played", data);
        }
    };

    /**
     * @param {Event} event
     */
    const sendNickname = (event) => {
        if(event.code === 'Enter') {
            nickname = getnickname();    
            hideElement(nicknameBox);
            showElement(messageBox);
        }    
    }

    messageBox.addEventListener('keydown', sendMessage);
    hideElement(messageBox);
    nicknameBox.addEventListener('keydown', sendNickname);
})();