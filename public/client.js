'use strict';


(() => {

    const languages =   {
afar:'aa',
abkhazian:'ab',
avestan:'ae',
afrikaans:'af',
akan:'ak',
amharic:'am',
aragonese:'an',
arabic:'ar',
assamese:'as',
avaric:'av',
aymara:'ay',
azerbaijani:'az',
bashkir:'ba',
belarusian:'be',
bulgarian:'bg',
bislama:'bi',
bambara:'bm',
bengali:'bn',
tibetan:'bo',
breton:'br',
bosnian:'bs',
chechen:'ce',
chamorro:'ch',
corsican:'co',
cree:'cr',
czech:'cs',
chuvash:'cv',
welsh:'cy',
danish:'da',
german:'de',
dzongkha:'dz',
ewe:'ee',
english:'en',
esperanto:'eo',
spanish:'es',
estonian:'et',
basque:'eu',
persian:'fa',
fulah:'ff',
finnish:'fi',
fijian:'fj',
faroese:'fo',
'french':'fr',
irish:'ga',
galician:'gl',
guarani:'gn',
gujarati:'gu',
manx:'gv',
hausa:'ha',
hebrew:'he',
hindi:'hi',
motu:'ho',
croatian:'hr',
hungarian:'hu',
armenian:'hy',
herero:'hz',
indonesian:'id',
igbo:'ig',
inupiaq:'ik',
ido:'io',
icelandic:'is',
italian:'it',
inuktitut:'iu',
japanese:'ja',
javanese:'jv',
georgian:'ka',
kongo:'kg',
kazakh:'kk',
kannada:'kn',
korean:'ko',
kanuri:'kr',
kashmiri:'ks',
kurdish:'ku',
komi:'kv',
cornish:'kw',
latin:'la',
ganda:'lg',
lingala:'ln',
lao:'lo',
lithuanian:'lt',
latvian:'lv',
malagasy:'mg',
marshallese:'mh',
maori:'mi',
macedonian:'mk',
malayalam:'ml',
mongolian:'mn',
marathi:'mr',
malay:'ms',
maltese:'mt',
burmese:'my',
nauru:'na',
nepali:'ne',
ndonga:'ng',
dutch:'nl',
norwegian:'no',
ojibwa:'oj',
oromo:'om',
oriya:'or',
pali:'pi',
polish:'pl',
portuguese:'pt',
quechua:'qu',
romansh:'rm',
romanian:'ro',
rundi:'rn',
russian:'ru',
kinyarwanda:'rw',
sanskrit:'sa',
sardinian:'sc',
sindhi:'sd',
sami:'se',
sango:'sg',
slovak:'sk',
slovenian:'sl',
samoan:'sm',
shona:'sn',
somali:'so',
albanian:'sq',
serbian:'sr',
swati:'ss',
sundanese:'su',
swedish:'sv',
swahili:'sw',
tamil:'ta',
telugu:'te',
tajik:'tg',
thai:'th',
tigrinya:'ti',
turkmen:'tk',
tagalog:'tl',
tswana:'tn',
turkish:'tr',
tsonga:'ts',
tatar:'tt',
twi:'tw',
tahitian:'ty',
ukrainian:'uk',
urdu:'ur',
uzbek:'uz',
venda:'ve',
vietnamese:'vi',
volapk:'vo',
walloon:'wa',
wolof:'wo',
xhosa:'xh',
yiddish:'yi',
yoruba:'yo',
chinese:'zh',
zulu:'zu',
}

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

    const socket = io.connect('/');
    /**
     * @param {HTMLElement} elem 
     */
    const getValue = (elem) => {
        return elem.value;
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

    const notify = (data) => {
        if(!('Notification' in window)) {
            alert('Notifications not supported.');
        } else if(Notification.permission === 'granted') {
            let notification = new Notification(data.nickname + ": " + data.message);
        } else if(Notification.permission !== 'denied') {
            Notification.requestPermission((permission) => {
                if(permission === 'granted') {
                    let notification = new Notification(data.nickname + ": " + data.message);
                }
            });
        }
    }

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
    }

    socket.on('message_received', (data) => {
        let url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl='+languages[toLanguage]+'&dt=t&q='+ data.message;

        fetch(url)
        .then(response => {
            response.json()
            .then(temp => {
                setStyle({message: temp[0][0][0], nickname: data.nickname});
            });
        });
        console.log('Received message from:' + data.nickname);
    });
    /**
     * @param {Event} event
     */
    const sendMessage = (event) => {  
        if(event.key === 'Enter') {
            let data = {'message' : getValue(chatbox), 'nickname' : nickname};
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
    }

    messageBox.addEventListener('keydown', sendMessage);
    hideElement(messageBox);
    hideElement(nickDisplay);
    languageBox.addEventListener('keydown', sendNickname);
})();