import express from "express"
const router = express.Router()

import { createFeature, updateFeature, deleteFeature } from "../controller/featureController.js"
import { authetication } from "../middlewares/authetication.js"
import { isEmptyFields } from "../middlewares/validateFields.js"
// import { isAdmin } from "../middlewares/isAdmin.js"

//TODOD = Tengo que ver si quito crear, esto ya en el diseño, quitar el /:id de POST
router.route('/create/:id').post([
    isEmptyFields,
    authetication,
    // isAdmin
], createFeature)

router.route('/update/:id').put([
    isEmptyFields,
    authetication,
    // isAdmin
], updateFeature)

router.route('/delete/:id').delete([
    authetication,
    // isAdmin
], deleteFeature)


export default router