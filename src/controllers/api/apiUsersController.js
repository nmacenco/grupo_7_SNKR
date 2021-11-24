const db = require('../../../database/models') ;
const Op = db.Sequelize.Op ; 

const apiProductsController = {

    list: (req,res) =>
    {
        db.User
            .findAll({
                attributes: ['id_user', 'first_name', 'last_name', 'email']
            })
            .then(users =>{
                return res.status(200).json({
                    count: users.length,
                    users: users,
                    //detail: 'http://localhost:3001/api/users/',
                    status: 200
                })
            })
    },
    detail: (req,res) =>
    {
        db.User
            .findByPk(req.params.idUser,{
                attributes: {exclude:  ['password', 'category']}
                })
            .then(user =>{
                return res.status(200).json({
                    data: user, 
                    status: 200
                })
            })
    }
}

module.exports = apiProductsController;