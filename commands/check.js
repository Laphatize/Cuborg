exports.run = async(client, msg, args) => {   
if (msg.content === "!check") {
    let myRole = msg.guild.roles.find(role => role.name === "verified");
    if (!myRole) {
      msg.channel.send(":x: `verified` role was not found. Please reread the instructions and try again.");
    } else {
      msg.channel.send("✅ You're all good.")
    }
  }
}