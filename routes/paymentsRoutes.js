import express from "express"
const router = express.Router()

import { createPayment, getPayment, updatePayment, deletePayment } from "../controller/paymentController.js"
import { isEmptyFields } from "../middlewares/validateFields.js"
import { authetication } from "../middlewares/authetication.js"

router.route('/').post([
    isEmptyFields,
    authetication,
], createPayment)

router.route('/').get([
    authetication,
], getPayment)

router.route('/').put([
    isEmptyFields,
    authetication
], updatePayment)

router.route('/').delete([
    authetication
], deletePayment)

export default router