//tietokantamalli, joka kaivaa tiedon tietokannasta, ja muuntaa sen halutuksi muodoksi

//CREATE

//READ

//lukukäsittelijä, uusi funktio
const api_get_materials = (req, res, next) => {
    //palautetaan tyhjä kenttä, että nähdään sen tulevan oikealle käsittelijälle
    res.send(JSON.stringify([]));
}

//UPDATE

//DELETE

//EXPORTS
module.exports.api_get_materials = api_get_materials;