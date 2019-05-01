import { bot } from '../bot.js';

bot.on('message', function (user, userID, channelID, message, evt) {

// detect words in a sentence (no exclamation point prompt)
if (message.toLowerCase().indexOf("kimmy") !=-1) {
  bot.sendMessage({
    to: channelID,
    message: 'That is dear leader to you'
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
    message: '\"Make America Touchable Again\" -Joe Biden'
  });
}

if (message.toLowerCase().indexOf("jason") !=-1 || message.toLowerCase().indexOf("bearded") !=-1) {
  bot.sendMessage({
    to: channelID,
    message: 'I am starting to feel like the Hank Hill of firearms.'
  });
}

});
