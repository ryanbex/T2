'use strict';

let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();
var Time = require('./time.js');
var Log = require('./log.js');
const table = 'Tasks';

exports.handler = (event, context, callback) => {
    Log.log(event);
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
    var date = Time.currentDate();
    return {
        Day: date.toDateString(),
	    StartTime: date.toTimeString().split("G")[0],
	    Task: event.Records[0].Sns.Message,
	    Subject: event.Records[0].Sns.Subject,
	    SnsMessageId: event.Records[0].Sns.MessageId
	}
}