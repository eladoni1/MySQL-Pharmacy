import { check } from "express-validator";

let validateRegister = [
    check("email","Invalid email").isEmail().trim(),
    check("password", "Invalid password. Password must be at least 2 chars long").isLength({min: 2}),
    check("passwordConfirmation", "Password confirmation does not match password").custom((value,{req}) => {
        return value === req.body.password
    }),
    check("birthDate", "Invalid birth date").isBefore(),
    check("firstName", "First name should include only letters. use space instead of - ").isAlpha('en-US', {ignore: ' '}),
    check("lastName", "Last name should include only letters. use space instead of - ").isAlpha('en-US', {ignore: ' '}),
    check("userId", "Invalid Identification number. Use a legitimized ID").isLength({min: 9, max: 9}),
    check("phone", "Invalid phone number").isMobilePhone(),
    check("gender", "Please select a gender").notEmpty()
];

let validateLogin = [
    check("userId", "Invalid Identification number. Use a legitimized ID").isLength({min: 9, max: 9}),

    check("password", "Invalid password")
    .not().isEmpty()
];

module.exports = {
    validateRegister: validateRegister,
    validateLogin: validateLogin
};
