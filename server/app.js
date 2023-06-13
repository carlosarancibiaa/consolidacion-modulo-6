//importaciones de librerias
const express = require('express');
const cors = require('cors');
const {create} = require('express-handlebars')

//ejecutamos express
let app = express();

//crear instancia de handlebars
const hbs = create({
    partialsDir: ["views/partials/"]
});

//ajustar handlebars como motor de plantillas
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

//activar middlewares
app.use(cors());
app.use(express.json());

//publicar carpeta dist de bootstrap para que sea accesible para el cliente
app.use('/bootstrap', express.static(__dirname+'/node_modules/bootstrap/dist/'));

//puclicamos la carpeta public
app.use(express.static('public'));
//exportamos el modulo
module.exports = app