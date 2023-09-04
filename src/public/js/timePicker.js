const picker = document.getElementById('time');
const form = picker.parentElement.parentElement;
const btn = document.getElementById('btn');

let startDiv;
let endDiv;
let select;
let defaultOption;

startDiv = document.createElement('div');
startDiv.classList.add('input-box');
endDiv = document.createElement('div');
endDiv.classList.add('input-box');

function createStartSelector() {
	select = document.createElement('select');
	defaultOption = document.createElement('option');

	select.name = 'start';
	select.required = true;
	select.id = 'startSelector';
	select.onchange = EndTurns;

	defaultOption.disabled = true;
	defaultOption.selected = true;
	defaultOption.hidden = true;
	defaultOption.value = '';
	defaultOption.textContent = ' -- Seleccione el horario de inicio -- ';

	select.appendChild(defaultOption);
}

function createEndSelector() {
	select = document.createElement('select');
	defaultOption = document.createElement('option');

	select.name = 'end';
	select.required = true;
	select.id = 'endSelector';

	defaultOption.disabled = true;
	defaultOption.selected = true;
	defaultOption.hidden = true;
	defaultOption.value = '';
	defaultOption.textContent = ' -- Seleccione el horario de finalizacion -- ';

	select.appendChild(defaultOption);
}

let morning = {
	start: ['07:35', '08:35', '10:00', '11:00'],
	end: ['08:35', '09:35', '11:00', '12:00'],
};

let evening = {
	start: ['13:00', '14:00', '15:20', '16:20', '17:20'],
	end: ['14:00', '15:00', '16:20', '17:20', '18:10'],
};

function Turns() {
	createStartSelector();
	const startSelect = document.getElementById('startSelector');
	let endSelect = document.getElementById('endSelector');
	if (startSelect != null) startSelect.remove();
	if (endSelect != null) {
		endDiv.removeChild(endSelect);
		endDiv.remove();
	}

	if (picker.value == 'mañana') {
		morning.start.forEach((i) => {
			let option = document.createElement('option');
			option.value = i;
			option.innerText = i;
			select.appendChild(option);
		});
	} else {
		evening.start.forEach((i) => {
			let option = document.createElement('option');
			option.value = i;
			option.innerText = i;
			select.appendChild(option);
		});
	}

	startDiv.appendChild(select);
	form.insertBefore(startDiv, btn);
}

function EndTurns() {
	createEndSelector();
	let startSelect = document.getElementById('startSelector');
	let endSelect = document.getElementById('endSelector');
	if (endSelect != null) endSelect.remove();

	if (picker.value == 'mañana') {
		morning.end.forEach((i) => {
			a = parseInt(i);
			b = parseInt(startSelect.value);

			if (a <= b) return;

			let option = document.createElement('option');
			option.value = i;
			option.innerText = i;
			select.appendChild(option);
		});
	} else {
		evening.end.forEach((i) => {
			a = parseInt(i);
			b = parseInt(startSelect.value);

			if (a <= b) return;

			let option = document.createElement('option');
			option.value = i;
			option.innerText = i;
			select.appendChild(option);
		});
	}

	endDiv.appendChild(select);
	form.insertBefore(endDiv, btn);
}
