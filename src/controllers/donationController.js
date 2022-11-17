const { BadRequestError, NotFoundError, UnauthorizedError, ForbiddenError, InternalServerError } = require('./utils/errors');

const { Project } = require('../models/projectModel');
const { Donation } = require('../models/donationModel');

const { CustomDate } = require('./utils/customClasses');

const { sendMail } = require('./utils/mailer');
const { asyncWrapper } = require('../middlewares/asyncWrapper');

const config = process.env
const paystack_pk = config.PAYSTACK_PUBLIC_KEY,
    sk = config.PAYSTACK_SECRET_KEY

const { Transaction } = require('../models/transactionModel')

const client = require('mongoose').connection

// Make donation
const makeDonation = asyncWrapper(async (req, res, next) => {
    const { amount } = req.body;
    const { _id } = req.bearer;
    const { id } = req.params;

    const { bearer } = req.body
    const email = bearer.email, user = bearer._id;

    const project = await Project.findById(id);

    if (!project) {
        return next(new NotFoundError(`Project with id ${id} not found`));
    }

    if (project.owner.toString() === _id.toString()) {
        return next(new ForbiddenError(`You cannot donate to your own project`));
    }

    const new_transaction = await Transaction.create({ user, email, amount: amount / 100 })

    return res.status(200).send({ message: "Pending", transaction: new_transaction, public_key: paystack_pk })
});

const confirmDonation = asyncWrapper(async (req, res, next) => {
    const { reference, bearer } = req.body;

    if (!reference) {
        return next(new BadRequestError(`Reference is required`));
    }

    const URL = `https://api.paystack.co/transaction/verify/${reference}`
    const transaction =
        await axios.get(URL, {
            headers: { 'Authorization': `Bearer ${config.PAYSTACK_SECRET_KEY}` }
        })
            .then(response => { return response.data },
                error => { return error.response })
            .catch(error => console.log(error))
    
    // Failed transaction
    if (!transaction.data.status) { throw new BadRequestError(transaction.data.message) }
    if (transaction.data.status != "success") {throw new BadRequestError("Transaction not successful")}

    // Checks if the transaction amount from payment service provider matches local record
    const existing_transaction = await Transaction.findOne({ user: bearer._id, ref: reference })
    if (existing_transaction.amount != (transaction.data.amount / 100)) {
        throw new BadRequestError('Transaction Amount does not tally with saved amount')
    }

    // Update transaction record
    const updated_transaction = await Transaction.findOneAndUpdate({ user: bearer._id, ref: reference }, { status: "success" }, { new: true })

    // Update project record
    const project = await Project.findById(updated_transaction.project)
    project.funds.current_amount += updated_transaction.amount

    // Update user record
    const user = await User.findById(updated_transaction.user)
    user.donations.push(updated_transaction._id)

    // Save records
    await project.save()
    await user.save()

    // Send email
    const mailOptions = {
        from: "GoFundMe <molunorichie@gmail.com>",
        to: updated_transaction.email,
        subject: "Donation Successful",
        html: `<h1>Donation Successful</h1>
        <p>Thank you for your donation of ${updated_transaction.amount} to ${project.title}</p>
        <p>Click <a href="${process.env.APP_URL}/projects/${project._id}">here</a> to view project</p>

        <p>Regards</p>
        <p>GoFundMe</p>`
    }

    await sendMail(mailOptions)

    return res.status(200).send({ message: "Donation successful", transaction: updated_transaction })
})

// Get project donations
const getProjectDonations = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        return next(new NotFoundError(`Project with id ${id} not found`));
    }

    const donations = await Donation.find
        .populate('donor')
        .populate('project')
        .where('project')
        .equals(id);

    res.status(200).json({
        success: true,
        data: donations
    });
});


module.exports = {
    makeDonation,
    confirmDonation,
    getProjectDonations,
};
