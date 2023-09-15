document.addEventListener('DOMContentLoaded', () => {
	let actualSession = '/gestion';

	function LoadContent(url) {
		if (url === actualSession) return;

		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				document.getElementById('content').innerHTML = xhr.responseText;
				actualSession = url;
			}
		};
		xhr.send();
	}

	document.getElementById('gestion-link').addEventListener('click', (e) => {
		e.preventDefault();
		LoadContent('/gestion');
	});
	document.getElementById('cursos-link').addEventListener('click', (e) => {
		e.preventDefault();
		LoadContent('/cursos');
	});
	document.getElementById('recursos-link').addEventListener('click', (e) => {
		e.preventDefault();
		LoadContent('/recursos');
	});
	document.getElementById('usuarios-link').addEventListener('click', (e) => {
		e.preventDefault();
		LoadContent('/usuarios');
	});
});
