
module.exports = (sequelize,dataTypes) => {

    let alias = 'Colors' ;
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

    const Colors = sequelize.define(alias,cols,config) ;

    return Colors 
}