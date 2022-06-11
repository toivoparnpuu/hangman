const selectors = {
    resetButton: '.js-reset-btn',
    rollD20: '.js-d20-btn',
    rollD90: '.js-d90-btn',
    charButton: '.js-char-btn',
    input: '.js-char-input',
    wordOutput: '.js-word',
    writeout: '.js-list'
}
const wordlist = ['kalamees', 'kartul', 'keevitaja', 'ventilaator', 'arvutimäng', 'ristsõna', 'aabits', 'karburaator', 'juhtplokk', 'raudbetoon', 'ilmajaam', 'kanala'];
let = orgWord = [];
let = word = [];
let = d20result = 0;
let = dxresult = 0;
const resetButton = document.querySelector(selectors.resetButton);
const charButton = document.querySelector(selectors.charButton);
const rollD20 = document.querySelector(selectors.rollD20);
const rollD90 = document.querySelector(selectors.rollD90);
const input = document.querySelector(selectors.input);
const writeout = document.querySelector(selectors.writeout);
const wordOutput = document.querySelector(selectors.wordOutput);

//event listeners
resetButton.addEventListener("click", function () {
    resetInputAndLog();
});

rollD20.addEventListener("click", function () {
    clickOnRollDice(20);
    rollD20.disabled = true;
});

rollD90.addEventListener("click", function () {
    clickOnRollDice(10);
    rollD90.disabled = true;
    prepWord();
});

window.addEventListener("load", function () {
    choosWord();
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
function choosWord(){
    orgWord = wordlist[Math.floor(Math.random() * wordlist.length)].split('');
    displayResults('debug: arvatav sõna: ' + orgWord.join(''));

}
function prepWord(){
    let openSymbols = Math.floor(orgWord.length * ((dxresult /100) / 2));
    displayResults('avatavad sümbolid on ' + openSymbols);
    orgWord.forEach(element => {
        if (openSymbols > 0 && Boolean(Math.round(Math.random()))) {
            openSymbols = openSymbols -1;
            word.push(element);
        } else {
            word.push('_');
            console.log('loeme sõnu');    
        }   
    });

    displayWord();
}
function resetInputAndLog() {
    input.value = "";
    while (writeout.firstChild) {
        writeout.removeChild(writeout.firstChild);
    }
}

function displayResults(textRow) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(textRow));
    writeout.appendChild(li);
}

function displayWord(){
    wordOutput.innerHTML = word.join('');
}
