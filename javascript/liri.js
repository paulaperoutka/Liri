require('dotenv').config();

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');

var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var operator = "";
	for (i=3; i<process.argv.length; i++) {
		operator += process.argv[i] + "-";
	}

var commands = ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'];

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
		console.log('Not a recognized request. Please enter one of the following commands: (' + commands.join(', ') + '), with a search parameter if necessary.')
	};

function getTweets () {
	console.log('Requesting from twitter...');

	var client = new Twitter(keys.twitter);

	//path, params, callback
	client.get('statuses/user_timeline', {user_id: '963869150295810048', count: 20}, function(error, tweets, response) {
	  if(error){
	  	console.log(error);
	  } else {
	  	// console.log(tweets);  // The tweets. 
	  	// console.log(response);  // Raw response object. 
	  	console.log('-----------------------------------\nLiri\'s Tweets:\n-----------------------------------')
	  	for (i=0; i<tweets.length; i++) {
	  		console.log("\n" + tweets[i].created_at + "\n" + tweets[i].text);
	  	};
	  	console.log('\n-----------------------------------\n')
		}
});

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


// function getKeys () {
// 	fs.readFileSync('./keys.js', 'utf-8', (error, data) => {
// 		let keysArray = data;

// 	}
// };



