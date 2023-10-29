

const validateImg = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.img) {
        return res.status(400).json({msg: 'There not images to upload'});
    }

    next()
}

export {
    validateImg
}