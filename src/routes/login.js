const { Router } = require('express');
const router = Router();

const passport = require('passport');
const { isLoggedIn } = require('../helpers/isLogged');

router.get('/login', (req, res) => {
	res.render('login', { layout: 'login' });
});

router.post(
	'/login',
	passport.authenticate('local.signin', {
		successRedirect: '/getAdmin',
		failureRedirect: '/login',
		failureFlash: true,
	})
);

router.get('/getAdmin', isLoggedIn, (req, res) => {
	//* Si el campo "Admin" del usuario es true, redirect to Admin Dashboard
	//* Si el campo "Admin" del usuario es false, redirect to Profesor Dashboard
});

router.get('/logOut', isLoggedIn, (req, res) => {
	req.logOut();
	res.redirect('/');
});

module.exports = router;
