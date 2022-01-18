const fieldValidation = {
    // Validate text length
    textLength: (value, min, max) => {
        if (value.length < min || value.length > max) {
            return false;
        }
        return true;
    },

    // Validate options length
    optionsLength: (value, maxLength) => {
        if (value.length > maxLength) {
            return false;
        }
        return true;
    },

    // Validate the field
    validate: (req, res, next) => {
        const { name, type, required, options } = req.body
        if (name && type && required) {
            next()
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'Please provide all the required fields'
            })
        }
    }
    
}