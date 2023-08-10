const { Router } = require('express');
const router = Router();

const { isLoggedIn, isAdmin } = require('../helpers/isLogged');

router.get('/teacherDashboard', isLoggedIn, (req, res) => {
	if (req.user[0].admin) {
		res.redirect('/adminDashboard');
	} else {
		const { name } = req.user[0];
		res.render('teachers/dashboard', { name });
	}
});

router.get('/adminDashboard', isAdmin, (req, res) => {
	res.render('admins/dashboard', { layout: 'admin' });
});

module.exports = router;
