const selectors = {
    rollD20: '.js-d20-btn',
    rollD90: '.js-d90-btn',
    charButton: '.js-char-btn',
    input: '.js-char-input',
    wordOutput: '.js-word',
    livesOutput: '.js-lives',
    writeout: '.js-list'
}
const wordlist = ['kalamees',
    'kartul',
    'keevitaja',
    'ventilaator',
    'arvutimäng',
    'ristsõna',
    'aabits',
    'karburaator',
    'juhtplokk',
    'raudbetoon',
    'ilmajaam',
    'kanala'
];
let = orgWord = [];
let = word = ['_'];
let = d20result = 0;
let = dxresult = 0;
let = lives = 6;
const charButton = document.querySelector(selectors.charButton);
const rollD20 = document.querySelector(selectors.rollD20);
const rollD90 = document.querySelector(selectors.rollD90);
const input = document.querySelector(selectors.input);
const writeout = document.querySelector(selectors.writeout);
const wordOutput = document.querySelector(selectors.wordOutput);
const livesOutput = document.querySelector(selectors.livesOutput);

//event listeners
charButton.addEventListener("click", function () {
    checkChar(input.value[0].toLowerCase());
    displayLives();
    displayWord();
});
rollD20.addEventListener("click", function () {
    clickOnRollDice(20);
    rollD20.disabled = true;
    rollD90.disabled = false;
    if (d20result == 20) {
        lives = lives + 1;
    } else if (d20result == 1) {
        lives = 0;
    }
    displayLives();
});

rollD90.addEventListener("click", function () {
    clickOnRollDice(10);
    rollD90.disabled = true;
    charButton.disabled = false;
    prepWord();
    displayWord();
    displayLives();
});


window.addEventListener("load", function () {
    rollD20.disabled = false;
    rollD90.disabled = true;
    charButton.disabled = true;
    choosWord();
    displayLives();
    displayWord();
});

// functions
function clickOnRollDice(sides) {
    if (sides == 10) {
        dxresult = (Math.floor(Math.random() * sides)) * 10;
        displayResults(`D% tulemus: ${dxresult}`);
    } else {
        d20result = Math.floor(Math.random() * sides) + 1;
        displayResults(`D20 tulemus: ${d20result}`);
    }
}
function checkChar(userChar) {
    if (orgWord.indexOf(userChar) > -1) {
        orgWord.forEach((element, i) => {
            if (element == userChar) {
                word[i] = userChar;
            }
        }); // foreach
    } else {
        lives = lives - 1;
    }
}
function choosWord() {
    orgWord = wordlist[Math.floor(Math.random() * wordlist.length)].split('');
    //displayResults('debug: arvatav sõna: ' + orgWord.join(''));
}

function prepWord() {
    let openSymbols = Math.floor(orgWord.length * ((dxresult / 100) / 2));
    displayResults('avatavad sümbolid on ' + openSymbols);
    orgWord.forEach(element => {
        if (openSymbols > 0 && Boolean(Math.round(Math.random()))) {
            openSymbols = openSymbols - 1;
            word.push(element);
        } else {
            word.push('_');
            console.log('loeme sõnu');
        }
    });
}
function displayLives() {
    if (lives < 1) {
        rollD20.disabled = true;
        rollD90.disabled = true;
        charButton.disable = true;
        livesOutput.innerHTML = lives;
        window.alert('Mäng läbi!');

    } else {
        livesOutput.innerHTML = lives;
    }
    //check win
    if(word.indexOf('_') == -1){
        window.alert('Oled võitnud! uuesti mängimiseks tee refresh');
        charButton.disable = true;
    }

}

function displayResults(textRow) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(textRow));
    writeout.appendChild(li);
}

function displayWord() {
    console.log(word.join(''));
    wordOutput.innerHTML = word.join('');
}
