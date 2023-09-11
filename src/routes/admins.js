const { Router } = require('express');
const router = Router();

const { isAdmin } = require('../helpers/isLogged');
const pool = require('../database');

router.get('/adminDashboard', isAdmin, (req, res) => {
	res.render('admins/dashboard', { layout: 'admin' });
});

module.exports = router;
