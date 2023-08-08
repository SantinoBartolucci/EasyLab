const btn = document.getElementById('password-inp');
const lock = document.getElementById('lock');

const closedLock = '/img/lock-solid.svg';
const openedLock = '/img/lock-open-solid.svg';

function ToogleVisibility() {
	btn.type = btn.type === 'password' ? 'text' : 'password';
	lock.src = btn.type === 'password' ? closedLock : openedLock;
}
