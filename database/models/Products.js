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

    return Products 
}