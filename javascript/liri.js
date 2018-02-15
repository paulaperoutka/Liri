require('dotenv').config();

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');

var keys = require('./keys.js');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var specifics = process.argv[3];

var commands = ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'];

// function getKeys () {
// 	fs.readFileSync('./keys.js', 'utf-8', (error, data) => {
// 		let keysArray = data;

// 	}
// };

if (command===commands[0]) {
		console.log('Your request: ' + commands[0]);
		getTweets();
	}

else if (command===commands[1]) {
		console.log('Your request: ' + commands[1]);
		getSong();
	}

else if (command===commands[2]) {
		console.log('Your request: ' + commands[2]);
		getMovie();
	}

else if (command===commands[3]) {
		console.log('Your request: ' + commands[3]);
		random();
	}

else {
		console.log('Not a recognized request. Please enter one of the following commands: ' + commands + '.')
	};

function getTweets () {
	console.log("twitter");
};

function getSong () {
	console.log("spotify");
};

function getMovie () {
	console.log("omdb");
};

function getRandom () {
	console.log("random");
};



