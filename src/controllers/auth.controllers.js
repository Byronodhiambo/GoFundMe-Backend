const config = require('../utils/config')
const asyncWrapper = require('./../utils/async_wrapper')
const { CustomAPIError } = require('./../utils/custom_errors')

const User = require('../models/user.models')

// CONTROLLERS 
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

const signin = asyncWrapper(async (req, res, next) => {
})

const login = asyncWrapper(async (req, res, next) => {
})

module.exports = {
    signin,
    login
}

