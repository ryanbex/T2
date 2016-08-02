var Time = require('./time.js');

var Log = {
	log : function(event) {
		console.log('From SNS:', event);
    	console.log('At:', Time.currentDate());
	}
}

module.exports = Log;