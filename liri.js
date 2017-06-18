//grab data for my twitter keys
var twitterKeys = require("./keys.js");
var Twitter = require("twitter");
var request = require("request");
var spotify = require('node-spotify-api');


// process for my-tweets command
if (process.argv[2] === "my-tweets") {

var client = new Twitter({
  consumer_key: 'GO9kYFh1BlOyrtICQcD39mPB4',
  consumer_secret: '6ZL9ixkLZUW3wumqIDWrnzo3zIz8kwK3s57nZHrrvwv6cP7euF',
  access_token_key: '319773500-7Thc5QmVcN2K9D6sho5kUt5vZhWtB83KRlUBA3jo',
  access_token_secret: 'j7rPUAZ3iTM2Eue0j0Cy9ZbaymoUXAgB8raU7Md6WfC6i',
});
 
var params = {screen_name: 'BarackObama'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

console.log("Tweets from: " + tweets[0].user.screen_name);

  	for (var i = 0; i <= 20; i++) {	
    console.log(tweets[i].created_at);
    console.log(tweets[i].text);
}
  }
});

}


// process for spotify-this-song command


// process for movie-this command

// process for do-what-it-says command