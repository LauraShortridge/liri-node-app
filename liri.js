require("dotenv").config();

//Require "fs" in order to access text documents
var fs = require("fs");

//Require axios
var axios = require("axios");

//Require moment
var moment = require("moment");

//Link to keys.js
var keys = require("./keys.js");

//Require spotify
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

//Take in the command arguement
var command = process.argv[2];

var nodeArgs = process.argv;

runCommand();

function runCommand() {
    //Code for concert-this command
    if (command === "concert-this") {
        //Create bandName varialbe to include multiple words
        var bandName = "";
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                bandName = bandName + "+" + nodeArgs[i];
            }
            else {
                bandName += nodeArgs[i];
            }
        }
        //Call to Bands In Town API
        var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
        axios.get(queryUrl).then(
            function (response) {
                //Limit responses
                for (var i = 0; i < 5; i++) {
                    console.log("Venue: " + response.data[i].venue.name);
                    console.log("Venue location: "+ response.data[i].venue.city);
                    console.log("Date of the event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                    console.log("\r\n");
                }
            }
        );
    } else if (command === "spotify-this-song") {
        //Spotify Code 
        var song = "";
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                song = song + "+" + nodeArgs[i];
            }
            else {
                song += nodeArgs[i];
            }
        }
        if (song === "") {
            song = "The Sign Ace of Base";
        }
        spotify.search({type: "track", query: song, limit: 2}, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
              }
            console.log("Artist: " + data.tracks.items[0].artists[0].name)
            console.log("Song: " + data.tracks.items[0].name)
            console.log("Song preview: " + data.tracks.items[0].external_urls.spotify)
            console.log("Album: " + data.tracks.items[0].album.name)
        });
    } else if (command === "movie-this") {
        //Code for movie-this command
        var movieName = "";
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[i];
            }
            else {
                movieName += nodeArgs[i];
            }
        }
        if (movieName === "") {
            movieName = "Mr. Nobody";
        }
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(
            function (response) {
                // Then we print out the imdbRating
                console.log("Title: " + response.data.Title);
                console.log("Year it was released: "+ response.data.Year);
                console.log("The movie's rating is: " + response.data.imdbRating);
                console.log("Rotten Tomatoes gave this movie: " +response.data.Ratings[1].Value);
                console.log("Country where the movie was produced: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            }
        );
    } else if (command === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            }
            var output = data.split(",");
            command = output[0];
            nodeArgs.push(output[1]);
            runCommand();
        })
    }
}


//spotify-this-song
//If no song is provided then your program will default to "The Sign" by Ace of Base.
//You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.

//movie-this
    //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//do-what-it-says
    //node liri.js do-what-it-says
        //Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
            //It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt
            //Edit the text in random.txt to test out the feature for movie-this and concert-this
