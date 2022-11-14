const config = require('../utils/config')
const asyncWrapper = require('./../utils/async_wrapper')
const { CustomAPIError, BadRequestError } = require('./../utils/custom_errors')
const { getAuthCodes, getAuthTokens } = require('./utils/getAuthCredentials')

const User = require('../models/user.models')

// CONTROLLERS 
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

const signup = asyncWrapper(async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body

    if (!first_name || !last_name || !email || !password) {
        throw new BadRequestError('Please fill in all fields')
    } else if (!validateEmail(email)) {
        throw new BadRequestError('Please enter a valid email address')
    }

    const existing_user = await User.findOne({ where: { email } })
    let verification_code, curr_user_email, curr_user_id;

    // No existing user, create new user
    if (!existing_user) {
        const user = await User.create({ firstName, lastName, email, password, phone, country, ipi })
        verification_code = (await getAuthCodes(user.id, 'verification')).verification_code
        curr_user_email, curr_user_id = user.email, user.id
    }

    // User already exists, but email, unverified
    if (!existing_user.isVerified) {
        verification_code = (await getAuthCodes(existing_user.id, 'verification')).verification_code
        curr_user_email, curr_user_id = existing_user.email.existing_user.i
    }

    sendEmail({
        email: user_email,
        subject: "Email verification",
        message: `This is your account verification code ${verification_code}`
    })

    const { access_token } = await getAuthTokens(curr_user_id)

    return res.status(201).send({
        message: "Successful, Email verification code sent to users email",
        access_token
    })
})

const login = asyncWrapper(async (req, res, next) => {
})

module.exports = {
    signup,
    login
}

