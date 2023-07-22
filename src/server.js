const express = require ('express');
const path = require ('path')
//initializations
const app = express();

//Settings
app.set('port',process.env.PORT || 4000)
app.set('views', path.join( __dirname+'views'))
//Middlewares
app.use(express.urlencoded({extended: false}));
//Gloval variables

//Routes
app.get('/',(req,res)=>{
    res.send("holamundo");
})
//Static files
app.use(express.static(path.join( __dirname+'public')))       //express.static(): define donde esta la carpeta pulica
module.exports=app;

