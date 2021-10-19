
module.exports = (sequelize, dataTypes) => {
    let alias = 'Users' ;
    let cols = {
        id_user : { 
            type : dataTypes.INTEGER(11) ,
            primaryKey : true , 
            autoIncrement : true , 
            allowNull : false 
        },
        first_name : { 
            type : dataTypes.STRING(100),
            allowNull : false 
        },
        last_name : { 
            type : dataTypes.STRING(100),
            allowNull : false 
        },
        username : { 
            type : dataTypes.STRING(100),
            allowNull : false 
        },
        email : { 
            type : dataTypes.STRING(100),
            allowNull : false 
        },
        password : { 
            type : dataTypes.STRING(100),
            allowNull : false 
        },
        category : { 
            type : dataTypes.STRING(100),
            allowNull : false 
        },
        avatar : { 
            type : dataTypes.STRING(100),
            allowNull : true 
        }
    } ; 
    let config = {
        tableName : 'users' , 
        timestamps : false 
    }

    const Users = sequelize.define(alias, cols, config) ;

    Users.associate = function (models) {
        Users.belongsToMany(models.Products, {
            as: 'users' ,
            through : 'products_users',
            foreignKey : 'id_user' ,
            otherKey : 'id_product',
            timestamps : false 
        })
    }

    return Users 
}