import express from "express"
const router = express.Router()

import { getProduct, getAllProductStatic, createProduct, addCollectionToProduct, updateProduct, deleteProduct} from "../controller/productController.js"
import { isEmptyFields } from "../middlewares/validateFields.js"
import { isAdmin } from "../middlewares/isAdmin.js"
import { authetication } from "../middlewares/authetication.js"

//public
router.route('/').get(getAllProductStatic)

router.route('/:id').get(getProduct)

router.route('/').post([
    isEmptyFields,
    authetication,
    isAdmin
],createProduct)

router.route('/add-collection/:id').put([
    isEmptyFields,
    authetication,
    isAdmin
],addCollectionToProduct)

router.route('/:id').put([
    authetication,
    isAdmin
],updateProduct)

router.route('/:id').delete([
    authetication,
    isAdmin
],deleteProduct)


export default router