// Verifica si hay alguien es session (loggeado), en caso de ser true redirecciona a la pagina de profile.
function guestMiddleware (req,res,next) {

    if (req.session.userLogged) {
        return res.redirect('/users/profile')
    }

    next() ;
}

module.exports = guestMiddleware ;