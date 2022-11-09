const config = require('../utils/config')
const asyncWrapper = require('./../utils/async_wrapper')
const { CustomAPIError } = require('./../utils/custom_errors')

const User = require('../models/user.models')

// CONTROLLERS 

const signin = asyncWrapper(async (req, res, next) => {
})

const login = asyncWrapper(async (req, res, next) => {
})

module.exports = {
    signin,
    login
}

