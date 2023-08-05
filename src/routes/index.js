const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/login', (req, res) => {
	res.send('Login');
});

module.exports = router;
