import jwt from 'jsonwebtoken'

const generateJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
}

export default generateJWT