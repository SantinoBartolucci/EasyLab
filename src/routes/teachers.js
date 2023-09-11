const { Router } = require('express');
const router = Router();

const { isLoggedIn, isAdmin } = require('../helpers/isLogged');
const { DateToYMD } = require('../helpers/dateToYMD');
const pool = require('../database');

router.get('/teacherDashboard', isLoggedIn, async (req, res) => {
	if (req.user[0].admin) {
		res.redirect('/adminDashboard');
	} else {
		const { name } = req.user[0];
		const tasks = await pool.query('SELECT * FROM tareas WHERE idProfesor=? ORDER BY date ASC', [req.user[0].id]);
		let data = [];

		for (task of tasks) {
			const nameResult = await pool.query('SELECT name FROM cursos WHERE id=?', [task.idCurso]);
			const resourceResult = [{ name: 'Pendiente' }];
			if (task.idRecurso != null) resourceResult = await pool.query('SELECT name FROM recursos WHERE id=?', [task.idRecurso]);

			data.push({
				id: task.id,
				name: nameResult[0].name,
				resource: resourceResult[0].name,
				date: task.date.toISOString().split('T')[0], // Formatea la fecha a AAAA-MM-DD
				time: task.start + ' - ' + task.end,
				state: task.state == 2 ? 'Pendiente' : task.state == 1 ? 'Aprobado' : 'Desaprobado',
			});
		}

		res.render('teachers/dashboard', { name, data });
	}
});

router.get('/deleteAct/:id', isLoggedIn, async (req, res) => {
	if (req.user[0].admin) {
		res.redirect('/adminDashboard');
	} else {
		await pool.query(`DELETE FROM tareas WHERE id=?`, [parseInt(req.params['id'])]);
		req.flash('success_msg', 'Actividad eliminada correctamente');
		res.redirect('/teacherDashboard');
	}
});

router.get('/activitieForm', isLoggedIn, async (req, res) => {
	if (req.user[0].admin) {
		res.redirect('/adminDashboard');
	} else {
		const { name } = req.user[0];
		const data = {
			cursos: JSON.parse(JSON.stringify(await pool.query('SELECT name FROM cursos'))).map((obj) => obj.name),
			resources: JSON.parse(JSON.stringify(await pool.query('SELECT type FROM recursos'))).map((obj) => obj.type),
			actualDate: DateToYMD(new Date()),
		};

		data.resources = [...new Set(data.resources)];
		for (let i = 0; i < data.resources.length; i++) {
			data.resources[i] = data.resources[i].charAt(0).toUpperCase() + data.resources[i].slice(1);
		}

		res.render('teachers/form', { name, data, layout: 'teacherForm' });
	}
});

router.post('/activitieForm', isLoggedIn, async (req, res) => {
	let { curso, type, date, start, end } = req.body;
	console.log(req.body);
	type = type.charAt(0).toLowerCase() + type.slice(1);
	idCurso = await pool.query('SELECT id FROM cursos WHERE name=?', [curso]);

	await pool.query('INSERT INTO tareas (type, date, start, end, state, idProfesor, idCurso) VALUES (?, ?, ?, ?, ?, ?, ?)', [
		type,
		date,
		start,
		end,
		2,
		req.user[0].id,
		idCurso[0].id,
	]);

	res.redirect('/teacherDashboard');
});

module.exports = router;
