const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
//initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname + '/views'));
app.engine(
  //configuracion del motor de plantillas
  '.hbs',
  exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs'); //aqui el motor de plantillas es engine
//Middlewares
app.use(express.urlencoded({ extended: false }));
//Gloval variables

//Routes
app.get('/', (req, res) => {
  res.render('index');
});
//Static files
app.use(express.static(path.join(__dirname + '/public'))); //express.static(): define donde esta la carpeta pulica
module.exports = app;
