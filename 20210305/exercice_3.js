const data = require('./source-data.json')
const result = data
    .map(datas => ({Commune : datas.MunicipalityName, PotentielElectriciteSolaire: datas.Scenario1_RoofsOnly_PotentialSolarElectricity_GWh}))
    .sort((a, b) => a.PotentielElectriciteSolaire > b.PotentielElectriciteSolaire ? -1 : 1);
console.log(result);
