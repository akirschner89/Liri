//grab data for my twitter keys
var twitterKeys = require("./keys.js");

//for the rest
var Twitter = require("twitter");
var request = require("request");
var Spotify = require('node-spotify-api');


// process for my-tweets command
if (process.argv[2] === "my-tweets") {

    var client = new Twitter({
        consumer_key: 'GO9kYFh1BlOyrtICQcD39mPB4',
        consumer_secret: '6ZL9ixkLZUW3wumqIDWrnzo3zIz8kwK3s57nZHrrvwv6cP7euF',
        access_token_key: '319773500-7Thc5QmVcN2K9D6sho5kUt5vZhWtB83KRlUBA3jo',
        access_token_secret: 'j7rPUAZ3iTM2Eue0j0Cy9ZbaymoUXAgB8raU7Md6WfC6i',
    });

    var params = { screen_name: 'BarackObama' };
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
else if (process.argv[2] === "spotify-this-song") {

    var songSearch = process.argv.slice(3).join(" ");

    var spotify = new Spotify({
        id: 'a8888085f5e445c49da5f031c0717beb',
        secret: 'fbbf1ba183054d4d882c1cd5c1b8a213'
    });



if (songSearch === false) {

	spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("Artist Name: " + data.tracks.items[4].artists[0].name);
            console.log("Track Name: " + data.tracks.items[4].name);
            console.log("Preview URL: " + data.tracks.items[4].preview_url);
            console.log("Album Name: " + data.tracks.items[4].album.name);
        });
    // spotify.search({ type: 'track', query: songSearch }, function(err, data) {
    //     if (err) {
    //         return console.log('Error occurred: ' + err);
    //     }

    //     console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
    //     console.log("Track Name: " + data.tracks.items[0].name);
    //     console.log("Preview URL: " + data.tracks.items[0].preview_url);
    //     console.log("Album Name: " + data.tracks.items[0].album.name);
    // });

}

else {
spotify.search({ type: 'track', query: songSearch }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
        console.log("Track Name: " + data.tracks.items[0].name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url);
        console.log("Album Name: " + data.tracks.items[0].album.name);
    });


}


}


// process for movie-this command

// process for do-what-it-says command
