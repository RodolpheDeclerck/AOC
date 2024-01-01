class Card
{
    constructor(cardId, cardWinningNumber, numbers, winningNumber, result)
    {
        this.cardId = cardId;
        this.cardWinningNumber = cardWinningNumber;
        this.numbers = numbers;
        this.winningNumber = winningNumber;
        this.result = winningNumber.length;
    }
}

function computeGame(cardList, card, cardCountMap = new Map()) {
    const cardId = parseInt(card.cardId);
    const cardResult = parseInt(card.result);

    if (cardCountMap.has(cardId)) {
        return cardCountMap.get(cardId);
    }
    
    let count = 1;
  
    for (let i = cardId + 1; i <= cardId + cardResult; i++) {
      count += computeGame(cardList, cardList.get(i), cardCountMap);
    }

    cardCountMap.set(cardId, count);
  
    return count;
  }



const fs = require('fs');

// Nom du fichier
const fileName = '../cards.txt';

// Lecture du contenu du fichier
const content = fs.readFileSync(fileName, 'utf-8');

const splittedContent = content.split(/[\r\n]+/g);

let result = 0;

let cardList = new Map();

let cardId = 1;

let cardCountMap = new Map();


splittedContent.forEach(cardLine => {
    let splittedCardLine = cardLine.split(':');
    let cardName = splittedCardLine[0];
    let cardValue = splittedCardLine[1].trim().split('|');
    let cardWiningNumber = cardValue[0].trim().split(/\s+/,);
    let cardNumber = cardValue[1].trim().split(/\s+/,);

    let winningNumber = [];

    cardNumber.forEach(number => {
        if(cardWiningNumber.includes(number)){
            winningNumber.push(number);           
        }
    });

    cardList.set(cardId, new Card(cardId, cardWiningNumber, cardNumber, winningNumber));

    cardId++;
});

let totalResult = 0;

cardList.forEach((card) => {
    const countForCard = computeGame(cardList, card, cardCountMap);
    totalResult += countForCard;
})

console.log(" RESULT FIN : " + totalResult);