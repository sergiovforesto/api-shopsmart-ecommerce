import express from "express"
const router = express.Router()

import { 
    registerUser,            confirmUser, 
    loginUser,               forgotPasswordUser, 
    forgotPasswordTokenUser, newPasswordUser,
    profile,                 userInfo,
    adminProfile,            getAllUsers
} from "../controller/userController.js"

import { isEmptyFields,   isEmailExist,} from "../middlewares/validateFields.js"
import {authetication} from "../middlewares/authetication.js"
import { isAdmin } from "../middlewares/isAdmin.js"

router.route('/').post([
    isEmptyFields, 
    isEmailExist
], registerUser)

router.route('/confirm/:token').get(confirmUser)
router.route('/login').post([
    isEmptyFields, 
], loginUser)

router.route('/forgot-password').post([
    isEmptyFields,
], forgotPasswordUser)

router.route('/forgot-password/:token').get(forgotPasswordTokenUser).post(newPasswordUser)

//private
router.get('/profile', [authetication], profile)

router.get('/info-user', [authetication], userInfo)

router.get('/admin', [
    authetication,
    isAdmin
], adminProfile)

router.get('/', [
    authetication,
    isAdmin
], getAllUsers)


export default router