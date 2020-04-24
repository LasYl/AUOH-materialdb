//asennukset terminaalissa:
//npm install express
//npm install nodemon --save-dev
//npm install mongoose


//package.jsoniin:
//"start": "node app.js",
//"start-dev": "nodemon app.js"


const express = require ('express');

//porttimäärittely, ympäristömuuttujasta lukeva portin määrittely, PORT isolla! Jos ei määritetty, valitsee 8080
const port = process.env.PORT || 8080;
//otetaan mongoose käyttöön
const mongoose = require('mongoose')

//alustetaan aplikaatio
const app = express();

//parsii sisään tulevien pyyntöjen viestikenttää

const body_parser = require('body-parser');

//otetaan luotu moduuli käyttöön, samasta kansiosta
const material_controller =require('./material_controller')

//bodyparser expressapplikaatiolle käyttöön, 
app.use(body_parser.json()); //jos json, parsii req.body.name
app.use(body_parser.urlencoded({extended:true
})); // jos urliin koodattu dataa



//perusloggaus arvolle, kun tulee pyyntö serverille
app.use ((req,res,next)=>{
    console.log(req.method, ' ', req.path);
    next();
}); // Esim. GET api/materials

//RESTful API
//CRUD OPERATIONS

//CREATE
//post tarkoittaa että ohjaa post-metodit annettuun polkuun
app.post("/api/material", material_controller.api_post_material);

//READ
//Palauttaa materiaalit datana kun api välissä, palauttaa näkymänä kun api pois (app.get("/materials"))
app.get("/api/materials", material_controller.api_get_materials)//ohjataan polku funktiolle api.get_materials

//UPDATE
//app.PUT korvaa täysin olemassa olevat tiedot, eli kaikki tiedot pitää antaa
//app.PATCH korvaisi tietyt tiedot
app.put("/api/material:id", material_controller.api_put_material)


//DELETE
app.delete("/api/material:id", material_controller.api_get_materials)//Poisto mongosta



//mongo salasana yhteys url
const database_url = "mongodb+srv://server:YoPkSBnxekTpsCE3@cluster0-fanmv.mongodb.net/materialdb?retryWrites=true&w=majority"
//yhteyden luonti mongoon
mongoose.connect(database_url, {
    //saadaan luotua uniikkeja kenttiä. (esim. materiaalin nimi), (uniikki IDn lisäksi)
    useCreateIndex: true,
    // jotain tarvittavia määritylsiä
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(()=>{
    console.log('database connected');
    //kuuntelee porttia, kun saadaan yhteys tietokantaan, mutta ei palauta mitään
    app.listen(port);
    
}).catch(err => {
    //jos virhe, annetaan consoleen ilmoitus
    console.log('virhe yhteyden muodostamisessa');
});
