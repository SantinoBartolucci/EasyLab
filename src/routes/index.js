const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
	let name = null;
	let notAdmin = 1;
	if (req.user) {
		name = req.user[0].name;
		notAdmin = req.user[0].admin == 1 ? 0 : 1;
	}
	res.render('index', { name, notAdmin });
});

module.exports = router;

// TODO:  evitar que admin salga de su dashboard
