

function admin2Middleware (req,res,next) {
    res.locals.isAdmin = false ;

    if (req.session.userLogged) {
        if (req.session.userLogged.username == 'Admin') {
            res.locals.isAdmin = true ; 
        }
    }


    next() ;
}

module.exports = admin2Middleware ;