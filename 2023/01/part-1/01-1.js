const fs = require('fs');

// Nom du fichier
const fileName = 'calibration.txt';

// Lecture du contenu du fichier
const content = fs.readFileSync(fileName, 'utf-8').replace(/:/g, '');

const calibrationArray = content.split(/[\r\n]+/g);

let result = 0;

calibrationArray.forEach(element => {
    let nombres = element.match(/\d/g);
    let lineResult = nombres[0] + nombres[nombres.length - 1];
    result += parseInt(lineResult);
})

console.log("result : \n" + result);
