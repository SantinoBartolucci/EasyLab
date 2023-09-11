module.exports = {
	isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else res.redirect('/login');
	},

	isAdmin(req, res, next) {
		if (req.isAuthenticated() && req.user[0].admin) return next();

		res.redirect(req.user ? '/teacherDashboard' : '/login');
	},
};
