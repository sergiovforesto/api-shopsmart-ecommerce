import express from "express"
const router = express.Router()

import { createFeature, updateFeature, deleteFeature } from "../controller/featureController.js"
import { isEmptyFields } from "../middlewares/validateFields.js"
import { authetication } from "../middlewares/authetication.js"
import { isAdmin } from "../middlewares/isAdmin.js"


router.route('/create/:id').post([
    isEmptyFields,
    authetication,
    isAdmin
], createFeature)


router.route('/update/:id').put([
    authetication,
    isAdmin
], updateFeature)

router.route('/delete/:id').delete([
    isEmptyFields,
    authetication,
    isAdmin
], deleteFeature)


export default router