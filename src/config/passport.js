const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helper = require('../helpers/bcrypt');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await pool.query('select * from usuarios where id=?', [id]);
	done(null, user);
});

passport.use(
	'local.signin',
	new LocalStrategy(
		{
			usernameField: 'name',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async (req, name, password, done) => {
			const userFound = await pool.query('select * from usuarios where name=?', [name]);
			if (userFound.length > 0) {
				const user = userFound[0];
				if (await helper.comparePassword(password, user.password)) {
					done(null, user);
				} else {
					done(null, false, req.flash('error_msg', 'Contraseña Incorrecta'));
				}
			} else {
				done(null, false, req.flash('error_msg', 'No se encontro el usuario'));
			}
		}
	)
);
