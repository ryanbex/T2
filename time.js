use 'strict';

var Time = {
	offset : -7,
	currentDate : function() {
    	return new Date( new Date().getTime() + offset * 3600 * 1000);
	},
	time : function(date) {
    	return Time.currentDate().toTimeString().split("G")[0];
	},
	day : function(date) {
    	return Time.currentDate().toDateString();
	}
}

module.exports = Time;