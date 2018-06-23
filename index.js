//Include twitter library
var twit = require('twit');

//create new twitter instance
var twitter = new twit(require('./config.js'));

var myHandle = 'shreera88559218';
//create stream
var stream = twitter.stream('user');
stream.on('follow',followNewPerson);
stream.on('tweet',tweetEvent);

function followNewPerson(event) {
	// body...
	var name = event.source.name;
	var screenName = event.source.screen_name;
	var response = 'Thanks For following me,'+ name + ' @'+ screenName;

	twitter.post('statuses/update',{status : response}, tweeted);
	console.log('I was followed by : ' + name + ' @'+screenName);
}

function tweetEvent(tweet){

	var reply_to = tweet.in_reply_to_screen_name;
	var name = tweet.user.screen_name;
	var txt = tweet.txt;

	console.log(reply_to , name , txt);

	if(reply_to == myHandle){
		var reply = 'Hi @' + name + ' ' + ', Thanks for the mention :)';
		console.log(reply);

		twitter.post('statuses/update',{status : reply},tweeted);
	}
}

function tweeted (err, reply) {
  if (err !== undefined) {
    console.log(err)
  } else {
    console.log('Tweeted: ' + reply)
  }
}