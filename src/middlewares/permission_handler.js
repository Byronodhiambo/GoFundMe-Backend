const asyncWrapper = require("../utils/async_wrapper");
const { UnauthorizedError } = require("../utils/custom_errors");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");

// USAGE
/*
    const permit = require('./permission_handler    ')

    // pass a string of allowed roles to the permission hanlder, 
    // each role should be seperated with a space

    // Express route
    router
        .post('/your/route/path/', permit('allowed_role1 allowed_role2'), (req, res, next) => {})
*/
module.exports = function (roles) {
    return asyncWrapper(async (req, res, next) => {
        const allowed_roles = roles.split(" ");

        const token = req.cookies.access_token;
        if (!token) {
            throw new UnauthorizedError("Authentication required");
        }

        const data = jwt.verify(token, config.JWT_SECRET);
        req.user = { id: data.id, role: data.role };

        if (!allowed_roles.includes(payload.role)) {
            throw new UnauthorizedError("Unauthorized access");
        }

        next();
    });
};
