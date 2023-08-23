const { Router } = require('express');
const router = Router();

const { isLoggedIn, isAdmin } = require('../helpers/isLogged');
const pool = require('../database');

router.get('/teacherDashboard', isLoggedIn, async (req, res) => {
	if (req.user[0].admin) {
		res.redirect('/adminDashboard');
	} else {
		const { name } = req.user[0];
		const tasks = await pool.query('SELECT * FROM tareas WHERE idProfesor=? ORDER BY date ASC', [req.user[0].id]);
		let data = [];

		for (task of tasks) {
			const nameResult = await pool.query('SELECT curso FROM cursos WHERE id=?', [task.idCurso]);
			const resourceResult = await pool.query('SELECT name FROM recursos WHERE id=?', [task.idRecurso]);

			data.push({
				id: task.id,
				name: nameResult[0].curso,
				resource: resourceResult[0].name,
				date: task.date.toISOString().split('T')[0], // Formatea la fecha a AAAA-MM-DD
				time: task.start + ' - ' + task.end,
				state: task.state == 2 ? 'En progreso' : task.state == 1 ? 'Aprobado' : 'Desaprobado',
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

router.get('/activitieForm', isLoggedIn, (req, res) => {
	if (req.user[0].admin) {
		res.redirect('/adminDashboard');
	} else {
		const { name } = req.user[0];
		res.render('teachers/form', { name });
	}
});

router.post('/activitieForm', isLoggedIn, async (req, res) => {
	//?? Validate all data
	//?? Create its corresponding Activitie
});

router.get('/adminDashboard', isAdmin, (req, res) => {
	res.render('admins/dashboard', { layout: 'admin' });
});

module.exports = router;
