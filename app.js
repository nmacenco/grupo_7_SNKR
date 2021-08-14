const express = require ("express") ;
const { join } = require("path");
const path = require ('path') ;
const app = express() ;


app.use (express.static('public'));

app.set ('view engine' , 'ejs') ;   
app.set ('views' , path.join(__dirname, './src/views') ) ;
    
app.listen (3000, () => console.log('El servidor se esta ejecutando en http://localhost:3000') ) ;


/* REQUIRES DE ARCHIVOS DE RUTAS */

const rutasHome = require ('./src/routes/main');
const rutasProducts = require ('./src/routes/products');
const rutasUsers = require ('./src/routes/users');


/* DEFINICIÓN DE RUTAS EN LA WEB */

app.use ('/' , rutasHome)
app.use ('/users' , rutasUsers)
app.use ('/products' , rutasProducts)


