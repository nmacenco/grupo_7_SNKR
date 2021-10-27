
module.exports = (sequelize,dataTypes) => { 

    let alias = 'Size' ;
    let cols = {
        id_size : { 
            type : dataTypes.INTEGER(11) ,
            allowNull : false ,
            autoIncrement : true , 
            primaryKey : true 
        },
        size : { 
            type : dataTypes.DECIMAL(3,1) ,
            allowNull : false 
        }

    } ;
    let config = {
        tableName : 'size',
        timestamps : false 
    }

    const Size = sequelize.define(alias,cols,config) ;

    Size.associate = function (models) {
        Size.belongsToMany(models.Product , { 
            as: 'products' ,
            through : 'size_products',
            foreignKey : 'id_size' ,
            otherKey : 'id_product',
            timestamps : false 
        })

    }

    return Size 
}