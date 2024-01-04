import { response, request } from "express"
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import uploadFile from "../helper/uploadFile.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



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



const getImage = async (req = request, res = response) => {
    const {id} = req.params

    try {
        
        const imagePath = path.join(__dirname, '../uploads', id)
    
        if(fs.existsSync(imagePath)) {
            return res.sendFile(imagePath)
        }


    } catch (error) {
        res.status(500).json({msg: 'Error to get image'})
    }

}

const updateImage = async (req = request, res = response) => {
    const {id} = req.params

    try {
        
        const imagePath = path.join(__dirname, '../uploads', id)
    
        if(fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath)
        }

        const newImage = await uploadFile(req.files)
        
        res.status(201).json({newImage})


    } catch (error) {
        res.status(500).json({msg: 'Error to get image'})
    }

}


export {
    uploadImage,
    getImage,
    updateImage
}