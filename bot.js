var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

// Helper functions
function randomPhrase(textArray) {
  var randomIndex = Math.floor(Math.random()*textArray.length);
  return textArray[randomIndex];
}

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
  if (message.substring(0, 1) == '!') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);
    switch(cmd) {
      // !ping
      case 'ping':
          bot.sendMessage({
              to: channelID,
              message: 'Pong!'
          });
      break;
      case 'pong':
         bot.sendMessage({
              to: channelID,
              message: 'You were supposed to say ping. Try again. Idiot.'
         });
      break;
      // Just add any case commands if you want to..
     }
  }

  // detect words in a sentence (no exclamation point prompt)
  if (message.toLowerCase().indexOf("kimmy") !=-1) {

    var kimmyMessage = [
      'That is Dear Leader to you.',
      'It is said that Mrs. Jong-Un has no use for bathrooms'
    ];

    bot.sendMessage({
      to: channelID,
      message: randomPhrase(kimmyMessage)
    });
  }

  if (message.toLowerCase().indexOf("boogie") !=-1) {
    bot.sendMessage({
      to: channelID,
      message: 'woogie'
    });
  }

  if (message.toLowerCase().indexOf("cnn") !=-1) {
    bot.sendMessage({
      to: channelID,
      message: '\"Antifa is a good cause\" -Christopher Cuomo'
    });
  }

  if (message.toLowerCase().indexOf("biden") !=-1) {
    bot.sendMessage({
      to: channelID,
      message: '\"Make America Touchable Again\" - Joe B.'
    });
  }

  if (message.toLowerCase().indexOf("jason") !=-1 || message.toLowerCase().indexOf("bearded") !=-1) {
    bot.sendMessage({
      to: channelID,
      message: 'I am starting to feel like the Hank Hill of firearms.'
    });
  }

});
