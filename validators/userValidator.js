const joi = require("joi")

const validateUser = (userData) => {
    const schema = joi.object({
        fullname: joi.string()
            .min(3)
            .required()
            .messages({
                "string.base": "Fullname should be a type of 'text'",
                "string.empty": "Fullname cannot be an empty field",
                "string.min": "Fullname should have at least 3 characters",
                "any.required": "Fullname is a required",
            }),
        email: joi.string()
            .email()
            .required()
            .messages({
                "string.email": "Please enter a valid email",
                "string.empty": "Email cannot be an empty field",
                "any.required": "Email is a required",
            }),
        password: joi.string()
            .min(6)
            .required()
            .messages({
                "string.empty": "Password cannot be an empty field",
                "string.min": "Password should have at least 6 characters",
                "any.required": "Password is a required",
            }),
    });

    return schema.validate(userData, { abortEarly: false });
};

module.exports = { validateUser };