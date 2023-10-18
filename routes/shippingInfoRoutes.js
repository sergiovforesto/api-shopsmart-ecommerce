import express from "express"
const router = express.Router()

import { createShippingInfo, getShippingInfo, getAllShippingInfo, updateShippingInfo, deleteShippingInfo } from "../controller/shippingInfoController.js"
import { authetication } from "../middlewares/authetication.js"
import { isEmptyFields } from "../middlewares/validateFields.js"
// import { isAdmin } from "../middlewares/isAdmin.js"

router.route('/').get([
    authetication,
    // isAdmin
], getAllShippingInfo)

router.route('/information').get([
    authetication
], getShippingInfo)

router.route('/').post([
    isEmptyFields,
    authetication
], createShippingInfo)

router.route('/').put([
    isEmptyFields,
    authetication
], updateShippingInfo)

router.route('/').delete([
    authetication
], deleteShippingInfo)

export default router