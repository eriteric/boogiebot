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

});
