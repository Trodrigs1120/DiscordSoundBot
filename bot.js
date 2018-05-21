const Discord = require("discord.js");
const client = new Discord.Client();
// sets the token and prefix from the config file
const config = require("./config.json")
const prefix = config.prefix
const token = config.token
let VotingActive=false;
let ChoiceA=0;
let ChoiceB=0;
let AlreadyVoted=[]

client.on("ready", () => {
  console.log("I am ready!");
});

function OutputVoteScores(){
  if (ChoiceA===1){
    message.channel.send(ChoiceA + " vote received for choice A")
  } else {
    message.channel.send(ChoiceA + " votes received for choice A")
  }
  if (ChoiceB===1){
    message.channel.send(ChoiceB + " vote received for choice B")
  } else {
    message.channel.send(ChoiceB + " votes received for choice B")
  }
}
client.on("message", (message) => {

  // images, sound files and basic commands
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



   // voting stuff below here
   if (VotingActive===true){
     // doesnt seem to like the or switch because it doesnt let poll a work but poll A does
    if (message.content === (prefix + "poll A" || prefix + "poll a" )){
      // checking for duplicate votes
      let DupFound=false;
      for (var i =0; i<AlreadyVoted.length; i++){
        if (AlreadyVoted[i]==message.author.username){
          DupFound=true;
          message.channel.send("You cannot vote twice")
        }

      } 
      if (DupFound===false){
        AlreadyVoted.push(message.author.username)
        ChoiceA++
        
        console.log(AlreadyVoted[0])
        // if statements just to make sure it doesnt ever write 1 votes or 2 vote
        if (ChoiceA===1){
          message.channel.send(ChoiceA + " vote received for choice A")
        } else {
          message.channel.send(ChoiceA + " votes received for choice A")
        }
      }
      
    }
    if (message.content.startsWith(prefix + "poll B" || prefix + "poll b")){
      let DupFound=false;
      for (var i =0; i<AlreadyVoted.length; i++){
        if (AlreadyVoted[i]==message.author.username){
          DupFound=true;
          message.channel.send("You cannot vote twice")
        }

      } 
      if (DupFound===false){
        AlreadyVoted.push(message.author.username)
        ChoiceB++
   
        console.log(AlreadyVoted[0])
        // if statements just to make sure it doesnt ever write 1 votes or 2 vote
        if (ChoiceA===1){
          message.channel.send(ChoiceB + " vote received for choice B")
        } else {
          message.channel.send(ChoiceB + " votes received for choice B")
        }
      }

    }
  }
  //
   if (message.content == (prefix + "poll")){
    // psuedo coding the process 
    
     AlreadyVoted = []
     ChoiceA=0;
     ChoiceB=0;
    VotingActive = true;
    // here we need to add the randomization
    message.channel.send("92. Zero Two (Darling in the FranXX) "+ "https://steamusercontent-a.akamaihd.net/ugc/930434788904617490/2FD303714A1FF9A548B17A4565933E54B0C58D0E/")
    message.channel.send("66. Yoko Littner (Gurren Lagann) "+  "https://steamusercontent-a.akamaihd.net/ugc/872992670372422709/5B432A73381198D27695F60EE08934AB9789B76D/")
    message.channel.send("Type !poll A for option 1 or Type !poll B for option 2")
   }

   if (message.content == prefix +"votinginactive"){
     //just for debugging
    VotingActive===false;
   }
});
client.login(token);
