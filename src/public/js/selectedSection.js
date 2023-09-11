let list = document.querySelectorAll('.navigation li');

list.forEach((item) =>
	item.addEventListener('click', (e) => {
		list.forEach((item) => {
			item.classList.remove('selected');
		});

		let target = e.target.tagName == 'SPAN' ? e.target.parentNode.parentNode : e.target.tagName == 'A' ? e.target.parentNode : e.target.parentNode.parentNode.parentNode;
		target.classList.add('selected');
	})
);
