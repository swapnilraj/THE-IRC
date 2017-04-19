'use strict';


(() => {
    const socket = io.connect('/');

    const messageReceivedHandler = (data) => {
        let url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl='+languages[toLanguage]+'&dt=t&q='+ data.message;
        fetch(url)
        .then(response => {
            response.json()
            .then(temp => {
                setStyle({message: parseResponse(temp), nickname: data.nickname});
            });
        });
        console.log('Received message from:' + data.nickname);
    };

    socket.on('message_received', messageReceivedHandler);
    /**
     * @param {Event} event
     */
    const sendMessage = (event) => {
        if(event.key === 'Enter') {
            let data = {'message' : getValue(messageBox), 'nickname' : nickname};
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
        if(event.key === 'Enter') {
            nickname = getValue(nicknameBox);
            toLanguage = getValue(languageBox);
            hideElement(nicknameBox);
            hideElement(languageBox);
            showElement(messageBox);
            nickDisplay.innerText = nickname;
            showElement(nickDisplay);
        }
    };

    messageBox.addEventListener('keydown', sendMessage);
    hideElement(messageBox);
    hideElement(nickDisplay);
    languageBox.addEventListener('keydown', sendNickname);
})();