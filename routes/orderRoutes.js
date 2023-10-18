import express from "express"
const router = express.Router()

import { createOrder } from "../controller/orderController.js"
import { authetication } from "../middlewares/authetication.js"
import { isEmptyFields } from "../middlewares/validateFields.js"
// import { isAdmin } from "../middlewares/isAdmin.js"


router.route('/').post([
    authetication,
    isEmptyFields
], createOrder)

// router.route('/:id').get([
//     authetication,
// ], )

// router.route('/').get([
//     authetication,
// ], )


export default router