

const { check } = require("express-validator");
const { transValidation } = require("../lang/vi");

let register = [
    check("email", transValidation.EMAIL_INCORRECT).trim().isEmail(),
    check("password", transValidation.PASSWORD_INCORRECT).isLength({min: 6}),
    check("password_confirm", transValidation.PASSWORD_CONFIRMATION_INCORRECT).custom((val, {req}) => {
        return val === req.body.password
    }),
    check("age", transValidation.AGE_INCORRECT).matches(/^[0-9]+$/)
]

module.exports = {
    register
}
