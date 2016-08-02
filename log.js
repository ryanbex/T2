let date = require('./date.js');

var log = {
	log : function(event) {
		console.log('From SNS:', event);
    	console.log('At:', Time.currentDate());
	}
}

module.exports = log;