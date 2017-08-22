/**
INSTRUCTIONS:
1. Populate API token
2. Populate User ID
3. Populate Channel ID
$ node app.js
**/

// var util = require('util');
var request = require('request');

/*
* API
* https://api.slack.com/methods/channels.history
*/
var api_history = "https://slack.com/api/im.history";
var api_delete = "https://slack.com/api/chat.delete";

// TODO: make tokens and user params environment variables
var token = "";
var user = ""
var channel = "";

// These can be changed but Slack is picky about their timeouts. This combo works best
var num_msgs = 1000;
var ms = 1200;

/**
Builds the API URL for grabbing message history
**/
function get_url_history (latest_ts) {
    // Use template string formatting because I haven't before
    if (latest_ts) {
        return `${api_history}?token=${token}&channel=${channel}&latest=${latest_ts}&count=${num_msgs}`;
    } else {
        return `${api_history}?token=${token}&channel=${channel}&count=${num_msgs}`;
    }
}

/**
Parses the messages and deletes the message if it's from the specified user
**/
function parse_messages (messages) {
    
    // Print number of messages received
    if (messages) {
        console.log(`${messages.length} messages received.`)
    }

    var count = 0, last_message;
    
    // Iterate messages
    messages.forEach(function (message, index) {

        last_message = message;

        // Only delete the message if it belongs to the user who has the API key
        if (message.user == user) {

            // Indicate if this is the last message
            var is_last_message = index == messages.length - 1;

            // Timeout for Slack API rate limiting
            setTimeout(function () {
                delete_message(message, is_last_message)
            }, count * ms);

            count++;
        }
    });

    // if we didn't delete anything, it was all messages from the other user, get the next batch
    if (count == 0 && last_message) {
        get_history(get_url_history(last_message.ts));
    }
}

/**
Deletes a single message. Prints result to stdout
**/
function delete_message (message, last_message) {

    var ts = message.ts,
        url_delete = `${api_delete}?token=${token}&ts=${ts}&channel=${channel}`;

    // console.log(`calling ${url_delete}`);

    request(url_delete, function (error, response, body) {

        var json = JSON.parse(body);

        // console.log(`response = ${body}`)

        if (!error && response.statusCode == 200 && json.ok){
            console.log(`Deleted message: ${message.text}`);
        } else {
            console.log(`There was an error while deleting a message: ${error}`);
        }

        if (last_message) {
            get_history(get_url_history(message.ts));
        }

    });
}

/**
Calls the message history API
**/
function get_history (url) {
    console.log(`CALLING HISTORY API ${url}`);

    request(url, function (error, response, body) {
        var json = JSON.parse(body);
        if (!error && response.statusCode == 200 && json.ok){
            parse_messages(json.messages);
        } else {
            console.log(`There was an error while requesting messages: ${error}`);
        }
    });
}


get_history(get_url_history());



