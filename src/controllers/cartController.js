const db = require("../../database/models");


module.exports = {

    // esto anda bien, no responde la base todavia 
    listCart: async (req, res) =>{
        // let items = await db.Item.findAll({
        //     where: {
        //         id_user: req.session.userLogged.id,
        //         id_order: null
        //     }
        // })
        // let totalPrice = 0;
        // items.forEach(item =>{
        //     totalPrice += item.subtotal
        // })
        // return res.render("productCart", { items , totalPrice});

        // este render es para pruebas 
        return res.render("productCart");
    },
    addProduct: async (req, res) => {
        let producto = await db.Product.findByPk(req.params.id, {
            include:['colors' , 'sizes']
        });
        await db.Item.create({
            product_name: producto.name,
            unit_price: Number(producto.price),
            color: req.body.color,
            size: req.body.size,
            subtotal: Number(req.body.cantidad) * Number(producto.price),
            quantity: Number(req.body.cantidad),
            image: producto.image,
            id_user: req.session.userLogged.id_user
        })
        return res.redirect("/cart") 

    },
    destroyItem: async (req, res) =>{
        await db.Item.destroy({
            where:{
                id: req.params.id
            }
        });
        res.redirect("/cart")
    },
    addOrder: async(req, res) =>{
        let items = await db.Item.findAll({
            where:{
                id_user: req.session.userLogged.id,
                id_order: null
            }
        })
        let totalPrice = 0;
        items.forEach(item => {
            totalPrice += item.subtotal
        })
        let orderNew = await db.Order.create({
            total_price: totalPrice,
            id_user: req.session.userLogged.id
        })
        await db.Item.update({
            id_order : orderNew.id
        },{
            where:{
                id_user: req.session.userLogged.id,
                id_order: null
            }
        })
        return res.redirect("/")
    }
}