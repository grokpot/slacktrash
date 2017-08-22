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

This tool deletes all messages of a given user in a given channel. In order for it to work, you must have a legacy API token for that user. API tokens can be obtained here: https://api.slack.com/custom-integrations/legacy-tokens
You will also need the ID of the user and ID of the channel. These can be obtained by inspecting the page in the slack webapp.

Once obtained, these parameters should be set as environment variables (via [dotenv](https://github.com/motdotla/dotenv)) and the app can be run as:
`$ node app.js`

###NOTES:
1. Slack has a very short API rate limit. In order to not be rate limited (and your token possibly banned), this tool deletes 1 message per ~1 second. It's unfortunate, but the deletion rate can easiliy be modified if you think you can do better. I would suggest running this tool overnight for lengthly channels.
2. The free plan "10,000 messsage history" is a sum of all channel messages. This tool deletes all visible messages. Nightly, Slack restores messages _across all channels_ to a total sum of 10,000. So if you have 5,000 in channelA and 5,000 in channel B and delete 1,000 from channelB, the next morning you will probably have 5,500 in channelA and 4,500 in channelB. Therefore, it might be impossible to delete all messages dating back to channel creation on a free plan.
