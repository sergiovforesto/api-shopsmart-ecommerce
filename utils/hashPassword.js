import bcrypt from 'bcrypt'

const hashPassword = (password) => {
    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return hash
}

const checkPassword = async (password, passwordDB) => {
    return await bcrypt.compareSync(password, passwordDB)
}



export {
    hashPassword,
    checkPassword

}

