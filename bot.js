const Discord = require("discord.js");
const client = new Discord.Client();
let MongoClient = require('mongodb').MongoClient;
var fs = require("fs");
// sets the token and prefix from the config file
const config = require("./config.json")
const prefix = config.prefix
const token = config.token
let VotingActive = false;
let ChoiceA = 0;
let ChoiceB = 0;
let AlreadyVoted = []
let max
let url = "mongodb://localhost:27017/";




client.on("ready", () => {
    console.log("I am ready!");
    // Checks the Length of the Database every hour minutes for new user added content
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      let dbo = db.db("characters");
      dbo.collection("character").find().toArray(function(err, result) {
        max = result.length
        console.log("Number of records: "+ max )
        
        db.close()
      })
      
    })
  }
);
let DBRefresh = setInterval(myTimer, 3600000); // the timer should be approximately an hour. It'll check for new records every hour
function myTimer() {
  let d = new Date();
  console.log("Updating db at "+ d.toLocaleTimeString());
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("characters");
    dbo.collection("character").find().toArray(function(err, result) {
      max = result.length
      console.log("Number of records: "+ max )
      
      db.close()
    })
  })

} 
  


client.on("message", (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    // images, sound files and basic commands
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (message.content.startsWith(prefix + "help")) {
        message.channel.send("The bot is still a work in progress but It currently has a few commands");
        message.channel.send('"!joinme" will join the bot into your channel');
        message.channel.send('"!goaway" will remove the bot from your channel');
        message.channel.send('"!dunk1", "!wimmy", and "!dave" will play the sound bite. We also have a total war rollchart if you cant make up your mind on what faction to play');
        message.channel.send('finally we have a poll between 2 characters that you can trigger with the !poll command, you vote via !poll A and !poll B')
        message.channel.send('Lastly you can add characters to the poll command via "!addchar NameAsOneWord UrlToJpg')
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
    if (message.content.startsWith(prefix + "wimmy")) {
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
    if (message.content == prefix + "rollchart") {
        message.channel.send("https://imgur.com/a/UWhXdZN");
    }



    // voting stuff below here
    if (VotingActive === true) {
        // doesnt seem to like the or switch because it doesnt let poll a work but poll A does
        if (message.content.startsWith(prefix + "poll A") || message.content.startsWith(prefix + "poll a")) {
            // checking for duplicate votes
            let DupFound = false;
            for (var i = 0; i < AlreadyVoted.length; i++) {
                if (AlreadyVoted[i] == message.author.username) {
                    DupFound = true;
                    message.channel.send("You cannot vote twice")
                }

            }
            if (DupFound === false) {
                AlreadyVoted.push(message.author.username)
                ChoiceA++

                console.log("Already voted 1 and 2" + AlreadyVoted[0] + AlreadyVoted[1])
                // if statements just to make sure it doesnt ever write 1 votes or 2 vote
                if (ChoiceA === 1) {
                    message.channel.send(ChoiceA + " vote received for choice A")
                } else {
                    message.channel.send(ChoiceA + " votes received for choice A")
                }
            }

        }
        if (message.content.startsWith(prefix + "poll B") || message.content.startsWith(prefix + "poll b")) {
            let DupFound = false;
            for (var i = 0; i < AlreadyVoted.length; i++) {
                if (AlreadyVoted[i] == message.author.username) {
                    DupFound = true;
                    message.channel.send("You cannot vote twice")
                }

            }
            if (DupFound === false) {
                AlreadyVoted.push(message.author.username)
                ChoiceB++

                console.log(AlreadyVoted)
                // if statements just to make sure it doesnt ever write 1 votes or 2 vote
                if (ChoiceB === 1) {
                    message.channel.send(ChoiceB + " vote received for choice B")
                } else {
                    message.channel.send(ChoiceB + " votes received for choice B")
                }
            }

        }
    }


    if (message.content == (prefix + "poll") && VotingActive != true) {



        let choice1wins = false

        let timeout = setTimeout(function() { 
    
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                let dbo = db.db("characters");

                message.channel.send("Times up!")
                if (ChoiceA > ChoiceB) {
                    choice1wins = true
                    message.channel.send(Char1Info.name + " is the winner with " + ChoiceA + " votes!")
                } else if (ChoiceA == ChoiceB) {
                    message.channel.send("No contest")
                    VotingActive = false;
                    db.close();
                    return
                } else {
                    // shouldnt need to write anything else but its here
                    message.channel.send(Char2Info.name + " is the winner with " + ChoiceB + " votes!")
                }
                if (choice1wins == true) {
                    dbo.collection("character").update({
                        "name": Char1Info.name
                    }, {
                        $set: {
                            wins: Char1Info.wins + 1
                        }
                    })
                    dbo.collection("character").update({
                        "name": Char2Info.name
                    }, {
                        $set: {
                            loses: Char2Info.loses + 1
                        }
                    })
                } else if (choice1wins == false) {
                    dbo.collection("character").update({
                        "name": Char1Info.name
                    }, {
                        $set: {
                            loses: Char1Info.wins + 1
                        }
                    })
                    dbo.collection("character").update({
                        "name": Char2Info.name
                    }, {
                        $set: {
                            wins: Char2Info.loses + 1
                        }
                    })
                }
                VotingActive = false;
                db.close();
            });


            // do I just want to run the who wins function at the end of it?
        }, 30000);
        AlreadyVoted = []
        ChoiceA = 0;
        ChoiceB = 0;
        VotingActive = true;
        // here we need to add the randomization
        // let max = 45; // 38 is the number of records I have in the db
        let char1 = Math.floor(Math.random() * Math.floor(max))
        let char2 = Math.floor(Math.random() * Math.floor(max))
        // no duplicate characters
        if (char1 === char2) {
            char1 = Math.floor(Math.random() * Math.floor(max))
            char2 = Math.floor(Math.random() * Math.floor(max))
        }
        let Char1Info = {
            name: "",
            url: "",
            wins: 0,
            loses: 0,
        }
        let Char2Info = {
            name: "",
            url: "",
            wins: 0,
            loses: 0,
        }

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db("characters");

            dbo.collection("character").find().limit(1).skip(char1).toArray(function(err, result1) {
                if (err) throw err;
                console.log(result1);

                Char1Info.name = result1[0].name
                Char1Info.url = result1[0].url
                Char1Info.wins = result1[0].wins
                Char1Info.loses = result1[0].loses
                message.channel.send(result1[0].name + " " + result1[0].url)
                message.channel.send(" Wins: " + result1[0].wins + " Losses: " + result1[0].loses)

                db.close();
            });
            dbo.collection("character").find().limit(1).skip(char2).toArray(function(err, result2) {
                if (err) throw err;
                console.log(result2);

                Char2Info.name = result2[0].name
                Char2Info.url = result2[0].url
                Char2Info.wins = result2[0].wins
                Char2Info.loses = result2[0].loses
                message.channel.send(result2[0].name + " " + result2[0].url)
                message.channel.send(" Wins: " + result2[0].wins + " Losses: " + result2[0].loses)

                db.close();
            });
        });
        message.channel.send("Type !poll A for option 1 or Type !poll B for option 2")
    }
    if (command === "addchar") {
        // let name = args[0]; // Remember arrays are 0-based!.
        // let url = args[1];
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db("characters");
            let name = args[0]; // Remember arrays are 0-based!.
            let url = args[1];
            dbo.collection("character").insert({
                name: name,
                url: url,
                wins: 0,
                loses: 0
            })

            message.reply(`Attempted to add character to database`);
            // dbo.collection("character").find({
            //     "name": name
            // }).limit(1).toArray(function(err, result) {
            //     console.log(result)
            //     message.channel.send("Here is the data that was entered if this looks wrong, send me the _id and I can always delete it")
            //     message.channel.send("id " + result[0]._id + " Name: " + result[0].name + " url: " + result[0].url)
                 db.close();

            // })
        })
    }
    // Doesnt work properly
    if (message.content == (prefix + "allchars")) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db("characters");
            dbo.collection("character").find().toArray(function(err, result) {
                for (var i = 0; i < result.length; i++) {
                    fs.appendFile("chars.txt", result[i].name + ",", function(err, data) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("Wrote to txt")



                    })
                }

            })
        })
    }

});
client.login(token);