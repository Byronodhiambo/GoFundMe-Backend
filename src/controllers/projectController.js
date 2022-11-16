const { BadRequestError, NotFoundError, UnauthorizedError, ForbiddenError, InternalServerError } = require('./utils/errors');

const { Project } = require('../models/projectModel');
const { Donation } = require('../models/donationModel');

const { CustomDate } = require('./utils/customClasses');

const { sendMail } = require('./utils/mailer');
const { asyncWrapper } = require('../middlewares/asyncWrapper');



// Add project
const addProject = asyncWrapper(async (req, res, next) => {
    const { title, description, category, location, target_amount, image } = req.body;
    const { _id } = req.bearer;

    const project = new Project({
        title,
        description,
        category,
        location,
        funds: {
            target_amount
        },
        image,
        owner: _id
    });

    await project.save();

    res.status(201).json({
        success: true,
        data: project
    });
});

// Update project
const updateProject = asyncWrapper(async (req, res, next) => {
    const { title, description, category, location, target_amount, image } = req.body;
    const { _id } = req.bearer;
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        return next(new NotFoundError(`Project with id ${id} not found`));
    }

    if (project.owner.toString() !== _id.toString()) {
        return next(new UnauthorizedError(`You are not authorized to update this project`));
    }

    project.title = title;
    project.description = description;
    project.category = category;
    project.location = location;
    project.funds.target_amount = target_amount;

    if (image) {
        project.image = image;
    }

    await project.save();

    res.status(200).json({
        success: true,
        data: project
    });
});

// Cancel project
const cancelProject = asyncWrapper(async (req, res, next) => {
    const { _id } = req.bearer;
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        return next(new NotFoundError(`Project with id ${id} not found`));
    }

    if (project.owner.toString() !== _id.toString()) {
        return next(new UnauthorizedError(`You are not authorized to delete this project`));
    }

    await project.updateOne({ status: 'Cancelled' });

    res.status(200).json({
        success: true,
        data: project
    });
});

// Get project
const getProject = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        return next(new NotFoundError(`Project with id ${id} not found`));
    }

    res.status(200).json({
        success: true,
        data: project
    });
});

module.exports = {
    addProject,
    updateProject,
    cancelProject,
    getProject
};



