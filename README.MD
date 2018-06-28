This is a small discord bot that I wrote in my spare time for use in the discord server than my friends and I use. The main purpose is to play soundfiles, post links and do character battles. 


Getting started: Installation

1. Go to this [link](https://discordapp.com/developers/applications/me) You will want to log in and create a new application. We want to create a bot user in the options below.

2. Now that we have a bot user we need to add it to your server. Bots are unable to accept normal invites, to work around this we will use the following link " https://discordapp.com/oauth2/authorize?client_id= Client_ID &scope=bot " in said link we need to replace "Client_ID" with the client id we previously saw when making our bot. Once you are on the page you can add the bot to any server you have the "Manager Server" permission which will be any server you created.

3. Before we move further you'll want to make sure you have the following installed, Node.js version 7.6 or higher [Download for windows users]https://nodejs.org/en/download/ using NPM we'll want to install Discord.js by running `npm init -y` and `npm i -S discord.js`

4. Lets get your config file made! Create a file called config.json `{
  "token": "insert bot token",
  "prefix": "!"
}` I personally use ! as my prefix but you can change it to whatever you like. On your bot's page that we set up earlier there will be a secret token that you will be inputting into your config.json file. Allow me to empasis *THIS TOKEN IS A SECRET* if you upload this token to github or anywhere else you will regret it.

5. We're now going to be setting up the database. I use [Robo3t](https://robomongo.org/) personally, but in order for that to do us any good we're going to need to install [Mongodb](https://docs.mongodb.com/manual/administration/install-community/) The documentation has instructions on getting everything set up so that you can run the `mongod` command. Once you can run the command successfully and have added mongodb to your system path. If there is any confusion you are looking for the section that says "Install MongoDB Community Edition" with "Interactive install below that"

6. With all that done we should be able to get the bot started up. In order to do so you'll want to first run `mongod` in one terminal/powershell instance and then in another navigate to where your bot is located and run `node .\bot.js`


To Do: Add usage onto the read me
