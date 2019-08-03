//
const Discord = require('discord.js');
const client = new Discord.Client();
var request = require('request');
const express = require('express');
const app = express();

app.get('/', function(request, response, next) {
  response.sendFile(__dirname + '/views/index.html');
});
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Currently in ${client.guilds.size} servers.`);
  client.user.setActivity("!help | To setup do !setup | To verify do !verify");
  client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
  })
});
var arg;
client.on('message', msg => {
  if (msg.content.startsWith("!wipe")) {
    if (msg.author.id === "468959301877366784") {
      arg = msg.content.slice(5);
      msg.channel.bulkDelete(arg);
    }
  }
  var prefix = "!";
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  if (msg.content.startsWith("!login")) {
    var arg = msg.content.slice(7);
    if (!arg) {
      msg.reply("You need to provide the code. You can get this from the web dashboard. https://cuborg.xyz/dash");
    } else {
      msg.channel.send("Trying code...")
      request(`https://cuborg.xyz/gensession?code=${arg}&id=${msg.author.id}`, function (error, response, body) {
        if (body === "good") {
          msg.channel.send("Session approved.")
        } else {
          msg.channel.send("Session denied.")
        }
        if (error) {
          msg.channel.send("Session denied. [api error]")
        }
      });
    }
  }
  if (msg.content === "!new-shop") {
    msg.channel.send("https://cdn.glitch.com/0ccf1063-6b4a-4f87-aecc-107c575b33a6%2Fimage.png?v=1564430865728")  
  }
  if (msg.content === "!help") {
    msg.channel.send("**__List of Commands__**\n\n***__Verification Commands:__***\n`!verify` - to verify.\n`!setup` - to setup the bot\n`!check` - to ensure that you did the setup correctly.\n\n***__General Commands:__***\n`!new-shop` - check out what's new in the shop\n`!invite` - to add me to your server")
  }
  if (msg.content === "!invite") {
    msg.channel.send("https://cuborg.xyz/invite")
  }
  if (msg.content === '!setup') {
    msg.channel.send({
      "embed": {
        "title": "Cuborg Configuration",
        "color": 5172194,
        "thumbnail": {
          "url": "https://pbs.twimg.com/profile_images/1147918337961275392/bDcxbUpg_400x400.jpg"
        },
        "fields": [
          {
            "name": "Please click the link below to get started.",
            "value": "https://cuborg.xyz/setup"
          }
        ]
      }
    });
  }
  if (msg.content === "!check") {
    let myRole = msg.guild.roles.find(role => role.name === "verified");
    if (!myRole) {
      msg.channel.send(":x: `verified` role was not found. Please reread the instructions and try again.");
    } else {
      msg.channel.send("✅ You're all good.")
    }
  }
  if (msg.content === '!verify') {
    var myRole = msg.guild.roles.find(role => role.name === "verified");
    if (!myRole) {
      msg.channel.send("Uh Oh! This server hasn't been configured yet.")
    } else {
      
      if (msg.member.roles.find(r => r.name === "verified")) {
        return msg.reply("You already are verified on this server.")
      }
      
      msg.channel.send("Checking...")
      var user = msg.author.id;
      var pfp;
      var username;
      request(`https://cuborg.xyz/onlist?userid=${user}`, function (error, response, body) {
        if (body == "good") {
          myRole = msg.guild.roles.find(role => role.name === "verified");
          msg.member.addRole(myRole)
          request(`https://cuborg.xyz/getuser?userid=${user}`, function (error, response, bodyc) { 
            //  console.log(bodyc)
            msg.member.setNickname(bodyc)
            request(`https://cuborg.xyz/pfp?username=${bodyc}`, function (errorx, responsex, bodyx) { 
              // console.log(bodyc)
              pfp = bodyx;
            //  console.log(bodyx)
              msg.channel.send({
                "embed": {
                  "title": "Request Authorized",
                  "color": 4580684,
                  "thumbnail": {
                    "url": bodyx
                  },
                  "fields": [
                    {
                      "name": `Hi, ${msg.author.username}.`,
                      "value": "You've been verified."
                    }
                  ]
                }
              });
              // / console.log(pfp)
            });
          })
        } else {
          msg.channel.send({
            "embed": {
              "title": "One more thing to go!",
              "color": 16772608,
              "thumbnail": {
                "url": "https://pbs.twimg.com/profile_images/1147918337961275392/bDcxbUpg_400x400.jpg"
              },
              "fields": [
                {
                  "name": `Hi, ${msg.author.username}. Please go to the link below to verify your Cubash account.`,
                  "value": `https://cuborg.xyz/verify?userid=${msg.author.id}`
                }
              ]
            }
          });
        }
      });
    }
  }
});
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
//  console.log(client.guilds.forEach());
});
client.login('');
