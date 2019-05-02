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
// convert hex code to RGB
// function hexToRgb(hex) {
//     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     return result ? {
//         r: parseInt(result[1], 16),
//         g: parseInt(result[2], 16),
//         b: parseInt(result[3], 16)
//     } : null;
// }

// Convert hex code to decimal
// exclude the # sign
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
  if(msg.content.toLowerCase().includes("tcd")) {
    var thecolor = hexToRgb("#ad1e29");
    // start with string to concatenate:
    // var rgbinteger = "" + thecolor.r + thecolor.g + thecolor.b;
    var hexdec = hexToDec("ad1e29");
    console.log(hexdec);

    msg.channel.send({embed: {
      color: hexToDec("ad1e29"),
      title: "The Common Discourse",
      fields: [
        { name: "Website", value: "https://thecommondiscourse.com", inline: false},
        { name: "Twitter", value: "https://twitter.com/tcdtweet", inline: false}
      ]
    }
    });
  }//tcd
  // from docs: https://discord.js.org/#/docs/main/master/class/DMChannel?scrollTo=send
  // Send an embed with a local image inside
// channel.send('This is an embed', {
//   embed: {
//     thumbnail: {
//          url: 'attachment://file.jpg'
//       }
//    },
//    files: [{
//       attachment: 'entire/path/to/file.jpg',
//       name: 'file.jpg'
//    }]
// })
//   .then(console.log)
//   .catch(console.error);


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
