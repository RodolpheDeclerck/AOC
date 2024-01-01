const fs = require('fs');

// Nom du fichier
const fileName = '../cards.txt';

// Lecture du contenu du fichier
const content = fs.readFileSync(fileName, 'utf-8');

const splittedContent = content.split(/[\r\n]+/g);

let result = 0;


splittedContent.forEach(cardLine => {
    let splittedCardLine = cardLine.split(':');
    let cardName = splittedCardLine[0];
    let cardValue = splittedCardLine[1].trim().split('|');
    let cardWiningNumber = cardValue[0].trim().split(/\s+/,);
    let cardNumber = cardValue[1].trim().split(/\s+/,);

    let winningNumber = [];

    let cardResult = 0;

    cardNumber.forEach(number => {
        if(cardWiningNumber.includes(number)){
            winningNumber.push(number);           
        }
    });
    
    if(winningNumber.length > 0){
        cardResult = 1;
    }

    for(let i = 1; i < winningNumber.length; i++)
    {
        cardResult = cardResult * 2;
    }

    result = result + cardResult;

});

console.log(result);