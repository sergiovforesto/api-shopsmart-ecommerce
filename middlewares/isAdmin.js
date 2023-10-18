import User from "../models/userModel.js"

const isAdmin = async (req, res, next) => { 
    if(!req.user ) {
        return res.status(500).json({
            msg: 'Should be to verify your user'
        })
    }

    const {userId} = req.user

    const admin = await User.findByPk(userId)
    if(admin.role !== 'admin') {
        const error = new Error(`User: ${admin.name} ${admin.lastName} is not an administrator`)
        return res.status(500).json({msg: error.message})
    }

    next()
}

export { 
    isAdmin
}