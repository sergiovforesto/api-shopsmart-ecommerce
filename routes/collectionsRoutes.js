import express from "express"
const router = express.Router()

import { createCollection, getCollections, getCollection, updateCollection, deleteCollection } from "../controller/collectionController.js"
import { authetication } from "../middlewares/authetication.js"
import { isEmptyFields } from "../middlewares/validateFields.js"
import { isAdmin } from "../middlewares/isAdmin.js"

router.route('/').get([
    authetication,
    isAdmin
], getCollections)

router.route('/:id').get([
    authetication,
    isAdmin
], getCollection)

router.route('/').post([
    isEmptyFields,
    authetication,
    isAdmin
], createCollection)

router.route('/:id').put([
    isEmptyFields,
    authetication,
    isAdmin
], updateCollection)

router.route('/:id').delete([
    authetication
], deleteCollection)

export default router
