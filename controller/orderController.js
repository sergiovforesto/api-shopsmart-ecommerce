import { request, response } from "express";
import { Op } from "sequelize";
import generateUUI from "../helper/generateUUI.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";


const createOrder = async(req = request, res =response) => {
    const { numberOrder, shippingDate, dateDelivery, products, status, subTotal, total} = req.body
    const {user} = req

    //TODO NOTA: aqui podrias validar, si en cada producto, el stock y active son positivos(capaz, solo active)
    //* O bueno ese deberias hacerlo en el front, no se debe permitir agregar un producto si ese producto, en su stock esta en 0

    products.map(async(item) => {

        const product = await Product.findOne({where: { [Op.and]: [ {id: item.id}, {title: item.title} ] } })
        if(!product ) {
            const err = new Error('Este Producto No Existe')
            return res.status(404).json({msg: err.message})
        }
        return product
    })
    res.status(200).json({product: products})

    //*Nota: ¿Como Deberias manejar la cantidad?
    //? => Podrias incluir quantity dentro json de products y lo extraes de alli
    //*Nota: Recuerda que en el front ya deberias pasarle el subTotal y total
    //? O lo haces desde aqui, el backend


    




    // if(stock <= 0 ) {
    //     const err = new Error('Este Producto no esta disponible')
    //     return res.status(404).json({msg: err.message})
    // }else {
    //     res.status(200).json({msg: 'Si esta disponible en stock'})
    // }
    
}

export {
    createOrder
}