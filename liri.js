var twitterKeys = require("./keys.js");
var Twitter = require("twitter");
var request = require("request");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var liriCommand = process.argv[2];



// process for my-tweets command
if (liriCommand === "my-tweets") {

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

//log this command in the log.txt file
fs.appendFile("log.txt", "my-tweets", function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("You've logged a my-tweets command in the log.txt file!");
        }
    })

}

// process for spotify-this-song command
else if (liriCommand === "spotify-this-song") {

    var songSearch = (process.argv.slice(3).join(" ") || "The Sign");

    var spotify = new Spotify({
        id: 'a8888085f5e445c49da5f031c0717beb',
        secret: 'fbbf1ba183054d4d882c1cd5c1b8a213'
    });

    spotify.search({ type: 'track', query: songSearch }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else if (songSearch != "The Sign") {
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
            console.log("Track Name: " + data.tracks.items[0].name);
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
            console.log("Album Name: " + data.tracks.items[0].album.name);

           } else {
                console.log("Artist Name: " + data.tracks.items[4].artists[0].name);
                console.log("Track Name: " + data.tracks.items[4].name);
                console.log("Preview URL: " + data.tracks.items[4].preview_url);
                console.log("Album Name: " + data.tracks.items[4].album.name);
            }
        
    });

//log this command in the log.txt file
fs.appendFile("log.txt", "spotify-this-song," + songSearch, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("You've logged a spotify-this-song command in the log.txt file!");
        }
    })

}


// process for movie-this command
else if (liriCommand === "movie-this") {


    var movieName = (process.argv.slice(3).join("+") || "mr.nobody");

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=40e9cece";

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country/Countries where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
        }
    })

//log this command in the log.txt file
fs.appendFile("log.txt", "movie-this," + movieName, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("You've logged a movie-this command in the log.txt file!");
        }
    })

}

// process for do-what-it-says command
else if (liriCommand === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        if (dataArr[0] === "spotify-this-song") {
            var spotify = new Spotify({
                id: 'a8888085f5e445c49da5f031c0717beb',
                secret: 'fbbf1ba183054d4d882c1cd5c1b8a213'
            });

            spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
                console.log("Track Name: " + data.tracks.items[0].name);
                console.log("Preview URL: " + data.tracks.items[0].preview_url);
                console.log("Album Name: " + data.tracks.items[0].album.name);
            });
        }

    });

 //log this command in the log.txt file
fs.appendFile("log.txt", "do-what-it-says", function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("You've logged a do-what-it-says command in the log.txt file!");
        }
    });


}

// todo list:
// - finish the if/else statements for the do-what-it-says command
