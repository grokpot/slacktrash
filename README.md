# slacktrash
Slack has poor data cleaning policies. This tool deletes messages of a given user in a given channel.

Slack has been notoriously outspoken about retaining all data, even if customers want it deleted.
The overall policy (as of 08/17) is:
* All messages are stored permanently.  
  * If you're on a free plan, 10,000 messages are displayed
  * If you upgrade from a free plan, all messages (even past 10,000) are displayed
* An admin may delete any message in a public channel
* In private channels, only the user who wrote the message may delete it.
* Even if a message is deleted, slack retains the deleted message in their archives.
* Archives may be retreived by account owners in certain instances (legal claims, etc.)

While it is impossible to delete messages from Slack's internal archives, it is my belief that data retention should be the choice of the user. Slack has a deletion tool, but it's slow and clunky. Plus, this gives me a great excuse to practice working with Node.

This tool deletes all messages of UserA in a channel. In order for it to work, you must have a legacy API token for that user. API tokens can be obtained here: https://api.slack.com/custom-integrations/legacy-tokens
You will also need the ID of the user and ID of the channel. These can be obtained by inspecting the page in the slack webapp.

Once obtained, these parameters should be set as environment variables and the app can be run as:
`$ node app.js`
