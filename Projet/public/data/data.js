const data = require("./data.json");

const DATA = data
    .map(d => ({
        chevaux: Number(d.horsepower),
        constructeur: d.make,
        type: d["body-style"],
        prix: d.price,
        poids: d["curb-weight"],
        rpmMax: Number(d["peak-rpm"]),
        consommation: d["city-mpg"],
        moteur: d.aspiration,
        cylindre: d.aspiration,
        moteur: d["num-of-cylinders"],
        carburant: d.gas,
    }))
    .sort((a, b) => a.chevaux > b.chevaux ? 1 : -1)
    // .sort((a, b) => a.prix > b.prix ? 1 : -1);
    // .filter((d, i) => i < 100);

console.log(DATA);
export default DATA;