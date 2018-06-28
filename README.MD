This is a small discord bot that I wrote in my spare time for use in the discord server than my friends and I use. The main purpose is to play soundfiles, post links and do character battles. 


Getting started:

1. Go to this [link] (https://discordapp.com/developers/applications/me) You will want to log in and create a new application. We want to create a bot user in the options below.

2. Now that we have a bot user we need to add it to your server. Bots are unable to accept normal invites, to work around this we will use the following link " https://discordapp.com/oauth2/authorize?client_id= Client_ID &scope=bot " in said link we need to replace "Client_ID" with the client id we previously saw when making our bot. Once you are on the page you can add the bot to any server you have the "Manager Server" permission which will be any server you created.

3. Before we move further you'll want to make sure you have the following installed, Node.js version 7.6 or higher [Download for windows users] https://nodejs.org/en/download/ using NPM we'll want to install Discord.js by running `npm init -y` and `npm i -S discord.js`

4. 






A discord bot I made to use in my own discord server. It is mainly used to play sound files and post links. It will work as long as you create a config.json file as outlined  [here](https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/getting-started/config-json-file.html).

Disclaimer: Make sure you turn your sound down, discbord bots seem to be universally very loud.

I am currently working on voting functionality. It will require mongodb but once you have a database of characters you can use them in a head to head voting competition. Examples of this could be anything from Marvel super heros, to soft drinks. I'm going to make it time sensitive so that users may do polls back to back to back. 
