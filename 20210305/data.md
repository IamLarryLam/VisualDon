# Exercice 3

Le fichier exercice_3.js contient le code nécessaire pour travailler avec les données.



1. **Récupération des données**

```javascript
const data = require('./source-data.json')
```

2. **Map des données dans 2 champs**

- Commune
- PotentielElectriciteSolaire

```javascript
const result = data
    .map(datas => ({Commune : datas.MunicipalityName, PotentielElectriciteSolaire: datas.Scenario1_RoofsOnly_PotentialSolarElectricity_GWh}))
    .sort((a, b) => a.PotentielElectriciteSolaire > b.PotentielElectriciteSolaire ? -1 : 1);
```

3.  **Export du résultat dans le fichier data.json:**

```javascript
console.log(JSON.stringify(resultat));
```

ainsi que la commande `node exercice_3.js > data.json`.

