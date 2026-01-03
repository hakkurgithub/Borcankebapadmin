const fs = require('fs');const path = require('path');// Taranmayacak gereksiz klasörlerconst yoksay = ['.git', 'node_modules', '.next', '.vercel', '.vscode'];function dosyalariGez(dizin, seviye = 0) {

const dosyalar = fs.readdirSync(dizin);

const girinti = ' '.repeat(seviye);



dosyalar.forEach(dosya => {

// Gizli dosyaları ve yoksayılan klasörleri atla

if (yoksay.includes(dosya)) return;



const tamYol = path.join(dizin, dosya);

const stats = fs.statSync(tamYol);



if (stats.isDirectory()) {

console.log(`${girinti}📁 [KLASÖR] ${dosya}`);

dosyalariGez(tamYol, seviye + 1);

} else {

console.log(`${girinti}📄 ${dosya}`);

}

});

}console.log("--- PROJE DOSYA LİSTESİ ---\n");

dosyalariGez(__dirname);console.log("\n---------------------------");