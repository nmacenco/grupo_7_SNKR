
module.exports = (sequelize,dataTypes) => {

    let alias = 'Color' ;
    let cols = { 
        id_color : {
            type : dataTypes.INTEGER(11) ,
            allowNull : false ,
            autoIncrement : true , 
            primaryKey : true 
        }, 
        color : {
            type : dataTypes.STRING(45),
            allowNull : false , 
        }
    } ;
    let config = { 
        tableName : 'colors' ,
        timestamps : false 
    }

    const Color = sequelize.define(alias,cols,config) ;

    Color.associate = function (models) {
        Color.belongsToMany(models.Product , { 
            as: 'products' ,
            through : 'color_products',
            foreignKey : 'id_color' ,
            otherKey : 'id_product',
            timestamps : false 
        })

    }

    return Color
}