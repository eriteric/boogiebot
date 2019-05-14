/*jshint esversion: 6 */
const Discord = require('discord.js');
var logger = require('winston');
var _ = require("underscore");
var fs = require("fs");
var auth = require('./auth.json');
// var helper = require('./helpers.js');

const bot = new Discord.Client();

bot.on('ready', () => {
  logger.info(`Logged in as ${bot.user.tag}!`);
});

bot.login(auth.token);

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// helpers
// pick a random phrase from the array:
function randomResponse(textArray) {
  var randomIndex = Math.floor(Math.random()*textArray.length);
  return textArray[randomIndex];
}

// Convert hex code to decimal. Exclude the # sign.
function hexToDec(hex) {
  return hex.toLowerCase().split('').reduce( (result, ch) =>
      result * 16 + '0123456789abcdefgh'.indexOf(ch), 0);
}



// Create people object
var people = JSON.parse(fs.readFileSync('./dictionary/people.json', 'utf8'));


bot.on('message', msg => {

  // response conditionals and format:
  function watchRespond(phrase, responses) {
    if(msg.author.bot === false) {
      if (msg.content.toLowerCase().includes(phrase)) {
        msg.reply(randomResponse(responses));
      }
    } else {
      // console.log("is a bot");
    }
  }
  // iterate over people object and call watchRespond
  _.map( people, function(content) {
    _.map(content,function(data){
     if(data.phrase) {
        watchRespond(data.phrase, data.responses);
      }
     });
  });

  // Colors must be a decimal representation of a hexidecimal value. Use the hexToDec() function to convert.
  // if(msg.content.toLowerCase().includes("tcd")) {
  //   if(msg.content.toLowerCase().includes("http") || msg.content.toLowerCase().includes(".com")) {
  //   } else {
  //     msg.channel.send({embed: {
  //       color: hexToDec("ad1e29"),
  //       title: "The Common Discourse",
  //       fields: [
  //         { name: "Schedule", value: "Random Friday nights after Pirate Radio", inline: false},
  //         { name: "Website", value: "https://thecommondiscourse.com", inline: false},
  //         { name: "Twitter", value: "https://twitter.com/tcdtweet", inline: false},
  //         { name: "Periscope", value: "https://www.periscope.tv/TCDtweet/", inline: false},
  //         { name: "YouTube", value: "https://www.youtube.com/channel/UCf9wP9I3SYQavmHbD0AOOFA", inline: false},
  //         { name: "Twitch", value: "https://www.twitch.tv/thecommondiscourse", inline: false}
  //       ]
  //     }});
  //   }
  // }//tcd

  // if(msg.content.toLowerCase().includes("tdb")) {
  //   if(msg.content.toLowerCase().includes("http") || msg.content.toLowerCase().includes(".com")) {
  //   } else {
  //     msg.channel.send({embed: {
  //       color: hexToDec("2b539b"),
  //       title: "The Daily Boogie",
  //       fields: [
  //         { name: "Schedule", value: "Mon - Thu, at a random time. Free For All on Thursdays.", inline: false},
  //         { name: "Website", value: "https://thecommondiscourse.com", inline: false},
  //         { name: "Twitter", value: "https://twitter.com/boogiebumper", inline: false},
  //         { name: "Periscope", value: "https://www.pscp.tv/BoogieBumper/follow", inline: false},
  //         { name: "YouTube", value: "https://www.youtube.com/channel/UC6Yaypa8Af3XEzC2dTZztcg", inline: false},
  //         { name: "Podbean", value: "https://boogiebumper.podbean.com/", inline: false},
  //         { name: "Twitch", value: "https://www.twitch.tv/thedailyboogie", inline: false},
  //         { name: "Bitchute", value: "https://www.bitchute.com/boogiebumper/", inline: false},
  //         { name: "iTunes", value: "https://podcasts.apple.com/us/podcast/the-daily-boogie/id1437957774", inline: false}
  //       ]
  //     }});
  //   }
  // }//tdb

  // if(msg.content.toLowerCase().includes("tsb")) {
  //   if(msg.content.toLowerCase().includes("http") || msg.content.toLowerCase().includes(".com")) {
  //   } else {
  //     msg.channel.send({embed: {
  //       color: hexToDec("50e45e"),
  //       title: "The Starting Bloc",
  //       fields: [
  //         { name: "Schedule", value: "Early Wednesday mornings. Really early.", inline: false},
  //         { name: "Website", value: "https://thecommondiscourse.com", inline: false},
  //         { name: "Twitter", value: "https://twitter.com/theStartingBloc", inline: false},
  //         { name: "Periscope", value: "https://periscope.tv/theStartingBloc", inline: false},
  //         { name: "Podbean", value: "https://thestartingbloc.podbean.com/", inline: false}
  //       ]
  //     }});
  //   }
  // }//tsb

  // if(msg.content.toLowerCase().includes("tav")) {
  //   if(msg.content.toLowerCase().includes("http") || msg.content.toLowerCase().includes(".com")) {
  //   } else {
  //     msg.channel.send({embed: {
  //       color: hexToDec("ff9933"),
  //       title: "TAV Show",
  //       fields: [
  //         { name: "Schedule", value: "Sunday nights around 7pm PST", inline: false},
  //         { name: "Website", value: "https://tavshow.com/", inline: false},
  //         { name: "Twitter", value: "https://twitter.com/tavshow", inline: false},
  //         { name: "Periscope", value: "https://www.periscope.tv/TAVshow/", inline: false},
  //         { name: "Podbean", value: "https://tavshow.podbean.com/", inline: false},
  //         { name: "Twitch", value: "https://www.twitch.tv/tavshow", inline: false},
  //         { name: "YouTube", value: "https://www.youtube.com/channel/UCXvfMjTn-WYYIfFiCdFaICA", inline: false}
  //       ]
  //     }});
  //   }
  // }//tcd

  // Commands
  if (msg.content.substring(0, 1) == '!') {
    var args = msg.content.substring(1).split(' ');
    var cmd = args[0];
    args = args.splice(1);

    if(msg.content.toLowerCase().includes("http") || msg.content.toLowerCase().includes(".com")) {
    } else {
      switch(cmd) {
        // !ping
        case 'ping':
            msg.channel.send("pong!");
        break;
        case 'pong':
          msg.channel.send("You were supposed to say ping. Try again. Idiot.");
        break;
        case 'tav':
          msg.channel.send({embed: {
            color: hexToDec("ff9933"),
            title: "TAV Show",
            fields: [
              { name: "Schedule", value: "Sunday nights around 7pm EST", inline: false},
              { name: "Website", value: "https://tavshow.com/", inline: false},
              { name: "Twitter", value: "https://twitter.com/tavshow", inline: false},
              { name: "Periscope", value: "https://www.periscope.tv/TAVshow/", inline: false},
              { name: "Podbean", value: "https://tavshow.podbean.com/", inline: false},
              { name: "Twitch", value: "https://www.twitch.tv/tavshow", inline: false},
              { name: "YouTube", value: "https://www.youtube.com/channel/UCXvfMjTn-WYYIfFiCdFaICA", inline: false}
            ]
          }});
        break;
        case 'tsb':
          msg.channel.send({embed: {
            color: hexToDec("50e45e"),
            title: "The Starting Bloc",
            fields: [
              { name: "Schedule", value: "Early Wednesday mornings. Really early.", inline: false},
              { name: "Website", value: "https://thecommondiscourse.com", inline: false},
              { name: "Twitter", value: "https://twitter.com/theStartingBloc", inline: false},
              { name: "Periscope", value: "https://periscope.tv/theStartingBloc", inline: false},
              { name: "Podbean", value: "https://thestartingbloc.podbean.com/", inline: false}
            ]
          }});
        break;
        case 'tdb':
          msg.channel.send({embed: {
            color: hexToDec("2b539b"),
            title: "The Daily Boogie",
            fields: [
              { name: "Schedule", value: "Mon - Thu, at a random afternoonish time. Free For All on Thursdays.", inline: false},
              { name: "Website", value: "https://thecommondiscourse.com", inline: false},
              { name: "Twitter", value: "https://twitter.com/boogiebumper", inline: false},
              { name: "Periscope", value: "https://www.pscp.tv/BoogieBumper/follow", inline: false},
              { name: "YouTube", value: "https://www.youtube.com/channel/UC6Yaypa8Af3XEzC2dTZztcg", inline: false},
              { name: "Podbean", value: "https://boogiebumper.podbean.com/", inline: false},
              { name: "Twitch", value: "https://www.twitch.tv/thedailyboogie", inline: false},
              { name: "Bitchute", value: "https://www.bitchute.com/boogiebumper/", inline: false},
              { name: "iTunes", value: "https://podcasts.apple.com/us/podcast/the-daily-boogie/id1437957774", inline: false}
            ]
          }});
        break;
        case 'tcd':
          msg.channel.send({embed: {
            color: hexToDec("ad1e29"),
            title: "The Common Discourse",
            fields: [
              { name: "Schedule", value: "Random Friday nights after Pirate Radio", inline: false},
              { name: "Website", value: "http://thecommondiscourse.com", inline: false},
              { name: "Twitter", value: "https://twitter.com/tcdtweet", inline: false},
              { name: "Periscope", value: "https://www.periscope.tv/TCDtweet/", inline: false},
              { name: "YouTube", value: "https://www.youtube.com/channel/UCf9wP9I3SYQavmHbD0AOOFA", inline: false},
              { name: "Twitch", value: "https://www.twitch.tv/thecommondiscourse", inline: false}
            ]
          }});
        break;
        // Just add any case commands if you want to..
      }
    }
  }

});//bot.on message listener
