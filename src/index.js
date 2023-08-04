const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

//Initializations
const app = express();
const PORT = 3000;

//Settings
app.set('port', process.env.PORT || PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine(
	'.hbs',
	engine({
		defaultLayout: 'main',
		layoutsDir: path.join(app.get('views'), 'layouts'),
		partialsDir: path.join(app.get('views'), 'partials'),
		extname: '.hbs',
		runtimeOptions: {
			allowProtoPropertiesByDefault: true,
			allowProtoMethodsByDefault: true,
		},
	})
);
app.set('view engine', '.hbs');

//Middlewars
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Global Variables

//Routes
app.use(require('./routes/index'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server Initialization
app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')} on http://localhost:${app.get('port')}`);
});
