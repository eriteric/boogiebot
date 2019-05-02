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

  if(msg.content.toLowerCase().includes("tcd")) {
    msg.channel.send({embed: {
      color: 3447003,
      title: "The Common Discourse:",
      fields: [
        { name: "Website", value: "https://thecommondiscourse.com", inline: false},
        { name: "Twitter", value: "https://twitter.com/tcdtweet", inline: false}
      ]
    }
    });
  }//tcd

  if(msg.content.toLowerCase().includes("tdb")) {
    msg.channel.send({embed: {
      color: 3447003,
      title: "The Daily Boogie",
      fields: [
        { name: "Website", value: "https://thecommondiscourse.com", inline: false},
        { name: "Twitter", value: "https://twitter.com/boogiebumper", inline: false}
      ]
    }
    });
  }//tcd

});
