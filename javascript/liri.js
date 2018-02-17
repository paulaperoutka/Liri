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
		getMovie(searchParam);
	}

else if (command===commands[3]) {
		console.log('Your request: ' + commands[3]);
		getRandom();
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
	  	return console.log('Error occurred: ' + error);
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
	// * Artist(s) ... artists []
 // 	* The song's name ... name
	// * A preview link of the song from Spotify ... preview_url
	// * The album that the song is from ... album object

	if (searchParam === ''){
   		searchParam = 'The Sign Ace of Base';
   		console.log('No song searched; default is The Sign by Ace of Base. For different song info, please enter your song title after the spotify-this-song command.')
  };

//type, track, limit (default 20)
  spotify.search({ type: 'track', query: searchParam, limit: 1 }, function(error, data) {
	  if (error) {
	    return console.log('Error occurred: ' + error);
	  } else {
	  	// console.log(data);
	  	// console.log(data.tracks.items);
	  	console.log(
	  		'-----------------------------------\n' +
//get mutliple artists?
	  		data.tracks.items[0].artists[0].name + '\n' +
	  		data.tracks.items[0].name + '\n' +
	  		data.tracks.items[0].preview_url + '\n' +
	  		data.tracks.items[0].album.name + 
	  		'\n-----------------------------------\n'
	  	); 
	  }

	});

};

function getMovie (searchParam) {
	console.log('Requesting from omdb...');

// * Title of the movie ... Title
// * Year the movie came out ... Year
// * IMDB Rating of the movie ... imdbRating
// * Rotten Tomatoes Rating of the movie ... Ratings[1].Value
// * Country where the movie was produced ... Country
// * Language of the movie ... Language
// * Plot of the movie ... Plot
// * Actors in the movie ... Actors

	if (searchParam === '') {
		searchParam = 'Mr. Nobody'; 
		console.log('No movie searched; default is Mr. Nobody. For different movie info, please enter your movie title after the movie-this command.') 	
	};

	searchParam = searchParam.split(' ').join('+');

	var queryURL = "http://www.omdbapi.com/?t=" + searchParam + "&y=&plot=short&apikey=trilogy";

	request(queryURL, function (error, response, body) {
	  if (error) {
	  	return console.log('Error occurred: ', error); // Print the error if one occurred
		} else {
			// console.log(JSON.parse(body));
			console.log(
				'-----------------------------------\n' +
				JSON.parse(body).Title + '\n' +
				JSON.parse(body).Year + '\n' +
				JSON.parse(body).imdbRating + '\n' +
				JSON.parse(body).Ratings[1].Value + '\n' +
				JSON.parse(body).Country + '\n' +
				JSON.parse(body).Language + '\n' +
				JSON.parse(body).Plot + '\n' +
				JSON.parse(body).Actors + '\n' +
				'-----------------------------------\n'
			);
		}
	});
};

function getRandom () {
	console.log('Exporting from random.txt...');

	fs.readFile('./random.txt', 'UTF-8', (error, data) => {
		if (error) {
			return console.log('Error occurred: ' + error);
		} else {
			let random = data.split(',');
      console.log(random[0], random[1]);
      if (random[0] === 'spotify-this-song') {
      	getSong(random[1]);
      }
		}
	});
};


// function getKeys () {
// 	fs.readFileSync('./keys.js', 'utf-8', (error, data) => {
// 		let keysArray = data;
// 	}
// };



