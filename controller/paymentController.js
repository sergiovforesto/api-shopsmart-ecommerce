import { request, response } from "express";
import Payment from "../models/paymentsModel.js";

const createPayment = async(req = request, res = response) => {
    const {fullName, exp, cvv, cardNumber} = req.body
    
    const {user} = req
    
    const existPaymentMethod = await Payment.findOne({where: {userId: user.userId}})

    if(existPaymentMethod) {
        const error = new Error('This user have Payment Method')
        return res.status(404).json({msg: error.message})
    }

    try {

        const createPayment = Payment.build({
            fullName: fullName,
            exp: exp,
            cvv: cvv,
            cardNumber: cardNumber,
            userId: user.userId
        })
    
        await createPayment.save()

        res.status(201).json({msg: 'Payment Method Added', createPayment})
    } catch (error) {
        const err = new Error('Error to add payment method')
        res.status(500).json({msg: err.message})
    }
    
}

const getPayment = async(req = request, res = response) => {
    
    const {user} = req

    const paymentMethod = await Payment.findOne({where: {userId: user.userId}})

    if(!paymentMethod) {
        const error = new Error('This user doesnt have Payment Method')
        return res.status(404).json({msg: error.message})
    }

    const {exp, fullName} = paymentMethod

    res.status(200).json({fullName, exp})
}

const updatePayment = async(req = request, res = response) => {
    const {fullName, exp, cvv, cardNumber} = req.body
    
    const {user} = req

    const paymentMethod = await Payment.findOne({where: {userId: user.userId} })

    if(!paymentMethod) {
        const error  = new Error('This Payment method doesnt exist')
        return res.status(400).json({msg: error.message})
    }

    const updatePayment = paymentMethod.toJSON();

    try {
        
        paymentMethod.fullName = fullName || updatePayment.fullName
        paymentMethod.exp = exp || updatePayment.exp
        paymentMethod.cvv = cvv || updatePayment.cvv
        paymentMethod.cardNumber = cardNumber || updatePayment.cardNumber
        
    
        await paymentMethod.save()
        res.status(200).json({msg: 'Update Corretly', paymentMethod, oldPayment: updatePayment})
        
        
    } catch (error) {
        const err  = new Error('Error to Update Payment method')
        return res.status(500).json({msg: err.message})
    }


}

const deletePayment = async(req = request, res = response) => {
    
    const {user} = req

    const existMethod = await Payment.findOne({where: {userId: user.userId} })

    if(!existMethod) {
        const err  = new Error(`This ID:${id} does not exist`)
        return res.status(400).json({msg: err.message})
    }

    await Payment.destroy({where: {userId: user.userId}})
    res.status(200).json({msg: 'Deleted successfully'})

}

export {
    createPayment,
    getPayment,
    updatePayment,
    deletePayment
}

