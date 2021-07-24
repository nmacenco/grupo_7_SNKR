const express = require ("express") ;
const { join } = require("path");
const path = require ("path") ;

const app = express() ;

const publiPath = path.resolve (__dirname, "./public") ;
app.use (express.static(publiPath)) ;

app.listen (3000, () => console.log("El servidor se esta ejecutando en http://localhost:3000") ) ;

app.get ("/home" , (req,res) => {
    res.sendFile(path.join(__dirname, "/views/index.html")) ;
})

app.get ("/login" , (req,res) => {
    res.sendFile(path.join(__dirname, "/views/login.html")) ;
})

app.get ("/productCart" , (req,res) => {
    res.sendFile(path.join(__dirname, "/views/productCart.html")) ;
})

app.get ("/productDetail" , (req,res) => {
    res.sendFile(path.join(__dirname, "/views/productDetail.html")) ;
})

app.get ("/register" , (req,res) => {
    res.sendFile(path.join(__dirname, "/views/register.html")) ;
})