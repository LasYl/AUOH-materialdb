const express = require ('express');

//porttimäärittely, ympäristömuuttujasta lukeva portin määrittely, PORT isolla! Jos ei määritetty, valitsee 8080
const port = process.env.PORT || 8080;

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
}); // Esim. GET api/materials

//RESTful API
//CRUD OPERATIONS

//CREATE

//READ
//Palauttaa materiaalit datana kun api välissä, näkymänä api pois (app.get("/materials"))
app.get("/api/materials", material_controller.api_get_materials)//ohjataan polku funktiolle api.get_materials

//UPDATE

//DELETE

//kuuntelee porttia, mutta ei palauta mitään
app.listen(port)