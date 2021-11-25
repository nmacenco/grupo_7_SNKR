module.exports = (sequelize , dataTypes) => {
    let alias = 'Order' ;
    let cols = { 
        id_order : {
            type : dataTypes.INTEGER , 
            primaryKey : true , 
            autoIncrement : true, 
            allownNull : true
        },
        total_price : { 
            type : dataTypes.INTEGER(11) ,
            allownNull : false 
        }
    } ;
    let config = { 
        tableName : 'orders' ,
        timestamps : false 
    } ;


    const Order = sequelize.define(alias,cols,config) ;

    Order.associate = (models) => {
        Order.hasMany(models.Item, {
            as: 'items',
            foreignKey: 'id_order'
        });
        
        Order.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'id_user' 
        });
    };
    

    return Order
}