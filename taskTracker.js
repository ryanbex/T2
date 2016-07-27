'use strict';

let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();

exports.handler = (event, context, callback) => {
    log(event);
    dynamo.putItem(itemParams(event), function(err, response) {
	    if (err) console.log(err);
	    context.done(null,'');
	});
};

function itemParams(event) {
    return {
        TableName: table(),
        Item: item(event)
    };
}

function item(event) {
    var date = currentDate(offset());
    return {
        Day: date.toDateString(),
	    StartTime: date.toTimeString().split("G")[0],
	    Task: event.Records[0].Sns.Message,
	    Subject: event.Records[0].Sns.Subject,
	    SnsMessageId: event.Records[0].Sns.MessageId
	}
}

function table() {
    return 'Tasks';
}

function offset() {
    // california -7
    return -7;
}

function currentDate() {
    return new Date( new Date().getTime() + offset * 3600 * 1000);
}

function time(date) {
    return currentDate().toTimeString().split("G")[0];
}

function day(date) {
    return currentDate().toDateString();
}

function log(event) {
    console.log('From SNS:', event);
    console.log('At:', currentDate(offset()));
}