const { body, validationResult } = require('express-validator');

async function validateResult(req, res, next) {
    // CHANGE THIS LINE: use validationResult (from the library), not validateResult (the function name)
    const error = validationResult(req); 
    
    if (!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array() // Standard practice is to use 'errors' plural
        });
    }
    next();
}

const registerUserValidationRules = [
    body("username")
        .isString()
        .withMessage("username must be a string")
        .isLength({ min: 3, max: 20 })
        .withMessage("username must be between 3 and 20 characters"),

    body("email")
        .isEmail()
        .withMessage("invalid email address"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters long"),
        
    validateResult // This is your custom middleware at the end of the array
];

module.exports = { registerUserValidationRules };