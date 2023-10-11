let actualSession = '/gestion';
//TODO: Get the url when reloading so we reload in that section

//** AJAX HANDLER */
const LoadContent = (url, change) => {
	if (url === actualSession && !change) return;

	let xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			document.getElementById('content').innerHTML = xhr.responseText;
			actualSession = url;
		}
	};
	xhr.send();
};

//** SETUP HANDLER */
document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('gestion-link').addEventListener('click', (e) => {
		e.preventDefault();
		LoadContent('/gestion', false);
	});

	document.getElementById('cursos-link').addEventListener('click', (e) => {
		e.preventDefault();
		LoadContent('/cursos', false);
	});

	document.getElementById('recursos-link').addEventListener('click', (e) => {
		e.preventDefault();
		LoadContent('/recursos', false);
	});

	document.getElementById('usuarios-link').addEventListener('click', (e) => {
		e.preventDefault();
		LoadContent('/usuarios', false);
	});
});

//#region Users Config
function DeleteUser(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/delUser/' + id, true);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			LoadContent('/usuarios', true);
		}
	};
	xhr.send();
}

function EditUser(id) {
	const name = document.getElementById('edit-name').value;
	const password = document.getElementById('edit-password').value;
	const admin = document.getElementById('edit-admin').checked;

	let params = `name=${name}&password=${password}&admin=${admin}`;
	let xhr = new XMLHttpRequest();
	xhr.open('POST', '/editUser/' + id, true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			LoadContent('/usuarios', true);
		}
	};
	xhr.send(params);
}

function CreateUser() {
	const name = document.getElementById('create-name').value;
	const password = document.getElementById('create-password').value;
	const admin = document.getElementById('create-admin').checked;

	let params = `name=${name}&password=${password}&admin=${admin}`;
	let xhr = new XMLHttpRequest();
	xhr.open('POST', '/createUser/', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			LoadContent('/usuarios', true);
		}
	};
	xhr.send(params);
}
//#endregion

//#region Resources Config
function DeleteResource(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/delResource/' + id, true);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			LoadContent('/recursos', true);
		}
	};
	xhr.send();
}

function EditResource(id) {
	const name = document.getElementById('edit-name').value;
	const type = document.getElementById('edit-type').value;
	const max = document.getElementById('edit-max').value;

	let params = `name=${name}&type=${type}&max=${max}`;
	let xhr = new XMLHttpRequest();
	xhr.open('POST', '/editResource/' + id, true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			LoadContent('/recursos', true);
		}
	};
	xhr.send(params);
}

function CreateResource() {
	const name = document.getElementById('create-name').value;
	const type = document.getElementById('create-type').value;
	const max = document.getElementById('create-max').value;

	let params = `name=${name}&type=${type}&max=${max}`;
	let xhr = new XMLHttpRequest();
	xhr.open('POST', '/createResource/', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			LoadContent('/recursos', true);
		}
	};
	xhr.send(params);
}
//#endregion

//#region Cursos Config
function DeleteCurso(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/delCurso/' + id, true);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			LoadContent('/cursos', true);
		}
	};
	xhr.send();
}

function EditCurso(id) {
	const name = document.getElementById('edit-name').value;
	const alumnos = document.getElementById('edit-alumnos').value;
	const tecnico = document.getElementById('edit-tecnico').checked;

	let params = `name=${name}&alumnos=${alumnos}&tecnico=${tecnico}`;
	let xhr = new XMLHttpRequest();

	xhr.open('POST', '/editCurso/' + id, true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			LoadContent('/cursos', true);
		}
	};
	xhr.send(params);
}

function CreateCurso() {
	const name = document.getElementById('create-name').value;
	const alumnos = document.getElementById('create-alumnos').value;
	const tecnico = document.getElementById('create-tecnico').checked;

	let params = `name=${name}&alumnos=${alumnos}&tecnico=${tecnico}`;
	let xhr = new XMLHttpRequest();

	xhr.open('POST', '/createCurso/', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			LoadContent('/cursos', true);
		}
	};
	xhr.send(params);
}
//#endregion

//**Funcionalidades vinculadas con la pagina */

//#region Users Popup
function OpenUserEditPopup(id) {
	const modal = document.getElementById('edit-modal');
	const overlay = document.getElementById('overlay');
	modal.classList.add('active');
	overlay.classList.add('active');

	let usrData;

	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/usrData/' + id, true);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			usrData = JSON.parse(xhr.response);
			const name = document.getElementById('edit-name');
			const admin = document.getElementById('edit-admin');
			const form = document.getElementById('edit-form');
			name.value = usrData[0].name;
			admin.checked = usrData[0].admin ? true : false;
			form.addEventListener('submit', (e) => {
				e.preventDefault();
				EditUser(id);
			});
		}
	};
	xhr.send();
}

function OpenUserCreatePopup() {
	const modal = document.getElementById('create-modal');
	const overlay = document.getElementById('overlay');
	modal.classList.add('active');
	overlay.classList.add('active');

	const form = document.getElementById('create-form');
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		CreateUser();
	});
}
//#endregion

//#region Resources Popup
function OpenResourceEditPopup(id) {
	const modal = document.getElementById('edit-modal');
	const overlay = document.getElementById('overlay');
	modal.classList.add('active');
	overlay.classList.add('active');

	let resourceData;

	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/resourceData/' + id, true);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			resourceData = JSON.parse(xhr.response);
			const name = document.getElementById('edit-name');
			const type = document.getElementById('edit-type');
			const max = document.getElementById('edit-max');
			const form = document.getElementById('edit-form');

			name.value = resourceData[0].name;
			type.value = resourceData[0].type;
			max.value = resourceData[0].max;
			form.addEventListener('submit', (e) => {
				e.preventDefault();
				EditResource(id);
			});
		}
	};
	xhr.send();
}

function OpenResourceCreatePopup() {
	const modal = document.getElementById('create-modal');
	const overlay = document.getElementById('overlay');
	modal.classList.add('active');
	overlay.classList.add('active');

	const form = document.getElementById('create-form');
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		CreateResource();
	});
}
//#endregion

//#region Cursos Popup
function OpenCursoEditPopup(id) {
	const modal = document.getElementById('edit-modal');
	const overlay = document.getElementById('overlay');
	modal.classList.add('active');
	overlay.classList.add('active');

	let cursoData;
	let xhr = new XMLHttpRequest();

	xhr.open('GET', '/cursoData/' + id, true);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			cursoData = JSON.parse(xhr.response);
			const name = document.getElementById('edit-name');
			const alumnos = document.getElementById('edit-alumnos');
			const tecnico = document.getElementById('edit-tecnico');
			const form = document.getElementById('edit-form');
			name.value = cursoData[0].name;
			alumnos.value = cursoData[0].cantAlumnos;
			tecnico.checked = cursoData[0].tecnico ? true : false;
			form.addEventListener('submit', (e) => {
				e.preventDefault();
				EditCurso(id);
			});
		}
	};
	xhr.send();
}

function OpenCursoCreatePopup() {
	const modal = document.getElementById('create-modal');
	const overlay = document.getElementById('overlay');
	modal.classList.add('active');
	overlay.classList.add('active');

	const form = document.getElementById('create-form');
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		CreateCurso();
	});
}
//#endregion

function ClosePopup(element) {
	const modal = element.parentNode.parentNode;
	const overlay = document.getElementById('overlay');
	modal.classList.remove('active');
	overlay.classList.remove('active');
}
