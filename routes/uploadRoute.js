import express from "express"
const router = express.Router()

import {validateImg} from '../middlewares/validateImg.js'
import {uploadImageCloundinary } from "../controller/uploadController.js"

router.route('/').post([
    validateImg
], uploadImageCloundinary)


export default router
