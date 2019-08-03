exports.run = async(client, msg, args) => { 
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