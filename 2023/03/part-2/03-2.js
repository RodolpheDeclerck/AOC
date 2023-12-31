class NumberInformation {
    constructor(number, lineId, startId, endId) {
        this.number = number;
        this.lineId = lineId;
        this.startId = startId;
        this.endId = endId;
    }

    toString() {
      return `Number: ${this.number}, Line: ${this.lineId}, Start: ${this.startId}, End: ${this.end}`;
    }
}

function isDigit(char) {
    return !isNaN(parseInt(char)) && isFinite(char);
}

function isSymbol(char) {
    // Test if the character matches the regular expression
    return char === '*';
}

const fs = require('fs');

// Nom du fichier
const fileName = '../engine-schematic.txt';

// Lecture du contenu du fichier
const content = fs.readFileSync(fileName, 'utf-8');

const splittedContent = content.split(/[\r\n]+/g);

let numberPosition = [];

let lineCount = 0;

let symbolMap = new Map();

let result = 0;

splittedContent.forEach(contentLine => {
    lineCount ++;
    let number = '';
    let startId = null;
    let endId = 0;


    for(let i = 0; i < contentLine.length; i++) {
        if(isDigit(contentLine[i])) {
            number = number + contentLine[i];
            startId == null ? startId = i : null;

            if(i === contentLine.length - 1){
                endId = i - 1;
                numberPosition.push(new NumberInformation(number, lineCount, startId, endId));
                number = '';
                startId = null;
                endId = null;
            }
        }
        else
        {
            if(isSymbol(contentLine[i])){
                if(!symbolMap.has(lineCount)){
                    symbolMap.set(lineCount, []);
                }
                symbolMap.get(lineCount).push(i);
            }
            if(number != ''){
                endId = i - 1;
                numberPosition.push(new NumberInformation(number, lineCount, startId, endId));
                number = '';
                startId = null;
                endId = null;
            }
        }
    } 
});

symbolMap.forEach((symbolPosition, symboleLine) => {
    symbolPosition.forEach(position => {
        let numbers = [];

        numberPosition.forEach(numberInformation => {

            if(symboleLine === numberInformation.lineId || symboleLine - 1 === numberInformation.lineId || symboleLine + 1 === numberInformation.lineId)
            {
                for(let i = numberInformation.startId - 1; i <= numberInformation.endId  + 1; i++){
                    if(position === i)
                    {
                        numbers.push(numberInformation.number);
                    }
                }
            }
        });
    
        if(numbers.length === 2){
            //console.log("SYMBOLE LINE : " + symboleLine + " AJOUT : " + numbers[0] + " * " + numbers[1]);
            result += parseInt(numbers[0]) * parseInt(numbers[1]);
        }
    });
})

console.log("RESULT : " + result);

//console.log(numberPosition[numberPosition.length - 1]);