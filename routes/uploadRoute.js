import express from "express"
const router = express.Router()

import { authetication } from "../middlewares/authetication.js"
import {uploadImage, getImage, updateImage } from "../controller/uploadController.js"

router.route('/').post([
    authetication
], uploadImage)

router.route('/:id').get(getImage)

router.route('/:id').put(updateImage)


export default router
