import { v4 as uuidv4 } from 'uuid'

const generateUUID = () => {
    const id = uuidv4()
    return id
}

export default generateUUID