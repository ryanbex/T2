use 'strict';

var date = {
	offset : -7,
	currentDate : function() {
    	return new Date( new Date().getTime() + offset * 3600 * 1000);
	},
	time : function(date) {
    	return date.currentDate().toTimeString().split("G")[0];
	},
	day : function(date) {
    	return date.currentDate().toDateString();
	}
}

module.exports = date;