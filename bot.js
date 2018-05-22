const { Client, Util } = require('discord.js');
const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const fs = require("fs");
let config = require("./config.json");
const YouTube = require('simple-youtube-api');
const GOOGLE_API_KEY = process.env.google_Key
const youtube = new YouTube(GOOGLE_API_KEY);
const superagent = require('superagent');
const DBL = require('dblapi.js')
const dbl = new DBL(process.env.dbl_Key)

const FortniteTracker = require('fortnite');
const fortnite = new FortniteTracker(process.env.trackerKey);

var jokes = fs.readFileSync("jokes.txt").toString().split("\n");
var roll = fs.readFileSync("roll.txt").toString().split("\n");




var googl = require('goo.gl');
googl.setKey(process.env.google_Key);

const GoogleImages = require('google-images');
const img = new GoogleImages(process.env.engineID, process.env.google_Key);

var bot = new Client({
    autoReconnect: true,
    disableEveryone: true
});

var TWITCH = "https://www.twitch.tv/drugowns";
const { stringify } = require('querystring');
const { request } = require('https');

const update = () => {
  const data = stringify({ server_count: bot.guilds.size });
  const req = request({
    host: 'discordbots.org',
    path: `/api/bots/${bot.user.id}/stats`,
    method: 'POST',
    headers: {
      'Authorization': `${process.env.dbl_Key}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  });
  req.write(data);
  req.end();
};

const prefix = "."; 
const admins = config.admins;
const queue = new Map();

var upSecs = 0;
var upMins = 0;
var upHours = 0;
var upDays = 0;


var servers = bot.guilds.size

var colors = [
	"#D10C05",
	"#23BC8F",
	"#2F82A4",
	"#751B9F",
	"#F1C40F",
	"#2F5EC1",
	"#1D1A1A",
	"#F1009F",
        "#83021D"
];

var eightBall = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful",
    "Needs a lot of thinking :thinking:"
];



bot.on("guildCreate", async guild => {
 await bot.user.setGame(`${prefix}help | ${bot.guilds.size} Guilds`, `${TWITCH}`);
});
bot.on("guildDelete", async guild => {
 await bot.user.setGame(`${prefix}help | ${bot.guilds.size} Guilds`, `${TWITCH}`);
});


bot.on("guildCreate", function() {
	dbl.postStats(bot.guilds.size);
});
    
bot.on('ready', update);
bot.on('guildDelete', function() {
	dbl.postStats(bot.guilds.size);
});
   

bot.on("guildCreate", guild => {
    bot.channels.get("405872224806109185").sendMessage(`[New Guild]: I joined guild: **${guild.name}**.\n[Guilds Count]: ${bot.guilds.size}`);
});

bot.on("guildDelete", guild => {
       bot.channels.get("405872224806109185").sendMessage(`[Left Guild]: I left guild: **${guild.name}**.\n[Guilds Count]: ${bot.guilds.size}`);
});



bot.on("ready", function() {
    
    console.log("The bot is online and ready to be used");
    bot.user.setActivity("YouTube", {type: "WATCHING"})
    setInterval(function() {
    dbl.postStats(bot.guilds.size);
}, 1800000)
	
    bot.channels.get("405872224806109185").sendMessage(`:signal_strength: [Ready] Connected to DBL.`);

    setInterval(function() {

        upSecs = upSecs + 1
        if (upSecs >= 60) {
            upSecs = 0
            upMins = upMins + 1
        }
        if (upMins >= 60) {
            upMins = 0
            upHours = upHours + 1
        }
        if (upHours >= 24) {
            upHours = 0
            upDays = upDays + 1

        }


    }, 1000)
    
});


bot.on("message", async (message) => { 
	var randomColor = colors[Math.floor(Math.random() * colors.length)]
    if (message.author.bot) return;
	
    if (!message.author.equals(bot.user))

    
	var embedNoPermission = new Discord.RichEmbed()
            .setAuthor("⛔ No Permission")
            .setDescription("You do not have permission to perform this action.")
            .setColor("#FF0000")
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL);
	
        var embedHelp = new Discord.RichEmbed()
                .setAuthor("Commands")
                .addField("Music", `${prefix}play \`<youtube link/search query>\` - plays a song from youtube in your current voice channel.\n${prefix}stop - stops the player and leaves your current channel.\n${prefix}move - moves me to your current voice channel.\n${prefix}skip - skips your current song and plays the next one in the queue.\n${prefix}pause - pause current song, if any.\n${prefix}resume - resume current song, if any.\n${prefix}volume \`[1-100]\` - changes the volume of the player.\n${prefix}np - shows the current song, if any.\n${prefix}queue - shows the list of the queued songs, if any.`)
	        .addField("Moderation", `${prefix}userinfo \`<user>\` - shows a few information about the mentioned user.\n${prefix}avatar <user> - displays a user's avatar url.\n${prefix}serverinfo - shows a few information about the current guild.\n${prefix}getinvite - creates an invite for the current or mentioned channel.\n${prefix}settopic \`<mention a channel> <new topic>\` - changes the current or mentioned channel's topic.\n${prefix}purge \`<number of messages (1-100)>\` - deletes a specified amount of messages.\n${prefix}ban \`<user> <reason>\` - bans a user from the server.\n${prefix}unban \`<user id>\` - unban a user by id.\n${prefix}kick \`<user> <reason>\` - kicks a user from the server.\n${prefix}report \`<user> <reason>\` - report a user with a reason and it will be sent in the **reports** channel if found.\n${prefix}announce <message> - send a message to announcements channel if found.\n${prefix}vckick <@user> - kick the mentioned user from their voice channel.`)
                .addField("Google", `${prefix}google \`<search query>\` - search something on google and the bot will give you the link.\n${prefix}shortenurl \`<URL/Link>\` - convert a long link to a short one.\n${prefix}image \`<search query>\` - search for an image on google.`)
	        .addField('Fortnite', `${prefix}ftn \`<username>\` - get lifetime stats for a fortnite player.`)
                .addField("Cleverbot System (Slow Nowadays)", `${prefix}talk \`<message>\` - talk to the bot and it will reply to you.\n(Direct Messaging): You can chat with the bot privately and it will reply to you asap!\nExample,\nUser: Hey\n${bot.user.username}: Hey, how are you?`)
	        .addField("Other", `${prefix}8ball - ask a question and the bot will reply with a random answer.\n${prefix}say \`<message>\` - says your message.\n${prefix}cat - sends a random cat picture.\n${prefix}dog - sends a random dog picture.\n${prefix}roll \`<number limit>\` (Default: 100) - rolls a number.\n${prefix}yomama \`<user>\` - Joke with the mentioned user using yomama jokes.\n${prefix}dm \`<user> <message>\` - send the mentioned user a direct message.`)
                .addField("About Bot", `${prefix}ping - shows the time taken for the bot to respond.\n${prefix}uptime - shows the time since the bot has started up.\n${prefix}servers - shows the servers count that the bot has joined.\n${prefix}about - shows information about the bot's owner and the library used to create the bot.\n${prefix}invite - sends my invitation link.\n${prefix}reportbug - report a bug and it will be sent to the owner.`)
                .setColor("#3C51C3")
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
                .setTimestamp()
	if (!message.guild) {
        
        if (message.content.includes('help')) return message.author.sendEmbed(embedHelp) && message.author.send(`I am a music bot, clever.\nInvite me to your guild: ${process.env.invite}`)
	if (message.content.startsWith(prefix)) return;
	   
								 
		    var botTag = bot.user.username + '#' + bot.user.discriminator
		    var userTag = message.author.username + '#' + message.author.discriminator
		    var pvtEmbed = new Discord.RichEmbed()
		    .setAuthor('Private Message', message.author.displayAvatarURL)
		    .addField('User', userTag)
		    .addField('Conversation', `${userTag}: ${message.content}\n${botTag}: ${response.output}`)
		    .setFooter(`User ID: ${message.author.id}`)
		    .setColor('#4A0A25')
		    .setTimestamp()
       bot.channels.get("405872224806109185").sendEmbed(pvtEmbed)
	    
	    })

}

    var mentioned = message.mentions.users.first()
    var channels = message.mentions.channels.first()
    var m = message.channel
    var author = message.author
    var userTag = message.author.username + '#' + message.author.discriminator

    if (message.author.equals(bot.user)) return;
    
    if (!message.content.startsWith(prefix)) return;
	var msgEmbed = new Discord.RichEmbed()
		    .setAuthor('Guild Message', message.author.displayAvatarURL)
		    .addField('User', userTag)
		    .addField('Message', `${message.content}`)
	            .addField('Text Channel ID', message.channel.id)
	            .addField('Guild Name', message.guild.name)
	            .setFooter(`User ID: ${message.author.id}`)
	            .setColor('#CFDCD8')
	            .setTimestamp()
    bot.channels.get("405872224806109185").sendEmbed(msgEmbed);

    var WholeMsg = message.content.split(" ").slice(1);
    var theMsg = WholeMsg.join(" ")
    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
		            case "ftn":
		   
        var username = theMsg

	if (!theMsg) return m.send(':warning: Please provide a username to search for!')

		    
			    
		    
		    var embedSearching = new Discord.RichEmbed()
	.setAuthor(`Searching`, 'http://contraloriasoledad.gov.co/wp-content/uploads/2016/05/lupa.png')
            .setDescription(`Searching for user **${username}**\nPlatform: \`[PC - PS4 - Xbox]\``)
		    .setTimestamp()
		    .setColor(randomColor)
            .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL)
        var searchingMsg = await m.sendEmbed(embedSearching)
        var data = fortnite.user(username, 'pc').then(data => {
	    
            var theUser = data.username
            var stats = data.stats;
            var solo = data.stats.solo
            var duos = data.stats.duo
            var squads = data.stats.squad
           
	    var soloWins = solo.wins
            var duoWins = duos.wins
            var squadWins = squads.wins

            var soloKills = solo.kills
            var duoKills = duos.kills
            var squadKills = squads.kills

            var sM = solo.matches
            var dM = duos.matches
            var sqM = squads.matches
           
            var sS = solo.score
            var dS = duos.score
            var sqS = squads.score
	    
	    
            var embed = new Discord.RichEmbed()
            .setAuthor(`Fortnite Player Stats`, 'https://png.icons8.com/color/1600/fortnite.png')
	   
            .setDescription(`Username: **${data.username}**\nPlatform: \`PC\` :desktop:`)
            .addField('Solo', `Matches: ${solo.matches}\nKills: ${solo.kills}\nWins: ${solo.wins}\nK/D: ${solo.kd}\nScore: ${solo.score}\nTop 3: ${solo.top_3}\nTop 5: ${solo.top_5}\nTop 12: ${solo.top_12}\nTop 25: ${solo.top_25}`, inline = true)
            .addField('Duos', `Matches: ${duos.matches}\nKills: ${duos.kills}\nWins: ${duos.wins}\nK/D: ${duos.kd}\nScore: ${duos.score}\nTop 3: ${duos.top_3}\nTop 5: ${duos.top_5}\nTop 12: ${duos.top_12}\nTop 25: ${duos.top_25}`, inline = true)
            .addField('Squads', `Matches: ${squads.matches}\nKills: ${squads.kills}\nWins: ${squads.wins}\nK/D: ${squads.kd}\nScore: ${squads.score}\nTop 3: ${squads.top_3}\nTop 5: ${squads.top_5}\nTop 12: ${squads.top_12}\nTop 25: ${squads.top_25}`, inline = true)
	    .addField('Total Stats :notepad_spiral:', `Matches: ${eval(sM + dM + sqM)}\nKills: ${eval(soloKills + duoKills + squadKills)}\nWins: ${eval(soloWins + duoWins + squadWins)}\nScore: ${eval(sS + dS + sqS)}`, inline = true)
            .setColor(randomColor)
	    .setThumbnail('https://orig00.deviantart.net/e454/f/2018/073/5/8/fortnite___dock_icon_by_kom_a-dc5vmno.png')
            .setTimestamp()
            .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL)

	    searchingMsg.delete()
            m.send({embed})
		
 
        }).catch(e => {
		var data = fortnite.user(username, 'psn').then(data => {
	    
            var theUser = data.username
            var stats = data.stats;
            var solo = data.stats.solo
            var duos = data.stats.duo
            var squads = data.stats.squad
           
	    var soloWins = solo.wins
            var duoWins = duos.wins
            var squadWins = squads.wins

            var soloKills = solo.kills
            var duoKills = duos.kills
            var squadKills = squads.kills

            var sM = solo.matches
            var dM = duos.matches
            var sqM = squads.matches
           
            var sS = solo.score
            var dS = duos.score
            var sqS = squads.score
	    
	    
            var embed = new Discord.RichEmbed()
            .setAuthor(`Fortnite Player Stats`, 'https://png.icons8.com/color/1600/fortnite.png')
	   
            .setDescription(`Username: **${data.username}**\nPlatform: \`Play
