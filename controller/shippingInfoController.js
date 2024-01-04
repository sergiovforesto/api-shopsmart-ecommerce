import { request, response } from "express";

import ShippingInfo from "../models/shippingInfoModel.js";
import User from "../models/userModel.js";

const createShippingInfo = async(req = request, res = response) => {
    const {country, city, state, address, phone, zipCode} = req.body
    
    const {user} = req

    const userHasInfo = await ShippingInfo.findOne({where: {userId: user.userId}})

    if(userHasInfo) {
        const error = new Error('This user already has your shipping information')
        return res.status(404).json({msg: error.message})
    }

    try {
        const createShippingInfo = ShippingInfo.build({
            country: country,
            city: city, 
            state: state, 
            address: address, 
            phone: phone, 
            zipCode: zipCode,
            userId: user.userId
        })
    
        await createShippingInfo.save()
    
        res.status(201).json({msg: 'Added Successfully', info: createShippingInfo})

    } catch (error) {
        const err = new Error('Error to create shipping information')
        res.status(500).json({msg: err.message})
    }

}


const getAllShippingInfo = async(req = request, res = response) => {
    const usersInfo = await ShippingInfo.findAll({include: User})

    if(usersInfo.length === 0) {
        const error  = new Error('Is Empty')
        return res.status(400).json({msg: error.message})
    }

    res.status(200).json({totalShippingInfo: usersInfo.length, usersInfo})

}

const getShippingInfo = async(req = request, res = response) => {
    const {user} = req
    const userHasInfo = await ShippingInfo.findOne({where: {userId: user.userId}})

    if(!userHasInfo) {
        const error = new Error('This user does not have shipping information')
        return res.status(404).json({msg: error.message})
    }

    res.status(200).json({userHasInfo})

}


const updateShippingInfo = async(req = request, res = response) => {
    const {country, city, state, address, phone, zipCode} = req.body
    const {user} = req

    const shippingInfo = await ShippingInfo.findOne({where: {userId: user.userId} })

    
    if(!shippingInfo) {
        const error  = new Error('This Shipping Info doesnt exist')
        return res.status(400).json({msg: error.message})
    }
    
    const updateShippingInfo = shippingInfo.toJSON();
    
    try {
        
        shippingInfo.country = country || updateShippingInfo.country
        shippingInfo.city = city || updateShippingInfo.city
        shippingInfo.state = state || updateShippingInfo.state
        shippingInfo.address = address || updateShippingInfo.address
        shippingInfo.phone = phone || updateShippingInfo.phone
        shippingInfo.zipCode = zipCode || updateShippingInfo.zipCode
    
        await shippingInfo.save()
        res.status(200).json({msg: 'Update Corretly', shippingInfo, oldInfo: updateShippingInfo})
        
        
    } catch (error) {
        const err  = new Error('Error to Update Information')
        return res.status(500).json({msg: err.message})
    }
}

const deleteShippingInfo = async(req = request, res = response) => {
    const {user} = req

    const existInfo = await ShippingInfo.findOne({where: {userId: user.userId} })

    if(!existInfo) {
        const err  = new Error(`This ID:${id} does not exist`)
        return res.status(400).json({msg: err.message})
    }
    
    await ShippingInfo.destroy({where: {userId: user.userId}})

    res.status(200).json({msg: 'Deleted successfully'})

}

export {
    createShippingInfo,
    getShippingInfo,
    getAllShippingInfo,
    updateShippingInfo,
    deleteShippingInfo
}