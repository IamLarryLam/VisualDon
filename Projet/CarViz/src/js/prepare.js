const fs = require("fs");
const data = require("../data/data.json");

const result = data
    .map(d => ({
        chevaux: Number(d.horsepower),
        constructeur: d.make,
        type: d["body-style"],
        prix: d.price,
        rpmMax: Number(d["peak-rpm"]),
        consommation: d["city-mpg"],
        moteur: d.aspiration,
        cylindre: d.aspiration,
        moteur: d["num-of-cylinders"],
        carburant: d.gas,
    }))
    .sort((a, b) => a.chevaux < b.chevaux ? 1 : -1)
    .sort((a, b) => a.prix > b.prix ? 1 : -1);
// .filter((d, i) => i < 100);

console.log(result);
fs.writeFileSync('../data/data-sorted.json', JSON.stringify(result), 'utf-8');

// {
//     "symboling": -1,
//     "normalized-losses": 95,
//     "make": "volvo",
//     "aspiration": "turbo",
//     "num-of-doors": "four",
//     "body-style": "sedan",
//     "drive-wheels": "rwd",
//     "engine-location": "front",
//     "wheel-base": 109.1,
//     "length": "0.9072561268620856",
//     "width": "0.9569444444444444",
//     "height": 55.5,
//     "curb-weight": 3062,
//     "engine-type": "ohc",
//     "num-of-cylinders": "four",
//     "engine-size": 141,
//     "fuel-system": "mpfi",
//     "bore": "3.78",
//     "stroke": 3.15,
//     "compression-ratio": 9.5,
//     "horsepower": "114.0",
//     "peak-rpm": "5400.0",
//     "city-mpg": 19,
//     "highway-mpg": 25,
//     "price": 22625,
//     "city-L": {
//         "100km": "12.36842105263158"
//     },
//     "horsepower-binned": "Medium",
//     "diesel": 0,
//     "gas": 1
// }