const jwt = require('jsonwebtoken');
const { Token } = require('../../models/tokenModel');
const { decodeJWT } = require('./jwt_handler');
const config = require('./config');

// --- HELPERS
const getAuthTokens = async (user_id) => {
    try {
        const currUser = await Token.findOne({ user: user_id }).populate(
            'user'
        );
        // console.log(currUser)
        if (!currUser) {
            throw 'User does not exist';
        }
        const data = {
            _id: currUser.user._id,
            email: currUser.user.email,
            role: currUser.user.role,
            reset_token: currUser.password_reset
        };

        const access_token = jwt.sign(data, config.JWT_SECRET_ACCESS, {
                expiresIn: config.JWT_ACCESS_EXP
            }),
            refresh_token = jwt.sign(data, config.JWT_SECRET_REFRESH, {
                expiresIn: config.JWT_REFRESH_EXP
            });

        return { refresh_token, access_token };
    } catch (error) {
        throw error;
    }
};

const getAuthCodes = async (user_id, code_type) => {
    try {
        let random_code = `${Math.floor(100000 + Math.random() * 900000)}`;
        let verification_code, password_reset_code;

        if (code_type == 'verification') {
            verification_code = random_code

            await Token.update({ verification_code }, {
                where: {
                    userId: user_id
                }
            })
        }

        if (code_type == 'password_reset') {
            password_reset_code = random_code

            await Token.update({ password_reset_code }, {
                where: {
                    userId: user_id
                }
            })
        }

        return { verification_code, password_reset_code }
    } catch (error) {
        throw error
    }
}

module.exports = { getAuthTokens, getAuthCodes };
