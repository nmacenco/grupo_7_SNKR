

function adminMiddleware (req,res,next) {

    if (!req.session.userLogged) {
        return res.redirect('/')
        
    } else if (req.session.userLogged.username !== 'Admin') {
        return res.redirect('/')
    }

    next() ;
}

module.exports = adminMiddleware ;