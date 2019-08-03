var request; 

exports.run = async(client, msg, args) => {   
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
