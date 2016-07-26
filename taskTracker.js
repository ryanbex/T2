'use strict';
let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();
const table = 'Tasks';
const offset = -7;

exports.handler = (event, context, callback) => {
    dynamo.putItem(itemParams(event), function(err, response) {
	    if (err) console.log(err);
	    context.done(null,'');
	});
};

function item(event) {
    var message = event.Records[0].Sns.Message;
    var date = new Date( new Date().getTime() + offset * 3600 * 1000);
    var day = date.toDateString()
	var time = date.toTimeString().split("G")[0];
    var subject = event.Records[0].Sns.Subject;
    var messageId = event.Records[0].Sns.MessageId;
    var snsPublishTime = event.Records[0].Sns.Timestamp;
    var startTime = date.toString().split("G")[0];
    console.log('From SNS:', message);
    console.log('At:', startTime);
    return {
        Day: day,
	    StartTime: time,
	    Task: message,
	    Subject: subject,
	    SnsMessageId: messageId
	}
}

function itemParams(event) {
    return {
        TableName: table,
	    Item: item(event)
    };
}