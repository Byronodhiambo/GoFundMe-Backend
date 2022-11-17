const router = require('express').Router();

const { addProject, getProjects, getProject, updateProject, deleteProject } = require('../controllers/projectController');

const { basicAuth } = require('../middlewares/auth/auth');

router.route('/')
    .post(basicAuth, addProject)
    .get(basicAuth, getProjects);

router.route('/:id')
    .get(basicAuth, getProject)
    .put(basicAuth, updateProject)
    .delete(basicAuth, deleteProject);

module.exports = router;
