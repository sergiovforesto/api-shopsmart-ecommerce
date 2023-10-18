import express from "express"
const router = express.Router()

import { getProduct, getAllProducts, createProduct, addCollectionToProduct, updateProduct, deleteProduct} from "../controller/productController.js"
import { authetication } from "../middlewares/authetication.js"
import { isEmptyFields } from "../middlewares/validateFields.js"
// import { isAdmin } from "../middlewares/isAdmin.js"

//public
router.route('/').get(getAllProducts)

router.route('/:id').get([
    authetication,
],getProduct)
router.route('/').post([
    isEmptyFields,
    authetication,
    // isAdmin
],createProduct)

router.route('/add-collection/:id').put([
    isEmptyFields,
    authetication,
    // isAdmin
],addCollectionToProduct)

router.route('/:id').put([
    authetication,
    // isAdmin
],updateProduct)

router.route('/:id').delete([
    authetication,
    // isAdmin
],deleteProduct)


export default router