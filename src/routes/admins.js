const { Router } = require('express');
const router = Router();

const { isAdmin } = require('../helpers/isLogged');
const pool = require('../database');
const helper = require('../helpers/bcrypt');

router.get('/adminDashboard', isAdmin, (req, res) => {
	res.render('admins/content/gestion', { layout: 'admin' });
});

router.get('/gestion', isAdmin, (req, res) => {
	res.render('admins/content/gestion', { layout: false });
});

//#region //** Resources Routes */
router.get('/recursos', isAdmin, async (req, res) => {
	let result = await pool.query('SELECT id, name, type, alumnosMax FROM recursos');
	let resourcesData = [];

	for (item of result) {
		resourcesData.push({
			id: item.id,
			name: item.name,
			type: item.type,
			max: item.alumnosMax,
		});
	}

	res.render('admins/content/recursos', { layout: false, resources: resourcesData });
});

router.get('/delResource/:id', isAdmin, async (req, res) => {
	await pool.query('DELETE FROM recursos WHERE id=?', [parseInt(req.params['id'])]);
	res.status(200).send('');
});

router.get('/resourceData/:id', isAdmin, async (req, res) => {
	const resourceData = await pool.query('SELECT * FROM recursos WHERE id=?', [parseInt(req.params['id'])]);
	res.status(200).send(resourceData);
});

router.post('/editResource/:id', isAdmin, async (req, res) => {
	const id = [parseInt(req.params['id'])];
	let { name, type, max } = req.body;

	await pool.query('UPDATE recursos SET type=?, name=?, alumnosMax=? WHERE id=?', [type, name, max, id]);

	res.status(200).send('');
});

router.post('/createResource/', isAdmin, async (req, res) => {
	let { name, type, max } = req.body;

	await pool.query('INSERT INTO recursos (type, name, alumnosMax) VALUES(?, ?, ?)', [type, name, max]);

	res.status(200).send('');
});
//#endregion

//#region //** Users Routes */
router.get('/usuarios', isAdmin, async (req, res) => {
	let result = await pool.query('SELECT id, name, admin FROM usuarios');
	let usersData = [];

	for (item of result) {
		if (item.id === req.user[0].id) continue;

		usersData.push({
			id: item.id,
			name: item.name,
			admin: item.admin ? 'Si' : 'No',
		});
	}

	res.render('admins/content/usuarios', { layout: false, users: usersData });
});

router.get('/delUser/:id', isAdmin, async (req, res) => {
	await pool.query('DELETE FROM usuarios WHERE id=?', [parseInt(req.params['id'])]);
	res.status(200).send('');
});

router.get('/usrData/:id', isAdmin, async (req, res) => {
	const usrData = await pool.query('SELECT name, admin FROM usuarios WHERE id=?', [parseInt(req.params['id'])]);
	res.status(200).send(usrData);
});

router.post('/editUser/:id', isAdmin, async (req, res) => {
	const id = [parseInt(req.params['id'])];
	let { name, password, admin } = req.body;

	password = await helper.encryptPassword(password);
	let beAdmin = admin === 'true' ? 1 : 0;

	await pool.query('UPDATE usuarios SET name=?, password=?, admin=? WHERE id=?', [name, password, beAdmin, id]);

	res.status(200).send('');
});

router.post('/createUser/', isAdmin, async (req, res) => {
	let { name, password, admin } = req.body;

	password = await helper.encryptPassword(password);
	let beAdmin = admin === 'true' ? 1 : 0;

	await pool.query('INSERT INTO usuarios (name, password, admin) VALUES(?, ?, ?)', [name, password, beAdmin]);

	res.status(200).send('');
});
//#endregion

//#region //** Cursos Routes */
router.get('/cursos', isAdmin, async (req, res) => {
	let result = await pool.query('SELECT id, name, cantAlumnos, tecnico FROM cursos');
	let cursosData = [];

	for (item of result) {
		cursosData.push({
			id: item.id,
			name: item.name,
			alumnos: item.cantAlumnos,
			tecnico: item.tecnico ? 'Si' : 'No',
		});
	}

	res.render('admins/content/cursos', { layout: false, cursos: cursosData });
});

router.get('/delCurso/:id', isAdmin, async (req, res) => {
	await pool.query('DELETE FROM cursos WHERE id=?', [parseInt(req.params['id'])]);
	res.status(200).send('');
});

router.get('/cursoData/:id', isAdmin, async (req, res) => {
	const cursoData = await pool.query('SELECT name, cantAlumnos, tecnico FROM cursos WHERE id=?', [parseInt(req.params['id'])]);
	res.status(200).send(cursoData);
});

router.post('/editCurso/:id', isAdmin, async (req, res) => {
	const id = [parseInt(req.params['id'])];
	let { name, alumnos, tecnico } = req.body;

	let beTecnico = tecnico === 'true' ? 1 : 0;

	await pool.query('UPDATE cursos SET name=?, cantAlumnos=?, tecnico=? WHERE id=?', [name, alumnos, beTecnico, id]);

	res.status(200).send('');
});

router.post('/createCurso/', isAdmin, async (req, res) => {
	let { name, alumnos, tecnico } = req.body;

	let beTecnico = tecnico === 'true' ? 1 : 0;

	await pool.query('INSERT INTO cursos (name, cantAlumnos, tecnico) VALUES(?, ?, ?)', [name, alumnos, beTecnico]);

	res.status(200).send('');
});
//#endregion

module.exports = router;
