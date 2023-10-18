import express from "express"
const router = express.Router()

import { createCollection, getCollections, getCollection, updateCollection, deleteCollection } from "../controller/collectionController.js"
import { authetication } from "../middlewares/authetication.js"
import { isEmptyFields } from "../middlewares/validateFields.js"

router.route('/').get([
    authetication
], getCollections)

router.route('/:id').get([
    authetication
], getCollection)

router.route('/').post([
    isEmptyFields,
    authetication
], createCollection)

router.route('/:id').put([
    isEmptyFields,
    authetication
], updateCollection)

router.route('/:id').delete([
    authetication
], deleteCollection)

export default router
