import { request, response } from "express"
import User from "../models/userModel.js"
import generateId from '../helper/generateId.js'
import generateJWT from "../helper/generateJWT.js"
import { emailRegister, emailForgotPassword } from "../helper/emails.js"
import { checkPassword } from "../utils/hashPassword.js"


const registerUser = async (req = request, res = response) => {

    try {
        const newClient = User.build(req.body)
        newClient.token = generateId()

        await newClient.save()

        
        emailRegister({
            email: newClient.email,
            name: newClient.name,
            token: newClient.token
        })


        res.status(201).json({msg: 'User created successfully', newClient})

    } catch (error) {
        const err = new Error('Error to create account')
        res.status(500).json({msg: err.message})
    }
}


const confirmUser = async (req = request, res = response) => {
    const {token} = req.params
    
    const userConfirm = await User.findOne({where: {token: token}})

    if(!userConfirm) {
        const error = new Error("Token Doesn't exist")
        return res.status(400).json({msg: error.message})
    }

    try {
        userConfirm.confirm = true
        userConfirm.token = ''

        await userConfirm.save()
        res.status(200).json({msg: 'User confirmed'})

    } catch (error) {
        const err = new Error('Error to confirm user')
        res.status(500).json({msg: err.message})
    }
}


const loginUser = async (req = request, res = response) => {
    const {email, password} = req.body

    const user = await User.findOne({where: {email: email}})

    if(!user) {
        const error = new Error("User Doesn't exist")
        return res.status(404).json({msg: error.message})
    }

    if(!user.confirm) {
        const error = new Error("unconfirmed user")
        return res.status(404).json({msg: error.message})
    }
    

    if(password && await checkPassword(password, user.getDataValue('password'))) { 
            
        res.json({
            msg: 'User login successfully',
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateJWT(user.id) //este token es para guardarlo en el frontend en el localStorage para el inicio de sesion
        })
    }else {
        const error = new Error('Password incorrect')
        return res.status(500).json({msg: error.message})
    }

    
}


const forgotPasswordUser = async (req = request, res = response) => {
    const {email} = req.body

    const user = await User.findOne({where: {email: email}})

    //TODO convertir a middleware
    if(!user) {
        const error = new Error("User Doesn't exist")
        return res.status(404).json({msg: error.message})
    }

    if(!user.confirm) {
        const error = new Error("unconfirmed user")
        return res.status(404).json({msg: error.message})
    }

    try {

        user.token = generateId()
        await user.save()

        emailForgotPassword({
            email: user.email,
            name: user.name,
            token: user.token
        })

        res.status(200).json({msg: 'We have sent an email with the instructions'})


    } catch (error) {
        const err = new Error('Error with server')
        res.status(500).json({msg: err.message})
    }
}

const forgotPasswordTokenUser = async (req = request, res = response) => {
    const {token} = req.params

    const validToken  = await User.findOne({where: {token: token}})

    if(!validToken) {
        const error = new Error("Token Doesn't exist")
        return res.status(400).json({msg: error.message})
    }


    try {

        if(validToken) res.status(200).json({msg: 'Valid Token'})

    } catch (error) {

        const err = new Error('Error to change password, try again')
        res.status(500).json({msg: err.message})
    }

}

const newPasswordUser = async(req = request, res = response) => {
    const {token} = req.params
    const {password} = req.body

    const user = await User.findOne({where: {token: token}})

    if(user) {
        user.password = password
        user.token = ''
        try {
            await user.save()
            res.json({msg: 'Your Password has been changed'})
        } catch (error) {
            res.status(400).json({msg: {errors: error.message} })
            
        }
    }else {
        const error = new Error('Invalid Token')
        return res.status(404).json({msg: error.message})
    }

}

const userInfo = async (req = request, res = response) => {
    const {user} = req

    if(!user) {
        const error = new Error('Object Empty')
        return res.status(400).json({msg: error.message})
    }

    try {
        const userId = await User.findByPk(user.userId)
        const userInfo = userId.toJSON()
        const {id, name, lastName, role} = userInfo

        res.status(200).json({userInfo: id, name, lastName, role})

    } catch (error) {
        const err = new Error('Error to get user')
        res.status(500).json({msg: err.message})
    }
}

const profile = (req = request, res = response) => {
    const {user} = req
    return res.status(200).json({user})
}

const adminProfile = (req = request, res = response) => {
    const {user} = req
    return res.status(200).json({user})
}

const getAllUsers = async(req = request, res = response) => {

    try {
        const users = await User.findAll({attributes: ['id', 'name', 'lastName', 'email']})
        const usersNumbers = await User.count()
        if(users.length === 0) {
            const error = new Error('There are no users')
            return res.status(400).json({msg: error.message})
        }
    
        res.status(200).json({quantityUsers: usersNumbers, users})
    } catch (error) {
        const err = new Error('Error to get all users')
        res.status(500).json({msg: err.message})
    }

}


export {
    registerUser,
    loginUser,
    confirmUser,
    forgotPasswordUser,
    forgotPasswordTokenUser,
    newPasswordUser,
    userInfo,
    profile,
    adminProfile,
    getAllUsers
}