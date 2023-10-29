import { response, request } from "express"
// import ImageUrl from "../models/ImageModel.js"
import uploadFile from "../helper/uploadFile.js"

import { v2 as cloudinary } from 'cloudinary'
cloudinary.config(process.env.CLOUDINARY_URL)


//local
const uploadImage = async (req = request, res = response) => {

    try {

        const pathFile = await uploadFile(req.files)
        //crea la carpeta imgs auto, porque en server tienes la ultima opcion en true
        // const pathFile = await uploadFile(req.files, undefined, 'imgs')
        
        res.json({
            name: pathFile
        })
    } catch (error) {
        res.status(500).json({error})
    }

    
}

const uploadImageCloundinary = async(req = request, res = response) => {

    try {

        const {tempFilePath} = req.files.img
        const imgClod = await cloudinary.uploader.upload(tempFilePath, {folder: 'products'})
        
        const {secure_url} = imgClod
    
        res.status(200).json({link: secure_url})
    } catch (error) {
        res.status(500).json({msg: 'Error to upload image to the cloud'})
    }
}

// const deleteImageCloundinary = async(req = request, res = response) => {
//     try {
        
//     } catch (error) {
        
//     }
// }

export {
    uploadImageCloundinary
}