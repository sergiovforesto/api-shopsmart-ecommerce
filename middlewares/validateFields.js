import User from "../models/userModel.js"


const isEmptyFields = (req, res, next) => {
    const {...rest} = req.body
    
    if(Object.values(rest).includes('')) {
        const error = new Error('All fields are required')
        return res.status(400).json({msg: error.message})
    }

    next()
}



const isEmailExist = async (req, res, next) => {
    const {email} = req.body

    const userExist = await User.findOne({where: {email: email}})

    if(userExist) {
        const error = new Error('This email exist')
        return res.status(409).json({msg: error.message})
    }

    next()
}




export {
    isEmptyFields,
    isEmailExist,
    
}


