//tietokantamalli, joka kaivaa tiedon tietokannasta, ja muuntaa sen halutuksi muodoksi

// määritetään viitaten tiedostoon material_model
const material_model = require('./material_model')

//CREATE
// yksi uusi materiaali
const api_post_material = (req, res, next) => {
    console.log('api_post_material');
    //data talteen, määritetään luotavat arvot
    let data = {
        name: req.body.name,
        min_density: req.body.min_density,
        max_density: req.body.max_density,
        min_strength: req.body.min_strength,
        max_strength: req.body.max_strength,
        min_strength_density: req.body.min_strength / req.body.max_density,
        max_strength_density: req.body.max_strength / req.body.min_density

    };

    let new_material = material_model(data);

    new_material.save().then(()=>{
        console.log(new_material);
        //lähetetään sama data takaisin JSON.stringify-muodossa
        res.send(JSON.stringify(new_material));
    }).catch(err => {
        res.status(500);
        //lähettää virheen postmanohjelman bodyyn
        res.send(err.errmsg);
        console.log('virhe tallennuksessa');
    });
    //lähetetään sama data takaisin JSON.stringify-muodossa
   
};

//READ



//lukukäsittelijä, uusi funktio
// lista kaikista materiaaleista. (s perässä)
const api_get_materials = (req, res, next) => {

    material_model.find({})
    .lean()
    .then(materials => {
    //palautetaan tmaterials, että nähdään sen tulevan oikealle käsittelijälle
    res.send(JSON.stringify(materials));  
    }).catch(err => {
        res.status(500);
        //lähettää virheen postmanohjelman bodyyn
        res.send(err.errmsg);
        console.log('virhe tallennuksessa');

    });
  } 

//UPDATE

//DELETE

const api_delete_material = (req, res, next) => {
    // haetaan IDksi kyseinen id mongosta
    let id = req.params.id;
    material_model.findByIdAndRemove(id).then(()=>{
        res.send();
        console.log('poistettu');

    }).catch(err => {
        res.status(500);
        //lähettää virheen postmanohjelman bodyyn
        res.send(err.errmsg);
        console.log('virhe poistossa');
    })

}

//EXPORTS
module.exports.api_post_material = api_post_material;
module.exports.api_get_materials = api_get_materials;
module.exports.api_delete_material = api_delete_material;