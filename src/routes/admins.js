const { Router } = require('express');
const router = Router();

const { isAdmin } = require('../helpers/isLogged');
const pool = require('../database');

router.get('/adminDashboard', isAdmin, (req, res) => {
	res.render('admins/content/gestion', { layout: 'admin' });
});

router.get('/gestion', isAdmin, (req, res) => {
	res.render('admins/content/gestion', { layout: false });
});

router.get('/cursos', isAdmin, (req, res) => {
	res.render('admins/content/cursos', { layout: false });
});

router.get('/recursos', isAdmin, (req, res) => {
	res.render('admins/content/recursos', { layout: false });
});

router.get('/usuarios', isAdmin, (req, res) => {
	res.render('admins/content/usuarios', { layout: false });
});

module.exports = router;
