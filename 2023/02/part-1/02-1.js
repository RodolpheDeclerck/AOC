const fs = require('fs');

// Nom du fichier
const fileName = '../games.txt';

// Lecture du contenu du fichier
const content = fs.readFileSync(fileName, 'utf-8');

const splittedContent = content.split(/[\r\n]+/g);

console.log("content : \n" + splittedContent[0]);

const numberRegex = /\d+/g;

const colorRegex = /red|green|blue/g;

const maxRedDice = 12;

const maxGreenDice = 13;

const maxBlueDice = 14;

let result = 0

splittedContent.forEach(contentLine => {
    contentLineSplitted = contentLine.split(':');
    gameId = contentLineSplitted[0].match(numberRegex);
    console.log("game : " + gameId);
    gameResult = contentLineSplitted[1].split(/,|;/g);
    console.log("gameResult : " + gameResult);

    let colorMaxDice = [];
    colorMaxDice['red'] = maxRedDice;
    colorMaxDice['green'] = maxGreenDice;
    colorMaxDice['blue'] = maxBlueDice;

    let valideGame = true;

    gameResult.forEach(gameResultLine => {
        let number = gameResultLine.match(numberRegex);
        console.log("number : " + number);
        let color = gameResultLine.match(colorRegex);
        console.log("colorMaxDice[color] : " + colorMaxDice[color]);
        if (colorMaxDice[color] < number) {
            valideGame = false;
        }
    });

    if(valideGame === true) {
        console.log("Key had to result : " + gameId);
        result += parseInt(gameId);
    }

});

console.log("result : " + result);


