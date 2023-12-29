const nombresEnLettres = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
};


const fs = require('fs');

// Nom du fichier
const fileName = '../calibration.txt';

// Lecture du contenu du fichier
const content = fs.readFileSync(fileName, 'utf-8');

const calibrationArray = content.split(/[\r\n]+/g);

let result = 0;

calibrationArray.forEach(element => {
    element = element.replace(/[\r\n]+/g, "");

    let regex = /\d|one\B|one\b|two\B|two\b|three\B|three\b|four\B|four\b|five\B|five\b|six\B|six\b|seven\B|seven\b|eight\B|eight\b|nine\B|nine\b/;

    let currenDigit = null;
    let firstDigit = null;
    let lastDigit = null;

    console.log("element :" + element);

    firstDigit = regex.exec(element)[0];

    // Initialiser lastIndex à la fin de la chaîne
    regex.lastIndex = element.length;

    let match;

    while ((match = regex.exec(element)) !== null) {
        lastDigit = match;
        element = element.slice(lastDigit.length, element.length);
    }

   firstDigit = nombresEnLettres[firstDigit] !== undefined ? nombresEnLettres[firstDigit] : firstDigit;
   lastDigit = nombresEnLettres[lastDigit] !== undefined ? nombresEnLettres[lastDigit] : lastDigit;

   console.log("firstDigit :" + firstDigit);

    console.log("lastDigit :" + lastDigit);

    currenDigit = "" +firstDigit + lastDigit + ""

    result += parseInt(currenDigit);

    console.log(" partial result : " + result + "\n");

})

console.log("result : \n" + result);