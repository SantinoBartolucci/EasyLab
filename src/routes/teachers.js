const { Router } = require('express');
const router = Router();

const { isLoggedIn, isAdmin } = require('../helpers/isLogged');

router.get('/teacherDashboard', isLoggedIn, (req, res) => {
	const { name } = req.user[0];
	const notAdmin = req.user[0].admin == 1 ? 0 : 1;
	res.render('teachers/dashboard', { name, notAdmin });
});

router.get('/adminDashboard', isAdmin, (req, res) => {
	const { name } = req.user[0];
	const notAdmin = req.user[0].admin == 1 ? 0 : 1;
	res.render('admins/dashboard', { name, notAdmin });
});

module.exports = router;
