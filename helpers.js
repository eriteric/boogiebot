// Initialize Discord Bot
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

// helper functions:

function randomPhrase(textArray) {
  var randomIndex = Math.floor(Math.random()*textArray.length);
  return textArray[randomIndex];
}

function watchRespond(phrase, responses) {
  bot.on('message', function (user, userID, channelID, message, evt) {

    if (message.toLowerCase().indexOf(phrase) !=-1) {
      bot.sendMessage({
        to: channelID,
        message: randomPhrase(responses)
      });
    }

  });
}

module.exports = {
  randomPhrase: randomPhrase,
  watchRespond: watchRespond
};
