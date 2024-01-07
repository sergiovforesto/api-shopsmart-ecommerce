import { request, response } from "express";
import { Op } from "sequelize";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import ShippingInfo from "../models/shippingInfoModel.js";


const createOrder = async(req = request, res =response) => {
    const { products, subTotal, total} = req.body
    const {user} = req


    products.map(async(item) => {

        const product = await Product.findOne({where: { [Op.and]: [ {id: item.productId}, {title: item.name} ] } })
        if(!product ) {
            const err = new Error('Este Producto No Existe')
            return res.status(404).json({msg: err.message})
        }
        return product
    })

    try {
        const order = Order.build({
            orderNumber: crypto.randomUUID(),
            products: products,
            dateOrder: new Date().toISOString().split('T')[0],
            dateDelivery: 'Pending to be assigned',
            subTotal: subTotal,
            total: total,
            userId: user.userId 
        })

        await order.save()
        res.status(201).json({msg: 'Order created', order})
    } catch (error) {
        const err = new Error('Failed to create order')
        return res.status(500).json({msg: err.message})
    }

}

const getOrderUser = async(req = request, res = response) => {
    const {userId} = req.user

    const lastOrder = await Order.findOne({
        where: {userId: userId},
        order: [
            ['createdAt', 'DESC']
        ]
    })

    if(!lastOrder) {
        const error = new Error("You haven't orders")
        return res.status(404).json({msg: error.message})
    }

    res.status(200).json({lastOrder})
    
}

const getMyOrders = async(req = request, res = response) => {
    const {userId} = req.user

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    const orders = await Order.findAll({
        attributes: ['orderNumber', 'dateOrder', 'dateDelivery', 'status', 'total'],
        where: {userId: userId},
        offset: (page - 1) * limit,
        limit: limit,
    })

    if(!orders) {
        const error = new Error("You haven't orders")
        return res.status(404).json({msg: error.message})
    }

    const quantity = await Order.count({where: {userId: userId}})


    res.status(200).json({quantityOrders: quantity, orders})
    
}

const getMyOrder = async(req = request, res = response) => {
    const {orderNumber} = req.params
    
    const order = await Order.findOne({
        where: {orderNumber: orderNumber}
    })

    if(!order) {
        const error = new Error("This Order Don't exist")
        return res.status(404).json({msg: error.message})
    }

    res.status(200).json({order})
    
}

const getAllOrders = async(req = request, res = response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    const orders = await Order.findAll({
        offset: (page - 1) * limit,
        limit: limit,
    })

    if(!orders) {
        const error = new Error("You haven't orders")
        return res.status(404).json({msg: error.message})
    }

    const orderNumber = await Order.count()

    res.status(200).json({quantityOrders: orderNumber, orders})

}

const getOrderNumber = async(req = request, res = response) => {
    const {orderNumber} = req.params

    const order = await Order.findOne({
        where: {orderNumber: orderNumber}
    })

    if(!order) {
        const error = new Error("This Order Don't exist")
        return res.status(400).json({msg: error.message})
    }
    const {userId} = order

    const shippingInfo = await ShippingInfo.findOne({
        where: {userId: userId}
    })

    if(!shippingInfo) {
        const error = new Error("This user does not have shipping information")
        return res.status(400).json({msg: error.message})
    }

    res.status(200).json({order, shippingInfo})
}

const updateDelivery = async(req = request, res = response) => {
    const {status, dateDelivery} = req.body
    const {orderNumber} = req.params

    const order = await Order.findOne({
        where: {orderNumber: orderNumber}
    })

    if(!order) {
        const error = new Error("This Order Don't exist")
        return res.status(400).json({msg: error.message})
    }

    const updateOrder = order.toJSON();
    

    try {
        order.status = status || updateOrder.status,
        order.dateDelivery = dateDelivery || updateDelivery.dateDelivery

        await order.save();
        res.status(200).json({msg: 'Updated Order', order, oldOrder: updateOrder})
        
    } catch (error) {
        const err = new Error('Failed to Updated order')
        return res.status(500).json({msg: err.message})
    }


}

export {
    createOrder,
    getOrderUser,
    getAllOrders,
    getOrderNumber,
    updateDelivery,
    getMyOrders,
    getMyOrder
}