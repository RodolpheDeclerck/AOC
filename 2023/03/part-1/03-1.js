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
    // Define a regular expression for any non-alphanumeric character
    const symbolRegex = /[^a-zA-Z0-9]/;
  
    // Test if the character matches the regular expression
    return symbolRegex.test(char) && char !== '.';
}

const fs = require('fs');

// Nom du fichier
const fileName = '../engine-schematic.txt';

// Lecture du contenu du fichier
const content = fs.readFileSync(fileName, 'utf-8');

const splittedContent = content.split(/[\r\n]+/g);

let numberPosition = [];

let lineCount = 0;

const symbol = ['*','#','+','$','&','-','@','!','%','^','(',')','[',']','{','}'];

let symbolPosition = new Map();

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
                if(!symbolPosition.has(lineCount)){
                    symbolPosition.set(lineCount, []);
                }
                symbolPosition.get(lineCount).push(i);
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

numberPosition.forEach(numberInformation => {
    console.log(numberInformation);

    let valid = false;

    symbolPosition.forEach((value, key) => {
        if(key === numberInformation.lineId || key === numberInformation.lineId - 1 || key === numberInformation.lineId + 1){
            for(let i = numberInformation.startId - 1; i <= numberInformation.endId  + 1; i++){
                if(value.includes(i))
                {
                    valid = true;
                    break; 
                }
            }

            if(valid == true)
            {
                return;
            }
        }
    });

    if(valid)
    {
        console.log("-----------ADD NUMBER : " + numberInformation.number);
        result = result + parseInt(numberInformation.number);
    }
  });

  console.log(result);