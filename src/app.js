//////////// REQUIRES //////////////////
const express = require('express') ;
const path = require ('path') ;
const app = express() ;
const methodOverride = require ('method-override') ; 
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const session = require ('express-session')
const userLoggedMiddleware = require ('./middlewares/userLoggedMiddleware')

const cors = require('cors')


///////////// MIDDLEWARES //////////////////////
app.use (express.static('public'));
app.use (methodOverride('_method')) ;
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(session({
    secret : 'The secret' ,
    resave : false , 
    saveUninitialized : false 
}))
app.use(userLoggedMiddleware)
app.use(cors())


/////////// TEMPLATE ENGINE //////////////
app.set ('view engine' , 'ejs') ;   
app.set ('views' , path.join(__dirname, './views') ) ;



app.listen (process.env.PORT || 3001, () => console.log('El servidor se esta ejecutando en http://localhost:3001') ) ;


/* REQUIRES DE ARCHIVOS DE RUTAS */

const rutasHome = require ('./routes/main');
const rutasProducts = require ('./routes/products');
const rutasUsers = require ('./routes/users');

const rutasApiProducts = require ('./routes/apiRoutes/apiProducts') ;



/* DEFINICIÓN DE RUTAS EN LA WEB */

app.use ('/' , rutasHome)
app.use ('/users' , rutasUsers)
app.use ('/products' , rutasProducts)

//  RUTAS A UTILIZAR CON LAS API // 

app.use ('/api/products' , rutasApiProducts) ;


/* 404 */

app.use((req,res,next) => {
    res.status(404).render('404');
    next();
});