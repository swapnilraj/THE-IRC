'use strict';

(() => {
    /**
     * @type {HTMLInputElement}
     */
    const messageBox = document.getElementById('messageBox');
    const nicknameBox = document.getElementById('nicknameBox');
    const chatbox = document.getElementById('chatbox');
    const languageBox = document.getElementById('languageBox');
    
    let toLanguage;
    let nickname;

    const socket = io.connect('/');

    const getText = () => {
        return messageBox.value;
    }

    const getnickname = () => {
        return nicknameBox.value;
    }

    const getLanguage = () => {
        return languageBox.value;
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

    const setStyle = (data) => {
        let elem = document.createElement('p');
        let name = document.createElement('span');
        name.innerHTML = data.nickname + ': ';
        elem.innerText = data.message;
        elem.insertBefore(name,elem.firstChild);
        chatbox.appendChild(elem);
    }

    socket.on('message_received', (data) => {
        let url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl='+toLanguage+'&dt=t&q='+ data.message;

        fetch(url)
        .then(function(response){
            response.json()
            .then(function(resp){
                let temp = {'message':resp[0][0][0], 'nickname': data.nickname};
                setStyle(temp);
            });
        });
        console.log('Received message from:' + data.nickname);
    });
    /**
     * @param {Event} event
     */
    const sendMessage = (event) => {  
        if(event.code === 'Enter') {
            let data = {'message' : getText(), 'nickname' : nickname};
            if (data.message != '') {
                messageBox.value = '';
                socket.emit("user_played", data);
            }
        }
    };

    /**
     * @param {Event} event
     */
    const sendNickname = (event) => {
        if(event.code === 'Enter') {
            nickname = getnickname();
            toLanguage = getLanguage();  
            hideElement(nicknameBox);
            hideElement(languageBox);
            showElement(messageBox);
        }    
    }

    messageBox.addEventListener('keydown', sendMessage);
    hideElement(messageBox);
    languageBox.addEventListener('keydown', sendNickname);
})();