//tietokantamalli, joka kaivaa tiedon tietokannasta, ja muuntaa sen halutuksi muodoksi

//CREATE
// yksi uusi materiaali
const api_post_material = (req, res, next) => {
    console.log('api_post_material');
    //data talteen
    let data = req.body;
    //lähetetään sama data takaisin JSON.stringify-muodossa
    res.send(JSON.stringify(data));
}

//READ

//lukukäsittelijä, uusi funktio
// lista kaikista materiaaleista. (s perässä)
const api_get_materials = (req, res, next) => {
    //palautetaan tyhjä kenttä, että nähdään sen tulevan oikealle käsittelijälle
    res.send(JSON.stringify([]));
}

//UPDATE

//DELETE

//EXPORTS
module.exports.api_post_material = api_post_material;
module.exports.api_get_materials = api_get_materials;