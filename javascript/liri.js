require('dotenv').config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var keys = require('keys.js');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// function getKeys () {
// 	fs.readFile('keys.js', 'utf-8', (error, data) => {
// 		let 

// 	}
// };

switch (command) {

	case ('my-tweets'):
	getTweets();
	break;

	case ('spotify-this-song'):
	getSong();
	break;

	case ('movie-this'):
	getMovie();
	break;

	case ('do-what-it-says'):

	break;

	default:
	console.log("Not a recognized request.");

};
