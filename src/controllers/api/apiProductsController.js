
const db = require('../../../database/models') ;
const Op = db.Sequelize.Op ; 

const apiProductsController = {

    list : (req,res) => {
        db.Product
            .findAll({
                include : ['colors' , 'sizes']
            })
            .then(products => {
                return res.json({
                    meta : {
                        status : 200 , 
                        count : products.length,
                        url : 'api/products'
                    },
                    data : {
                        products,
                        totalProducts : products.length ,   
                    }   
                })
            })
    },

    detail : (req,res) => {
        db.Product
            .findByPk(req.params.id_product , {
                include : ['colors','sizes']
            }) 
            .then(product => {
                return res.json({
                    meta : { 
                        status : 200 , 
                        url : 'api/products/:id'

                    },
                    data : {
                        product,
                        imageUrl : 'http://localhost:3001/images/products/' + product.image ,

                    }

                })
            })
            .catch(error => res.send('Something is wrong'))
    }
}

module.exports = apiProductsController ; 