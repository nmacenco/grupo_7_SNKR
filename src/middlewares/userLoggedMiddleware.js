const path = require ('path')
const fs = require('fs');


//  LECTURA JSON    //
function leerJson () {
    const usersFilePath = path.join (__dirname, '../data/users.json') ;
    const users = JSON.parse(fs.readFileSync(usersFilePath,'utf-8')) ;
    return users;
}

//  BUSCAR USUARIO POR CAMPO //
function findByField (field, text) {
    let allUsers = leerJson();
    let userFound = allUsers.find(oneUser => oneUser[field] === text);
    return userFound;
}



function userLoggedMiddleware (req,res,next) {
    res.locals.isLogged = false ;

    let emailInCookie = req.cookies.userEmail;
	let userFromCookie = findByField('email', emailInCookie);

    console.log(emailInCookie);
	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

    if (req.session.userLogged) {
        res.locals.isLogged = true ; 
        res.locals.userLogged = req.session.userLogged;
    }


    next() ;
}

module.exports = userLoggedMiddleware ;

