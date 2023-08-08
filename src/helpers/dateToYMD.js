module.exports = {
	dateToYMD(date) {
		var d = date.getDate();
		var m = date.getMonth() + 1; // +1 because of Month begin from 0 to 11
		var y = date.getFullYear();
		return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
	},
};
