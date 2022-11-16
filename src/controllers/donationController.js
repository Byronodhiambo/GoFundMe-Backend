const { BadRequestError, NotFoundError, UnauthorizedError, ForbiddenError, InternalServerError } = require('./utils/errors');

const { Project } = require('../models/projectModel');
const { Donation } = require('../models/donationModel');

const { CustomDate } = require('./utils/customClasses');

const { sendMail } = require('./utils/mailer');
const { asyncWrapper } = require('../middlewares/asyncWrapper');

// Make donation
const makeDonation = asyncWrapper(async (req, res, next) => {
    const { amount } = req.body;
    const { _id } = req.bearer;
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        return next(new NotFoundError(`Project with id ${id} not found`));
    }

    if (project.owner.toString() === _id.toString()) {
        return next(new ForbiddenError(`You cannot donate to your own project`));
    }

    const donation = new Donation({
        amount,
        donor: _id,
        project: id
    });

    await donation.save();

    project.funds.current_amount += amount;
    project.donors.push(_id);

    await project.save();

    res.status(201).json({
        success: true,
        data: donation
    });
});

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
    getProjectDonations
};
