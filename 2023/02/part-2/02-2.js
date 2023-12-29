const fs = require('fs');

// Nom du fichier
const fileName = '../games.txt';

// Lecture du contenu du fichier
const content = fs.readFileSync(fileName, 'utf-8');

const splittedContent = content.split(/[\r\n]+/g);
const numberRegex = /\d+/g;

const colorRegex = /red|green|blue/g;

let result = 0;

splittedContent.forEach(contentLine => {
    contentLineSplitted = contentLine.split(':');
    gameId = contentLineSplitted[0].match(numberRegex);
    gameResult = contentLineSplitted[1].split(/,|;/g);

    let colorSum = [];
    colorSum['red'] = 0;
    colorSum['green'] = 0;
    colorSum['blue'] = 0;


    gameResult.forEach(gameResultLine => {
        let number = parseInt(gameResultLine.match(numberRegex));
        let color = gameResultLine.match(colorRegex);


        if(parseInt(colorSum[color]) == 0 || parseInt(colorSum[color]) < parseInt(number)) {

            colorSum[color] = number;
        }
    });

    result += parseInt(colorSum['red']) * parseInt(colorSum['green']) * parseInt(colorSum['blue']);
});


console.log("result : " + result);


