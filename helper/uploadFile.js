import { fileURLToPath } from 'url'
import path from 'path'
import generateUUID from '../helper/generateUUI.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



const uploadFile = (files, validExtension = ['webp', 'png', 'jpg', 'jpeg', 'avif'], folder = '') => {

    return new Promise((resolve, reject) => {

        const {img} = files; //=== req.file
        const cutName = img.name.split('.')
        const extension = cutName[cutName.length - 1]
    
        //validar extensiones
        // const validExtension = ['webp', 'png', 'jpg', 'jpeg', 'avif']//antes aqui
        if(!validExtension.includes(extension)) {
            //lo cambiamos al reject, ya que, res y req estan en el controlador
            return reject(`La extension: ${extension} no es permitida ${validExtension}`)
            
        }
    
        const tempName = generateUUID() + '.' + extension
        //donde quieres colocar ese archivo
        const uploadPath = path.join(__dirname, '../uploads/', folder,  tempName);
    
        //movemos la img a la ruta convinada de arriba
        img.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }
    
            resolve(tempName)
        });
    })

}






export default uploadFile