'use strict';

let time = require('./time.js');
let log = require('./log.js');
let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();

const table = 'Tasks';

exports.handler = (event, context, callback) => {
    log.log(event);
    dynamo.putItem(itemParams(event), function(err, response) {
	    if (err) console.log(err);
	    context.done(null,'');
	});
};

function itemParams(event) {
    return {
        TableName: table,
        Item: item(event)
    };
}

function item(event) {
    var date = time.currentDate();
    return {
        Day: date.toDateString(),
	    StartTime: date.toTimeString().split("G")[0],
	    Task: event.Records[0].Sns.Message,
	    Subject: event.Records[0].Sns.Subject,
	    SnsMessageId: event.Records[0].Sns.MessageId
	}
}