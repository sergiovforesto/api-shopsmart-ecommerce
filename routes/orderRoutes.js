import express from "express"
const router = express.Router()

import { createOrder, getOrderUser, getAllOrders, getOrderNumber, updateDelivery, getMyOrders, getMyOrder } from "../controller/orderController.js"
import { authetication } from "../middlewares/authetication.js"
import { isEmptyFields } from "../middlewares/validateFields.js"
import { isAdmin } from "../middlewares/isAdmin.js"


router.route('/').post([
    isEmptyFields,
    authetication,
], createOrder)

router.route('/').get([
    authetication,
], getOrderUser)

router.route('/my-orders').get([
    authetication,
], getMyOrders)

router.route('/my-orders/:orderNumber').get([
    authetication,
], getMyOrder)

router.route('/admin').get([
    authetication,
    isAdmin
], getAllOrders)

router.route('/admin/:orderNumber').get([
    authetication,
    isAdmin
], getOrderNumber)


router.route('/admin/update/:orderNumber').put([
    isEmptyFields,
    authetication,
    isAdmin
], updateDelivery)



export default router