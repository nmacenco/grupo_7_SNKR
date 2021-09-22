// Verifica si hay alguien es session (loggeado), en caso de ser false redirecciona a la pagina de login.

function authMiddleware(req,res,next) {
    if(!req.session.userLogged) {
        return res.redirect('/users/login')
    }

    next() ;
}

module.exports = authMiddleware ;