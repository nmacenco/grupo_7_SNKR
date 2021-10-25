module.exports = (sequelize , dataTypes) => {
    let alias = 'Products' ;
    let cols = { 
        id_product : {
            type : dataTypes.INTEGER , 
            primaryKey : true , 
            autoIncrement : true, 
            allownNull : false
        },
        name : { 
            type : dataTypes.STRING(100) ,
            allownNull : false 
        },
        price : { 
            type : dataTypes.DECIMAL(10,2) ,
            allownNull : false 
        },
        detail : { 
            type : dataTypes.STRING(8000),
            allownNull : true , 
            defaultValue : null 
        },
        gender : { 
            type : dataTypes.STRING(100),
            allownNull : false 
        }, 
        brand : { 
            type : dataTypes.STRING(100), 
            allownNull : false 
        },
        category : { 
            type : dataTypes.STRING(100),
            allownNull : false 
        }, 
        image : { 
            type : dataTypes.STRING(100),
            allownNull : false 
        }

    } ;
    let config = { 
        tableName : 'products' ,
        timestamps : false 
    } ;


    const Products = sequelize.define(alias,cols,config) ;

    Products.associate = function (models) {
        Products.belongsToMany(models.Users, {
            as: 'users' ,
            through : 'products_users',
            foreignKey : 'id_product' ,
            otherKey : 'id_user',
            timestamps : false 
        }),
        Products.belongsToMany(models.Colors , { 
            // as: 'colors' ,
            through : 'color_products',
            foreignKey : 'id_product' ,
            otherKey : 'id_color',
            timestamps : false 
        }),
        Products.belongsToMany(models.Size , { 
            // as: 'sizes' ,
            through : 'size_products',
            foreignKey : 'id_product' ,
            otherKey : 'id_size',
            timestamps : false 
        })

    }

    return Products 
}