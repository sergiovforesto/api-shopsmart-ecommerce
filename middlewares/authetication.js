import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'


const authetication = async (req, res, next) => {

    const headersRequest = req.headers.authorization
    if(!headersRequest || !headersRequest.startsWith('Bearer')) {
        const error =  new Error('Authentication Invalid')
        return res.status(500).json({msg: error.message})
    }

    const token = headersRequest.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userAuth = await User.findByPk(decoded.id)
        
        req.user = userAuth

        req.user = {userId: decoded.id}
        next()
    } catch (error) {
        const err = new Error('Failed Authentication')
        res.status(500).json({msg: err.message})
    }


}


export {
    authetication
}