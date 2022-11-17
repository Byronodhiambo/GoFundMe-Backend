const router = require('express').Router();

const { makeDonation,
    confirmDonation,
    getProjectDonations } = require('../controllers/donationController');

const { basicAuth } = require('../middlewares/auth/auth');

router.route('/:id')
    .post(basicAuth, makeDonation)
    .get(basicAuth, getProjectDonations);

router.route('/confirm')
    .post(basicAuth, confirmDonation);

module.exports = router;
