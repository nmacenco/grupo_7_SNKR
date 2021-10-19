
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

    return Size 
}