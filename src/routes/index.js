const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
	if (req.user && req.user[0].admin) {
		res.redirect('/admindashboard');
	} else {
		let name = null;
		if (req.user) {
			name = req.user[0].name;
		}
		res.render('index', { name });
	}
});

module.exports = router;
