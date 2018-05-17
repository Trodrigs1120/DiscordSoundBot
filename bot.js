const Discord = require("discord.js");
const client = new Discord.Client();
// sets the token and prefix from the config file
const config = require("./config.json")
const prefix = config.prefix
const token = config.token

client.on("ready", () => {
  console.log("I am ready!");
});
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  
  if (message.content.startsWith(prefix + "help")) {
    message.channel.send("The bot is still a work in progress but It currently has a few commands");
    message.channel.send('"!joinme" will join the bot into your channel');
    message.channel.send('"!goaway" will remove the bot from your channel');
    message.channel.send('"!dunk1", "!wimmy", and "!dave" will play the sound bite. We also have a total war rollchart if you cant make up your mind on what faction to play');

   
  }

  if (message.content.startsWith(prefix + "joinme")) {
    const channel = message.member.voiceChannel;
    channel.join()
  }

  if (message.content.startsWith(prefix + "goaway")) {
    const channel = message.member.voiceChannel;
    channel.leave();
  }

  if (message.content.startsWith(prefix + "dunk1")) {
    const channel = message.member.voiceChannel;
    channel.join()
  .then(connection => {
    const broadcast = client
    .createVoiceBroadcast()
    .playFile('./assets/dunk1.mp3');
  const dispatcher = connection.playBroadcast(broadcast);
  })
}
  if (message.content.startsWith(prefix +"wimmy")) {
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

  if (message.content.startsWith(prefix + "dave")) {
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
   if (message.content == prefix +"rollcharts"){
    message.channel.send("https://imgur.com/a/UWhXdZN");
   }

});
client.login(token);
