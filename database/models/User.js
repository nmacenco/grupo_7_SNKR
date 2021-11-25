
module.exports = (sequelize, dataTypes) => {
    let alias = 'User' ;
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

    const User = sequelize.define(alias, cols, config) ;

    User.associate = function (models) {
        User.belongsToMany(models.Product, {
            as: 'products' ,
            through : 'products_users',
            foreignKey : 'id_user' ,
            otherKey : 'id_product',
            timestamps : false 
        }),
        User.hasMany(models.Item, {
            as: 'items',
            foreignKey: 'id_user'
        });

        User.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'id_user'
        });
    }

    return User
}