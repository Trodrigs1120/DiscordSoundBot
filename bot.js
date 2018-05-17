const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json")
client.on("ready", () => {
  console.log("I am ready!");
});
client.on("message", (message) => {
  if (message.content.startsWith("!help")) {
    message.channel.send("The bot is still a work in progress but It currently has a few commands");
    message.channel.send('"!joinme" will join the bot into your channel');
    message.channel.send('"!goaway" will remove the bot from your channel');
    message.channel.send('"!dunk1", "!wimmy", and "!dave" will play the sound bite');
   
  }

  if (message.content.startsWith("!joinme")) {
    const channel = message.member.voiceChannel;
    channel.join()
  }

  if (message.content.startsWith("!goaway")) {
    const channel = message.member.voiceChannel;
    channel.leave();
  }

  if (message.content.startsWith("!dunk1")) {
    const channel = message.member.voiceChannel;
    channel.join()
  .then(connection => {
    const broadcast = client
    .createVoiceBroadcast()
    .playFile('./assets/dunk1.mp3');
  const dispatcher = connection.playBroadcast(broadcast);
  })
}
  if (message.content.startsWith("!wimmy")) {
    const channel = message.member.voiceChannel;
    channel.join()
  .then(connection => {
    const broadcast = client
    .createVoiceBroadcast()
    .playFile('./assets/wimmy.mp3');
  const dispatcher = connection.playBroadcast(broadcast);
  })
  .catch(console.error);
  }

  if (message.content.startsWith("!dave")) {
    const channel = message.member.voiceChannel;
    channel.join()
  .then(connection => {
    const broadcast = client
    .createVoiceBroadcast()
    .playFile('./assets/takyon.mp3');
  const dispatcher = connection.playBroadcast(broadcast);
  })
  .catch(console.error);
  }
  if (message.content.)

});
client.login(config.token);
//remove this shit before you upload to github