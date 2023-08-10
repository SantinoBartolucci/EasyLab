const { Router } = require('express');
const router = Router();

const passport = require('passport');
const { isLoggedIn } = require('../helpers/isLogged');

router.get('/login', (req, res) => {
	if (req.user) {
		res.redirect(req.user[0].admin ? '/adminDashboard' : '/teacherDashboard');
	} else {
		res.render('login', { layout: 'login' });
	}
});

router.post(
	'/login',
	passport.authenticate('local.signin', {
		failureRedirect: '/login',
		failureFlash: true,
	}),
	(req, res) => {
		res.redirect(req.user.admin ? '/adminDashboard' : '/teacherDashboard');
	}
);

router.get('/logOut', isLoggedIn, (req, res) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});

module.exports = router;
