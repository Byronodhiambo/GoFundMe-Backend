
const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler")
const { basicAuth } = require("./middlewares/auth/auth")
const cors = require('cors')
const app = express();


// Middlewares
// app.use(morgan("dev"), { stream: rfsStream })
if (process.env.NODE_ENV != "test") { app.use(morgan('dev')) }
app.use(express.json())


app.use(cors())

const authRoute = require('./routes/authRoutes'),
    userRoute = require('./routes/userRoutes'),
    superAdminAuthRoute = require('./routes/superAdminAuthRoutes');
const { NotFoundError } = require("./middlewares/customError");

// Auth 
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/auth/superadmin', superAdminAuthRoute)

// Post-login
app.use('/api/v1/auth/user', basicAuth, userRoute)
// app.use('/api/v1/admin', basicAuth, adminRoute)
app.use(errorHandler)
app.use('/', (req, res, next) => {
    res.status(404).send({ message: "Not found" })
})


module.exports = app;