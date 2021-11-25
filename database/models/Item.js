module.exports = (sequelize , dataTypes) => {
    let alias = 'Item' ;
    let cols = { 
        id_item : {
            type : dataTypes.INTEGER , 
            primaryKey : true , 
            autoIncrement : true, 
            allownNull : false
        },
        product_name : { 
            type : dataTypes.STRING(100) ,
            allownNull : false 
        },
        unit_price : { 
            type : dataTypes.INTEGER(10) ,
            allownNull : false 
        },
        subtotal : { 
            type : dataTypes.INTEGER(10),
            allownNull : true , 
        },
        quantity : { 
            type : dataTypes.INTEGER(10),
            allownNull : false 
        }, 
        image : { 
            type : dataTypes.STRING(255), 
            allownNull : false 
        },
        color : { 
            type : dataTypes.STRING(200),
            allownNull : false 
        },
        size : { 
            type : dataTypes.DECIMAL(3,1) ,
            allowNull : false 
        }

    } ;
    let config = { 
        tableName : 'items' ,
        timestamps : false 
    } ;


    const Item = sequelize.define(alias,cols,config) ;

    Item.associate = function (models) {
        Item.belongsTo(models.Order, {
            as: 'order',
            foreignKey: 'id_order',
            timestamps : false 
        }),
        Item.belongsTo(models.User , { 
            as: 'user',
            foreignKey: 'id_user' ,
            timestamps : false 
        })

    }

    return Item
}