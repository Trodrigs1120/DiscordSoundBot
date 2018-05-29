const Discord = require("discord.js");
const client = new Discord.Client();
let MongoClient = require('mongodb').MongoClient;
// sets the token and prefix from the config file
const config = require("./config.json")
const prefix = config.prefix
const token = config.token
let VotingActive=false;
let ChoiceA=0;
let ChoiceB=0;
let AlreadyVoted=[]

let url = "mongodb://localhost:27017/";



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
        
        console.log("Already voted 1 and 2" + AlreadyVoted[0] + AlreadyVoted[1])
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
   
        console.log(AlreadyVoted)
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
    
    let choice1wins=false
    let timeout = setTimeout(function () {

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("characters");

      message.channel.send("timer triggered")
      if (ChoiceA>ChoiceB){
        choice1wins=true
      } else if (ChoiceA==ChoiceB){
        message.channel.send("No contest")
        return
      } else {
        // shouldnt need to write anything else but its here
      }
      if (choice1wins==true){
        dbo.collection("character").update({"name": Char1Info.name }, {$set: {wins: Char1Info.wins+1}})
        dbo.collection("character").update({"name": Char2Info.name}, {$set: {loses: Char2Info.loses+1 }})
      message.channel.send("Tried to update id ")
      } else if (choice1wins==false){
        dbo.collection("character").update({"name": Char1Info.name }, {$set: {loses: Char1Info.wins+1}})
        dbo.collection("character").update({"name": Char2Info.name}, {$set: {wins: Char2Info.loses+1 }})
      }
        db.close();
      });


    // do I just want to run the who wins function at the end of it?
  }, 18000); 
     AlreadyVoted = []
     ChoiceA=0;
     ChoiceB=0;
    VotingActive = true;
    // here we need to add the randomization
    let max=50; // 50 is the number of records I have in the db
     let char1 = Math.floor(Math.random() * Math.floor(max))
     let char2 = Math.floor(Math.random() * Math.floor(max))
     // no duplicate characters
     if (char1===char2){
      char1 = Math.floor(Math.random() * Math.floor(max))
      char2 = Math.floor(Math.random() * Math.floor(max))
     }
     let Char1Info = {
    name : "",
    url : "",
    wins : 0,
    loses : 0,
     }
    let Char2Info={
      name : "",
      url : "",
      wins : 0,
      loses : 0,
    }

     MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      let dbo = db.db("characters");
      
      dbo.collection("character").find().limit(1).skip(char1).toArray(function(err, result1) {
        if (err) throw err;
         console.log(result1);
       
        Char1Info.name = result1[0].name
        Char1Info.url= result1[0].url
        Char1Info.wins = result1[0].wins
        Char1Info.loses = result1[0].loses
        message.channel.send(result1[0].name + " " + result1[0].url )
        message.channel.send(" Wins: " + result1[0].wins + " Losses: " + result1[0].loses)
      
        db.close();
      });
      dbo.collection("character").find().limit(1).skip(char2).toArray(function(err, result2) {
        if (err) throw err;
        console.log(result2);
       
        Char2Info.name = result2[0].name
        Char2Info.url= result2[0].url
        Char2Info.wins = result2[0].wins
        Char2Info.loses = result2[0].loses
        message.channel.send(result2[0].name + " " + result2[0].url )
        message.channel.send(" Wins: " + result2[0].wins + " Losses: " + result2[0].loses)
        
        db.close();
      });
    }); 
    message.channel.send("Type !poll A for option 1 or Type !poll B for option 2")
   }

   if (message.content == prefix +"votinginactive"){
     //just for debugging
    VotingActive===false;
   }
  //  if (message.content == (prefix + "testpoll")){
  //   let timeout = setTimeout(function () {
  //     message.channel.send("timer triggered")

  //   // do I just want to run the who wins function at the end of it?
  // }, 200); 
    
    

    
      // message.channel.send(Char1Info.name + " " + Char1Info.url )
      // message.channel.send(" Wins:" + Char1Info.wins + "Losses: " + Char1Info.loses)
    //  message.channel.send(char2)
   
   // This is going to just be the update clause that gets set
   if (message.content == (prefix + "update")){
    // psuedo coding the process 
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      let dbo = db.db("characters");
    // will need to be replaced with a variable when we merge the functionality
    if (choice1wins==true){
      dbo.collection("character").update({"name": Char1Info.name }, {$set: {wins: Char1Info.wins+1}})
      dbo.collection("character").update({"name": Char2Info.name}, {$set: {loses: Char2Info.loses+1 }})
    message.channel.send("Tried to update id ")
    } else {
      dbo.collection("character").update({"name": "35. Nico Yazawa (Love Live! School Idol Project)"}, {$set: {wins: 1}})
    message.channel.send("Tried to update id ")
    db.close();
    }
    db.close();
  }); 
  }
});
client.login(token);



// finds one db record

// dbo.collection("character").findOne({}, function(err, result) {
//   if (err) throw err;
//   console.log(result.name);
//   console.log(result)
//   db.close();
// });