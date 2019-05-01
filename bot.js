var Discord = require('discord.io');
var logger = require('winston');
var _ = require("underscore");
var fs = require("fs");
var auth = require('./auth.json');
var helper = require('./helpers.js');
// var people = require('./dictionary/people.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Iterate over people JSON:
var peopleObject = JSON.parse(fs.readFileSync('./dictionary/people.json', 'utf8'));

_.map( peopleObject, function(content) {
  _.map(content,function(data){
   if(data.phrase) {
      helper.watchRespond(data.phrase, data.responses);
    }
   });
});
