require('dotenv').config();

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');

var keys = require('./keys.js');

var command = process.argv[2];
var searchParam = '';
	for (var i=3; i<process.argv.length; i++) {
		searchParam += process.argv[i] + ' ';
	}

var commands = ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'];

if (command===commands[0]) {
		console.log('Your request: ' + commands[0]);
		getTweets();
	}

else if (command===commands[1]) {
		console.log('Your request: ' + commands[1]);
		getSong(searchParam);
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
	  	return console.log(error);
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

function getSong (searchParam) {
	console.log('Requesting from spotify...');

	var spotify = new Spotify(keys.spotify);
	  // * Artist(s) ... artists
   //  * The song's name ... name
   //  * A preview link of the song from Spotify ...preview_url
   //  * The album that the song is from

	if (searchParam === ''){
   		searchParam = 'The Sign Ace of Base';
   		console.log('No song searched; default is The Sign by Ace of Base. For a different song, please enter your song title after the spotify-this-song command.')
  };

  spotify.search({ type: 'track', query: searchParam, limit: 1 }, function(error, data) {
	  if (error) {
	    return console.log('Error occurred: ' + error);
	  } else {

	  	console.log(
	  		'-----------------------------------\n' +
	  		data.tracks.items[0].artists[0].name + '\n' +
	  		data.tracks.items[0].name + '\n' +
	  		data.tracks.items[0].preview_url + '\n' +
	  		data.tracks.items[0].album.name + '\n-----------------------------------\n'
	  	); 
	  }

	});

};

function getMovie () {
	console.log('Requesting from omdb...');
};

function getRandom () {
	console.log("random");
};


// function getKeys () {
// 	fs.readFileSync('./keys.js', 'utf-8', (error, data) => {
// 		let keysArray = data;

// 	}
// };



