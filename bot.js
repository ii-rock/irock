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
var requestFortnite = require("request")
var nodemailer = require("nodemailer")
const dbl = new DBL(process.env.dbl_Key)

var cleverbot = require('cleverbot.io');

const FortniteTracker = require('fortnite');
const fortnite = new FortniteTracker(process.env.trackerKey);

var jokes = fs.readFileSync("jokes.txt").toString().split("\n");
var roll = fs.readFileSync("roll.txt").toString().split("\n");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.gmEm}`,
    pass: `${process.env.gmPw}`
  }
});

cbot = new cleverbot("Dw3yOhLio0NMCWsY", "yVsBq7A6MqgDDnjAjWf5cdJNZwmd3LFa");

var googl = require('goo.gl');
googl.setKey(process.env.shortenerKey);

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
	"#F1009F",
        "#83021D",
	"#818b70",
	"#ecf8ff",
	"#ffb6b1",
	"#efd19f",
	"#E1EE19",
	"#D10C05",
	"#23BC8F",
	"#2F82A4",
	"#751B9F",
	"#F1C40F",
	"#2F5EC1",
	"#1D1A1A"
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

cbot = new cleverbot(process.env.api_User, process.env.api_Password);

bot.on("message", async (message) => { 
	var randomColor = colors[Math.floor(Math.random() * colors.length)]
    if (message.author.bot) return;
	
    if (!message.author.equals(bot.user))

    
	var embedNoPermission = new Discord.RichEmbed()
            .setAuthor("⛔ Permission Missing")
            .setDescription("You do not have permission to perform this action.")
            .setColor("#FF0000")
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL);
	
        var embedHelp = new Discord.RichEmbed()
                .setAuthor("Commands")
                .addField("Music", `${prefix}play \`<youtube link/search query>\` - plays a song from youtube in your current voice channel.\n${prefix}stop - stops the player and leaves your current channel.\n${prefix}move  moves me to your current voice channel.\n${prefix}skip - skips your current song and plays the next one in the queue.\n${prefix}pause - pause current song, if any.\n${prefix}resume - resume current song, if any.\n${prefix}volume \`[1-100]\` - changes the volume of the player.\n${prefix}np - shows the current song, if any.\n${prefix}queue - shows the list of the queued songs, if any.`)
	        .addField("Moderation", `${prefix}userinfo \`<user>\` - shows a few information about the mentioned user.\n${prefix}avatar <user> - displays a user's avatar url.\n${prefix}serverinfo  shows a few information about the current guild.\n${prefix}getinvite - creates an invite for the current or mentioned channel.\n${prefix}settopic \`<mention a channel> <new topic>\` - changes the current or mentioned channel's topic.\n${prefix}purge \`<number of messages (1-100)>\` - deletes a specified amount of messages.\n${prefix}ban \`<user> <reason>\` - bans a user from the server.\n${prefix}unban \`<user id>\` - unban a user by id.\n${prefix}kick \`<user> <reason>\` - kicks a user from the server.\n${prefix}report \`<user> <reason>\` - report a user with a reason and it will be sent in the **reports** channel if found.\n${prefix}announce <message> - send a message to announcements channel if found.\n${prefix}vckick \`<@user>\` - kick the mentioned user from their voice channel.`)
                .addField("Google", `${prefix}google \`<search query>\` - search something on google and the bot will give you the link.\n${prefix}shortenurl \`<URL/Link>\` - convert a long link to a short one.\n${prefix}image \`<search query>\` - search for an image on google.`)
	        .addField('Fortnite', `${prefix}ftn \`<username>\` - get lifetime stats for a fortnite player.\n${prefix}ftn wins \`<your wins>\` - adds your wins to your nickname.\n${prefix}ftn server - get fortnite server status.`)
                .addField("Cleverbot System (Slow Nowadays)", `${prefix}talk \`<message>\` - talk to the bot and it will reply to you.\n(Direct Messaging): You can chat with the bot privately and it will reply to you asap!\nExample,\nUser: Hey\n${bot.user.username}: Hey, how are you?`)
	        .addField("Other", `${prefix}sendmail \`<email address>\` \`<message>\` - send an email to your friends!\n${prefix}8ball \`<question>\` - ask a question and the bot will reply with a random answer.\n${prefix}say \`<message>\` - says your message.\n${prefix}cat - sends a random cat picture.\n${prefix}dog - sends a random dog picture.\n${prefix}roll \`<number limit>\` (Default: 100) - rolls a number.\n${prefix}yomama \`<user>\` - joke with the mentioned user using yomama jokes.\n${prefix}dm \`<user> <message>\` - send the mentioned user a direct message.`)
                .addField("About Bot", `${prefix}ping - shows the time taken for the bot to respond.\n${prefix}uptime - shows the time since the bot has started up.\n${prefix}servers - shows the servers count that the bot has joined.\n${prefix}about  shows information about the bot's owner and the library used to create the bot.\n${prefix}invite - sends my invitation link.\n${prefix}reportbug - report a bug and it will be sent to the owner.`)
                .setColor("#ffb6b1")
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
		    case "sendmail":
			 if (!args[1]) return m.send(':warning: Please provide an Email!')
			 if (!theMsg.replace(args[1], "")) return m.send(':warning: Please provide a message to send!')
			 var mailOptions = {
  from: 'glorydiscordbot@gmail.com',
  to: args[1],
  subject: `[Discord] Rocky - Message from ${message.author.username}#${message.author.discriminator}`,
  text: `${message.author.username}#${message.author.discriminator} said: ${theMsg.replace(args[1], "")}\n\n\nThis email was sent by using .sendmail command on Discord. You can use it right now too!\n\nInvite me to your server through this link: ${process.env.invite}`
};
var emailSending = new Discord.RichEmbed()
	.setAuthor("Email Service")
    .setDescription("[Pending] Please wait, we are currently sending your Email.")
    .setColor("#2772C6")
	.setTimestamp()
    .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL)

     var sending = await message.channel.send(emailSending);

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
  if (error.message === "No recipients defined") {
  sending.delete()
  message.channel.send(':warning: Invalid Email submitted! Please try another one.')
  } else {
  sending.delete()
  message.channel.send(error.message)
  
  console.log(error);
  }
  } else {
    console.log('Email sent: ' + info.response);
	  sending.delete()
	var emailSent = new Discord.RichEmbed()
	.setAuthor("Email Service")
    .setDescription("Successfully sent an Email")
    .setColor("#2772C6")
    .addField("Sent by", message.author.username + "#" + message.author.discriminator, inline = true)
    .addField("Sent to", args[1], inline = true)
    .addField("Message", theMsg.replace(args[1], ""), inline = true)
	.setTimestamp()
    .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL)

     message.channel.send(emailSent);
  }
});
			 break;
		            case "ftn":
        var username = theMsg
	if (args[1] === 'wins' && !isNaN(args[2])) {
		try {
		message.member.setNickname(`${message.author.username} 🏆 ${args[2]}`)
		message.reply('Your wins has been added to your nickname :white_check_mark:')
		} catch (err) {
		message.reply(err.message)
		}
	} else if (args[1] === 'server' || args[1] === 'servers' && !args[2]) {
		var options = {
  method: "GET",
  url: `https://fortnite.y3n.co/v2/gamestatus`,
  headers: {
    'User-Agent': 'nodejs request',
    'X-Key': `${process.env.fnbrKey}`
  }
		}
			requestFortnite(options, (error, response, body) => {
  if (!error && response.statusCode == 200) {
    var stats = JSON.parse(body);
    if (stats.status === 'UP') {
	    var embedOnline = new Discord.RichEmbed()
	.setAuthor(`Fortnite Server Status`, 'https://png.icons8.com/color/1600/fortnite.png')
            .setDescription(`Servers are **ONLINE**.`)
		    .setTimestamp()
	            .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL)
		    .setColor('#008000')
    m.sendEmbed(embedOnline)
		
} else {
	var embedOffline = new Discord.RichEmbed()
	.setAuthor(`Fortnite Server Status`, 'https://png.icons8.com/color/1600/fortnite.png')
            .setDescription(`Servers are currently **OFFLINE**.`)
		    .setTimestamp()
	            .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL)
		    .setColor('#ff0000')
    m.sendEmbed(embedOffline)


  }
}
})
	} else {
	
	if (!theMsg) return m.send(':warning: Please provide a username to search for!')

		    
			    
		    
		    var embedSearching = new Discord.RichEmbed()
	.setAuthor(`Searching`, 'https://png.icons8.com/color/1600/fortnite.png')
            .setDescription(`Searching for player **${username}**\nPlatform: \`PC - Xbox - PlayStation\``)
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
	    .addField("Username", `${data.username}`)
	    .addField("Platform", `PC :computer:`)
            .addField('Solo Mode :bust_in_silhouette:', `Matches: \`${solo.matches}\`\nKills: \`${solo.kills}\`\nWins: \`${solo.wins}\`\nK/D: \`${solo.kd}\`\nScore: \`${solo.score}\`\nTop 3: \`${solo.top_3}\`\nTop 5: \`${solo.top_5}\``, inline = true)
            .addField('Duos Mode :busts_in_silhouette:', `Matches: \`${duos.matches}\`\nKills: \`${duos.kills}\`\nWins: \`${duos.wins}\`\nK/D: \`${duos.kd}\`\nScore: \`${duos.score}\`\nTop 3: \`${duos.top_3}\`\nTop 5: \`${duos.top_5}\``, inline = true)
            .addField('Squads Mode :busts_in_silhouette::busts_in_silhouette:', `Matches: \`${squads.matches}\`\nKills: \`${squads.kills}\`\nWins: \`${squads.wins}\`\nK/D: \`${squads.kd}\`\nScore: \`${squads.score}\`\nTop 3: \`${squads.top_3}\`\nTop 5: \`${squads.top_5}\``, inline = true)
	    .addField('Total Stats :beginner:', `Matches: \`${eval(sM + dM + sqM)}\`\nKills: \`${eval(soloKills + duoKills + squadKills)}\`\nWins: \`${eval(soloWins + duoWins + squadWins)}\`\nScore: \`${eval(sS + dS + sqS)}\``, inline = true)
            .setColor(randomColor)
	    .setThumbnail('https://apkplz.com/storage/images/com/wallpaperfort/background/300/fortnite-wallpaper-hd-skins-amp-background.png')
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
 	  .addField("Username", `${data.username}`)
	  .addField("Platform", `PlayStation :video_game:`)
          .addField('Solo Mode :bust_in_silhouette:', `Matches: \`${solo.matches}\`\nKills: \`${solo.kills}\`\nWins: \`${solo.wins}\`\nK/D: \`${solo.kd}\`\nScore: \`${solo.score}\`\nTop 3: \`${solo.top_3}\`\nTop 5: \`${solo.top_5}\``, inline = true)
          .addField('Duos Mode :busts_in_silhouette:', `Matches: \`${duos.matches}\`\nKills: \`${duos.kills}\`\nWins: \`${duos.wins}\`\nK/D: \`${duos.kd}\`\nScore: \`${duos.score}\`\nTop 3: \`${duos.top_3}\`\nTop 5: \`${duos.top_5}\``, inline = true)
          .addField('Squads Mode :busts_in_silhouette::busts_in_silhouette:', `Matches: \`${squads.matches}\`\nKills: \`${squads.kills}\`\nWins: \`${squads.wins}\`\nK/D: \`${squads.kd}\`\nScore: \`${squads.score}\`\nTop 3: \`${squads.top_3}\`\nTop 5: \`${squads.top_5}\``, inline = true)
     .addField('Total Stats :beginner:', `Matches: \`${eval(sM + dM + sqM)}\`\nKills: \`${eval(soloKills + duoKills + squadKills)}\`\nWins: \`${eval(soloWins + duoWins + squadWins)}\`\nScore: \`${eval(sS + dS + sqS)}\``, inline = true)
          .setColor(randomColor)
	    .setThumbnail('https://apkplz.com/storage/images/com/wallpaperfort/background/300/fortnite-wallpaper-hd-skins-amp-background.png')
          .setTimestamp()
          .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL)

     searchingMsg.delete()
          m.send({embed})
 		}).catch(e => {
 		var data = fortnite.user(username, 'xbl').then(data => {
     
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
    
	  .addField("Username", `${data.username}`)
	  .addField("Platform", `Xbox :video_game:`)
          .addField('Solo Mode :bust_in_silhouette:', `Matches: \`${solo.matches}\`\nKills: \`${solo.kills}\`\nWins: \`${solo.wins}\`\nK/D: \`${solo.kd}\`\nScore: \`${solo.score}\`\nTop 3: \`${solo.top_3}\`\nTop 5: \`${solo.top_5}\``, inline = true)
          .addField('Duos Mode :busts_in_silhouette:', `Matches: \`${duos.matches}\`\nKills: \`${duos.kills}\`\nWins: \`${duos.wins}\`\nK/D: \`${duos.kd}\`\nScore: \`${duos.score}\`\nTop 3: \`${duos.top_3}\`\nTop 5: \`${duos.top_5}\``, inline = true)
          .addField('Squads Mode :busts_in_silhouette::busts_in_silhouette:', `Matches: \`${squads.matches}\`\nKills: \`${squads.kills}\`\nWins: \`${squads.wins}\`\nK/D: \`${squads.kd}\`\nScore: \`${squads.score}\`\nTop 3: \`${squads.top_3}\`\nTop 5: \`${squads.top_5}\``, inline = true)
     .addField('Total Stats :beginner:', `Matches: \`${eval(sM + dM + sqM)}\`\nKills: \`${eval(soloKills + duoKills + squadKills)}\`\nWins: \`${eval(soloWins + duoWins + squadWins)}\`\nScore: \`${eval(sS + dS + sqS)}\``, inline = true)
          .setColor(randomColor)
     .setThumbnail('https://apkplz.com/storage/images/com/wallpaperfort/background/300/fortnite-wallpaper-hd-skins-amp-background.png')
          .setTimestamp()
          .setFooter('Requested by ' + message.author.username + '#' + message.author.discriminator, message.author.displayAvatarURL)

     searchingMsg.delete()
          m.send({embed})
 }).catch (e => {
          console.log(e)
          searchingMsg.delete()
 	message.channel.send(`:negative_squared_cross_mark: Player **${username}** was not found!`)
 	
          })
 }) 
 
		
 });
	}
      break;
     case "dm":
 	    if (!mentioned) return m.send('Come on, that\'s not possible, you have to mention a user!')
 	   if (!theMsg.replace(mentioned, '')) return m.send(':poop: Discord does not allow empty messages...')
 	    var embedDm = new Discord.RichEmbed()
     .setAuthor(`Direct Message`, mentioned.displayAvatarURL)
     .setColor('#0000FF')
     .setDescription(`Direct message have been sent to ${mentioned}`)
     .addField('Message', theMsg.replace(mentioned, ''))
     .setTimestamp()
      m.sendEmbed(embedDm)
 	    mentioned.send(`[Direct Message] :speech_balloon: ${author.username}#${author.discriminator}: ${theMsg.replace(mentioned, '')}`)
                 
     break;
     case "yomama":
     if (!mentioned) return m.send(':warning: You have to mention a user!')
     var joke = jokes[Math.floor(Math.random() * jokes.length)]
          if (mentioned.id === bot.user.id) return m.send(`You won't get jokes about my mama :stuck_out_tongue_closed_eyes:\n${author}, ${joke}`)
     
     m.send(`${mentioned}, ${joke}`)
     break;
     case "roll":
      if (!args[1]) {
      var rolls = roll[Math.floor(Math.random() * roll.length)]
      var embedRoll = new Discord.RichEmbed()
     .setAuthor(`${message.author.username}#${message.author.discriminator} rolls a dice`, message.author.displayAvatarURL)
     .setColor('#0000FF')
     .setDescription(`:game_die: ${rolls}`)
     .setTimestamp()
      m.sendEmbed(embedRoll)
 } else {
 	if (isNaN(args[1])) return msg.channel.send(":x: Please provide a number limit.");
 	var rolls = Math.floor(Math.random() * args[1]) + 1  
      var embedRoll = new Discord.RichEmbed()
     .setAuthor(`${message.author.username}#${message.author.discriminator} rolled a dice`, message.author.displayAvatarURL)
     .setColor('#0000FF')
     .setDescription(`:game_die: ${rolls}`)
     .setTimestamp()
      m.sendEmbed(embedRoll)
 }
      break;
      case "shortenurl":
  	googl.getKey();
  	googl.shorten(args[1])
 	    
  .then(function (shortUrl) {
  	var embed = new Discord.RichEmbed()
  .setAuthor("URL Shortened", "https://cdn.pixabay.com/photo/2015/10/31/12/56/google-1015752_960_720.png")
  .setDescription(`Your URL has been shortened.`)
  .setColor("#166338")
  .addField("Original URL", `${args[1]}`)
  .addField("Shortened URL", shortUrl)
  .setFooter(`Shortened by ${author.username}#${author.discriminator}`, author.displayAvatarURL)
  .setTimestamp()

      m.send({embed});
  })
  .catch(function (err) {
  	var embed = new Discord.RichEmbed()
  .setAuthor("ERROR")
  .setDescription(`${err.message}`)
  .setColor("#FF0000")

      m.send({embed});
  });
  break;
  	case "settopic":
 
  	if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return m.send("Permission `MANAGE_CHANNELS` is missing!")
  	
  	
 if (!channels) {
  	if (!theMsg) return m.send(`:information_source: The topic cannot be empty.\nUsage: \`${prefix}settopic <channel> <new topic>\``)
 if (message.channel.topic === theMsg) return m.send("That topic is already set!");
          let embed = new Discord.RichEmbed()
  .setAuthor("Topic Changed")
  .setDescription(`${message.channel}'s topic has been changed.`)
  .setColor("#166338")
  if (message.channel.topic == "") {
     embed.addField("Old Topic", "`EMPTY`")
  } else {
     embed.addField("Old Topic", message.channel.topic)
  }
     embed.addField("New Topic", theMsg)
  
  embed.setFooter(`Requested by ${author.username}#${author.discriminator}`, author.displayAvatarURL)
  embed.setTimestamp()
      m.send({embed});
 message.channel.edit({ topic: `${theMsg}` }, `Changed by ${author.username}#${author.discriminator}`)
     
  } else {
 if (!theMsg.replace(channels, "")) return m.send(`:information_source: The topic cannot be empty.\nUsage: \`${prefix}settopic <channel> <new topic>\``)
  	if (channels.topic === theMsg.replace(channels, "")) return m.send(`:x: The same topic for ${channels} is already set!`);
  	
      let embed = new Discord.RichEmbed()
  .setAuthor("Topic Changed")
  .setDescription(`${channels}'s topic has been changed.`)
  .setColor("#166338")
  if (channels.topic === "") {
     embed.addField("Old Topic", "`EMPTY`")
  } else {
     embed.addField("Old Topic", channels.topic)
  }
     embed.addField("New Topic", theMsg.replace(channels, ""))
  embed.setFooter(`Requested by ${author.username}#${author.discriminator}`, author.displayAvatarURL)
  embed.setTimestamp()
  
      m.send({embed});
  	channels.edit({ topic: `${theMsg.replace(channels, "")}` }, `Changed by ${author.username}#${author.discriminator}`)
  }
  
  	break;
  	case "google":
  	if (theMsg.length < 1) {
  		m.send(":x: Please enter a search query.");
  	} else {
        var Result = "http://www.google.com/search?hl=en&q=" + theMsg.split(' ').join('+');
       let embed = new Discord.RichEmbed()
   .setAuthor("Google Search", 'https://cdn.pixabay.com/photo/2015/10/31/12/56/google-1015752_960_720.png')
  .setDescription("You've searched on google.")
  .setColor("#15f153")
  .addField("Search Result", `**[Click Here](${Result})**`, inline = true)
  .addField("Search Query", theMsg, inline = true)
  .setFooter(`Requested by ${author.username}#${author.discriminator}`, author.displayAvatarURL)
  .setTimestamp()
      m.send({embed});
  	}
  	 
      break;
      case "talk":
          message.channel.startTyping()
          cbot.setNick('Rocky')
    	cbot.create(function (err, session) {
  cbot.ask(theMsg, function (err, response) {
  m.send(response); // Will likely be: "Living in a lonely world"
});
});
    message.channel.stopTyping()  
                      
          break;
          
          case "getinvite":
      if (!channels) {
          message.channel.createInvite(maxAge = 0,`Created by ${message.author.username}#${message.author.discriminator}`)
          .then(theInvite => m.send(`Successfully created an invitation for the channel ${message.channel}\nURL: ${theInvite}`))

       
      } else {

          channels.createInvite(maxAge = 0, `Created by ${message.author.username}#${message.author.discriminator}`)
          .then(theInvite => m.send(`Successfully created an invitation for the channel ${channels}\nURL: ${theInvite}`))

      }
      break;
      case "say":
      message.delete();
  message.channel.send(theMsg)

      break;
      case "serverinfo":
      if (!message.guild) return;
      let sicon = message.guild.iconURL;
      let serverembed = new Discord.RichEmbed()
  .setAuthor("Server Information", sicon)
  .setColor("#39AA54")
  .setFooter(`Requested by ${message.author.username}#${author.discriminator}`, message.author.displayAvatarURL)
  .addField("Server Name", message.guild.name, inline = true)
  .addField("Server Owner", (`${message.guild.owner.displayName}#${message.guild.owner.user.discriminator}`), inline = true)
  .addField("Server ID", message.guild.id, inline = true)
  .addField("Region", message.guild.region, inline = true)
  .addField("Created On", message.guild.createdAt.toString().replace("GMT+0000 (UTC)", ""), inline = true)
  .addField("You Joined At", message.member.joinedAt.toString().replace("GMT+0000 (UTC)", ""), inline = true)
  .addField("Total Members", message.guild.memberCount, inline = true);
  

   message.channel.sendEmbed(serverembed);
   break;
      case "invite":
 	    var embeed = new Discord.RichEmbed()
              .setAuthor("My Invitation URL", bot.user.displayAvatarURL)
              .setDescription(`${process.env.invite}`)
              .setColor("#888670")
              .setTimestamp()
	      .setFooter(`Requested by ${message.author.username}#${author.discriminator}`, message.author.displayAvatarURL)
          message.channel.sendEmbed(embeed);
          break;
      case "help":
         
        if (config.admins.includes(message.author.id)) embedHelp.addField("Owner Commands", `${prefix}close  closes the websocket connection and disconnects the bot.\n${prefix}restart  restarts the bot.\n${prefix}setstatus  changes my state.\n${prefix}setgame  makes me play a specified game.\n${prefix}watch  sets my status to Watching.\n${prefix}listen  sets my status to Listening.\n${prefix}stream  sets my status to Streaming.\n${prefix}setname  changes my username.\n${prefix}setavatar  changes my avatar.\n${prefix}eval  runs a code inside the console and returns the result.`)
          message.channel.sendEmbed(embedHelp);

          break;
   break;
      case "reportbug":
          var embedRep = new Discord.RichEmbed()
              .setAuthor("Bug Reported")
              .setDescription("Your report has been sent to the owner.")
              .addField("Your Report Message", `${theMsg}`)
              .setColor("#C94830")
              .setTimestamp()
          message.channel.send(embedRep);
          var embeed2 = new Discord.RichEmbed()
              .setAuthor("Bug Report")
              .setDescription("A user has reported a bug, here is the information.")
              .addField("Report Message", `${theMsg}`, inline = true)
              .addField("Reporter ID", `${message.author.id}`, inline = true)
              .addField("Reporter Username", `${message.author.username}#${message.author.discriminator}`, inline = true)
         .addField("Channel ID", `\`${message.channel.id}\``)
              .setColor("#C94830")
              .setTimestamp()
          bot.channels.get("406182116712513537").send(embeed2);
          break;
       case "about":
          var owner = bot.users.get(`295233686893232129`).username + "#" + bot.users.get(`295233686893232129`).discriminator
          var embedAbout = new Discord.RichEmbed()
              .setAuthor("About Me", bot.user.displayAvatarURL)
              .setDescription("A few information about me and my owner.")
              .addField("My Owner", `${owner}`, inline = true)
	      .addField("About Me", `I can play music, moderate your server, get images from google, shorten links, get fortnite players stats and more!`)
              .addField("Library Used", "Discord.js", inline = true)
              .setColor("#C94830")
              .setFooter(`Requested by ${message.author.username}#${author.discriminator}`, message.author.displayAvatarURL)
              .setTimestamp()
          message.channel.sendEmbed(embedAbout);
             
          break;

       case "setavatar":
    if (!config.admins.includes(message.author.id)) return m.sendEmbed(embedNoPermission)
         if (!args[1]) return m.sendMessage("The avatar cannot be empty!");
 	  try {
     bot.user.setAvatar(args[1]);
          
          var embedAv = new Discord.RichEmbed()
              .setAuthor("Avatar Changed")
              .setDescription(`My profile picture has been successfully changed.`)
              .setThumbnail(args[1])
              .setColor("#888670")
              .setTimestamp()
          message.channel.sendEmbed(embedAv);
   } catch (error) {
 	  message.channel.send(error)
   }
      break;
      case "setname":
    if (!config.admins.includes(message.author.id)) return m.sendEmbed(embedNoPermission)
         if (theMsg.length = 0) {
          m.sendMessage("The username cannot be empty!");
         } else {
          
 	   var embedUsername = new Discord.RichEmbed()
              .setAuthor("Username Changed", bot.user.displayAvatarURL)
              .setDescription(`My username has been successfully changed.`)
 	.addField("Old Username", `${bot.user.username}`, inline = true)
 	.addField("New Username", `${theMsg}`, inline = true)
              .setColor("#C94830")
              .setTimestamp()
          message.channel.sendEmbed(embedUsername);
          bot.user.setUsername(theMsg);
         }
         break;
 case "setnick":
    if (!config.admins.includes(message.author.id) || !message.member.hasPermission('MANAGE_NICKNAMES')) return m.sendEmbed(embedNoPermission)
         if (theMsg.length = 0) {
          m.sendMessage("The nickname cannot be empty!");
         } else {
          
 	   var embedNickname = new Discord.RichEmbed()
              .setAuthor("Nickname Changed", bot.user.displayAvatarURL)
              .setDescription(`My nickname has been successfully changed.`)
 	.addField("Old Nickname", `${message.guild.me.nickname}`, inline = true)
 	.addField("New Nickname", `${theMsg}`, inline = true)
              .setColor("#C94830")
              .setTimestamp()
          message.channel.sendEmbed(embedNickname);
          message.guild.me.setNickname(theMsg);
         }
         break;
     case "avatar":
 	    if (!message.mentions.users.first()) {
          var embedInfo = new Discord.RichEmbed()
              .setAuthor("Your Avatar")
              .setDescription(message.author.displayAvatarURL)
         .setFooter(`Requested by ${message.author.username}#${author.discriminator}`, message.author.displayAvatarURL)
              .setImage(message.author.avatarURL)
              .setColor("#46925F")
              .setTimestamp()
     message.channel.sendEmbed(embedInfo)
          } else if (!message.guild) {
             m.reply("You can't use this command in private messages.")
         } else if (mentioned === message.author) {
          var embedInfo2 = new Discord.RichEmbed()
              .setAuthor("Your Avatar")
              .setDescription(message.author.displayAvatarURL)
         .setFooter(`Requested by ${message.author.username}#${author.discriminator}`, message.author.displayAvatarURL)
              .setImage(message.author.avatarURL)
              .setColor("#46925F")
              .setTimestamp()
     message.channel.sendEmbed(embedInfo2)
     } else {
          var embedInfo3 = new Discord.RichEmbed()
              .setAuthor(mentioned.username + "#" + mentioned.discriminator + "'s Avatar")
              .setDescription(message.mentions.users.first().displayAvatarURL)
         .setColor("#46925F")
              .setImage(mentioned.displayAvatarURL)
         .setFooter(`Requested by ${message.author.username}#${author.discriminator}`, message.author.displayAvatarURL)
              .setTimestamp()
     message.channel.sendEmbed(embedInfo3)
     }
break;
      case "userinfo":
         if (!message.mentions.users.first()) {
          var embedInfo = new Discord.RichEmbed()
              .setAuthor("Your Information", message.author.displayAvatarURL)
              .setDescription(`Here is your account information`)
              .addField("User ID", message.author.id)
              .addField("User Registeration Date", message.author.createdAt.toString().replace("GMT+0000 (UTC)", ""))
         .addField("Guild Join Date", message.member.joinedAt.toString().replace("GMT+0000 (UTC)", ""))
         .setFooter(`Requested by ${message.author.username}#${author.discriminator}`, message.author.displayAvatarURL)
              .setThumbnail(message.author.avatarURL)
              .setColor("#46925F")
              .setTimestamp()

     
     if (!message.member.voiceChannel) {
 	    embedInfo.addField("Voice Channel", 'Not connected')
     } else {
 	    embedInfo.addField("Voice Channel", message.member.voiceChannel.name)
     }

          message.channel.sendEmbed(embedInfo);
         } else if (!message.guild) {
             m.reply("You can't use this command in private messages.")
         } else if (mentioned === message.author) {
          var embedInfo2 = new Discord.RichEmbed()
              .setAuthor("Your Information", message.author.displayAvatarURL)
              .setDescription(`Here is your account information`)
              .addField("User ID", message.author.id)
              .addField("User Registeration Date", message.author.createdAt.toString().replace("GMT+0000 (UTC)", ""))
         .addField("Guild Join Date", message.member.joinedAt.toString().replace("GMT+0000 (UTC)", ""))
              .setThumbnail(message.author.avatarURL)
         .setFooter(`Requested by ${message.author.username}#${author.discriminator}`, message.author.displayAvatarURL)
              .setColor("#46925F")
              .setTimestamp()

     if (!message.member.voiceChannel) {
 	    embedInfo2.addField("Voice Channel", 'Not connected')
     } else {
 	    embedInfo2.addField("Voice Channel", message.member.voiceChannel.name)
     }

          message.channel.sendEmbed(embedInfo2);
      } else {
          var embedInfo3 = new Discord.RichEmbed()
              .setAuthor(mentioned.username + "#" + mentioned.discriminator + "'s Information", mentioned.displayAvatarURL)
              .setDescription(`Here is ${mentioned.username}#${mentioned.discriminator}'s information`)
              .addField("User ID", message.mentions.users.first().id)
              .addField("User Registeration Date", mentioned.createdAt.toString().replace("GMT+0000 (UTC)", ""))
         .addField("Guild Join Date", message.mentions.members.first().joinedAt.toString().replace("GMT+0000 (UTC)", ""))
         .setColor("#0000FF")
              .setThumbnail(mentioned.avatarURL)
         .setFooter(`Requested by ${message.author.username}#${author.discriminator}`, message.author.displayAvatarURL)
              .setTimestamp()
 	
     if (!message.mentions.members.first().voiceChannel) {
 	    embedInfo3.addField("Voice Channel", 'Not connected')
     } else {
 	    embedInfo3.addField("Voice Channel", message.mentions.members.first().voiceChannel.name)
     }

          message.channel.sendEmbed(embedInfo3);
         }
         break;
      case "close":
      if (!config.admins.includes(message.author.id)) return m.sendEmbed(embedNoPermission)
      let embeds = new Discord.RichEmbed()
          .setAuthor("Connection Closed")
          .setDescription(`Connection with discord servers has disconnected.`)
          .setColor("#FF0000")
          .setTimestamp()

          message.channel.sendEmbed(embeds);

          bot.destroy();
          break;
      case "uptime":
      let embedr = new Discord.RichEmbed()
          .setAuthor("Current Uptime")
          .setDescription(upDays + " Days, " + upHours + " Hours, " + upMins + " Minutes, " + upSecs + " Seconds")
          .setColor(randomColor)
          .setTimestamp()
          message.channel.sendEmbed(embedr);
          break;
      case "servers":
      let embedo = new Discord.RichEmbed()
          .setAuthor("Servers Count")
          .setDescription(`I am in ${bot.guilds.size} servers`)
          .setColor(randomColor)
          .setTimestamp()
          message.channel.sendEmbed(embedo);
          break;
      case "ping":
      let embedg = new Discord.RichEmbed()
          .setAuthor("My Ping")
          .setDescription(`${bot.ping.toString()}ms`)
          .setColor(randomColor)
          .setTimestamp()
          message.channel.sendEmbed(embedg);
          break;
      case "8ball":
          if (args[1]) message.channel.sendMessage(eightBall[Math.floor(Math.random() * eightBall.length)]);
          else message.channel.sendMessage("Can't read that");
          break;
      case "restart":
      if (!config.admins.includes(message.author.id)) return m.send("You do not have permissions to perform this action.")
         message.channel.sendMessage("Alright, i will restart asap...");
          bot.destroy()
          bot.login(process.env.TOKEN);
          message.channel.sendMessage("I've successfully restarted.");
          
         break;
 case "move":
      if (!message.guild.voiceConnection) return m.send(":warning: I am not connected to any voice channel")
      if (!message.member.voiceChannel) return m.send(":warning: You are not connected to any voice channel.")
      if (message.member.voiceChannel == message.guild.me.voiceChannel) return m.send(":warning: Cannot move to the same voice channel, please enter another one first.")
          message.member.voiceChannel.join()
          m.send(`:white_check_mark: Successfully moved to **${message.member.voiceChannel.name}**.`)
      break;
  }
});

bot.on('message', async msg => {
  if (!msg.content.startsWith(prefix)) return;
 if (msg.author.bot) return;
 
  if (!msg.author.equals(bot.user))

  var arg = msg.content.substring(prefix.length).split(" ");
 
  const searchString = arg.slice(1).join(' ');
  const url = arg[1] ? arg[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(msg.guild.id);
  var WholeMsg = msg.content.split(" ").slice(1)
  var theMsg = WholeMsg.join(" ")
  var m = msg.channel
  	    let embedNoPermission = new Discord.RichEmbed()
          .setAuthor("⛔ No Permission")
          .setDescription("You do not have permission to perform this action.")
          .setColor("#FF0000")
          .setTimestamp()
          .setFooter(`Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
 
  switch (arg[0].toLowerCase()) {
     case "setstatus":
 	    if (!config.admins.includes(msg.author.id)) return m.sendEmbed(embedNoPermission)
 	    if (!theMsg) return m.send(`Usage: \`${prefix}setstatus <online / busy / offline / idle>\``)
 	    let embedNewState = new Discord.RichEmbed()
          .setAuthor("Status Updated")
          .setColor("#518CF1")
          .setTimestamp()
          .setFooter(`Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
 	    if (theMsg === 'online') {
 		    bot.user.setStatus('online')
 		    embedNewState.setDescription("My status has been set to `Online`")
 		    m.sendEmbed(embedNewState)
 	    } else if (theMsg === 'busy') {
 		     bot.user.setStatus('dnd')
 		    embedNewState.setDescription("My status has been set to `Do Not Disturb`")
 		    m.sendEmbed(embedNewState)
 	    } else if (theMsg === 'idle') {
 		     bot.user.setStatus('idle')
 		    embedNewState.setDescription("My status has been set to `Idle`")
 		    m.sendEmbed(embedNewState)
 	    } else if (theMsg === 'offline') {
 		     bot.user.setStatus('invisible')
 		    embedNewState.setDescription("My status has been set to `Offline`")
 		    m.sendEmbed(embedNewState)
 	    } else {
 		    m.send(`Usage: \`${prefix}setstatus <online / busy / offline / idle>\``)
 	    }
 	    break;
 case "setgame":
 	  if (!config.admins.includes(msg.author.id)) return m.sendEmbed(embedNoPermission)
 	   if (!theMsg) return m.send(":warning: The game cannot be empty.")
 	  let embedGame = new Discord.RichEmbed()
              .setAuthor("State Changed")
 	if (theMsg === "h+g") {
              embedGame.setDescription(`Now playing **${prefix}help | ${bot.guilds.size} Guilds**`)
 	} else if (theMsg === "h+u") {
 	embedGame.setDescription(`Now playing **${prefix}help | ${bot.users.size} Users**`)	
 	} else {
 	embedGame.setDescription(`Now playing **${theMsg}**`)
              }
              embedGame.setColor("#C94830")
              embedGame.setTimestamp()
          msg.channel.sendEmbed(embedGame);
         if (theMsg === "h+g") {
          await bot.user.setActivity(`${prefix}help | ${bot.guilds.size} Guilds`, {type: "PLAYING"});
    } else if (theMsg === "h+u") {
          await bot.user.setActivity(`${prefix}help | ${bot.users.size} Users`, {type: "PLAYING"});
    } else {
          await bot.user.setActivity(theMsg, {type: "PLAYING"});
         }
 	    break;
      case "listen":
 if (!config.admins.includes(msg.author.id)) return m.sendEmbed(embedNoPermission)
 if (!theMsg) return m.send(":warning: Cannot listen to nothing!")
      var embedListen = new Discord.RichEmbed()
              .setAuthor("State Changed")
              if (theMsg === "h+g") {
              embedListen.setDescription(`Now listening to **${prefix}help | ${bot.guilds.size} Guilds**`)
 	} else if (theMsg === "h+u") {
 	embedListen.setDescription(`Now listening to **${prefix}help | ${bot.users.size} Users**`)
 	} else {
 	embedListen.setDescription(`Now listening to **${theMsg}**`)
              }
              embedListen.setColor("#C94830")
              embedListen.setTimestamp()
          msg.channel.sendEmbed(embedListen);
         
    if (theMsg === "h+g") {
          await bot.user.setActivity(`${prefix}help | ${bot.guilds.size} Guilds`, {type: 2});
    } else if (theMsg === "h+u") {
     await bot.user.setActivity(`${prefix}help | ${bot.users.size} Users`, {type: 2});
    } else {
          await bot.user.setActivity(theMsg, {type: 2});
         }
      break;
      case "watch":
 if (!config.admins.includes(msg.author.id)) return m.sendEmbed(embedNoPermission)
 if (!theMsg) return m.send(":warning: Cannot watch nothing!")
      var embedWatch = new Discord.RichEmbed()
              .setAuthor("State Changed")
              if (theMsg === "h+g") {
              embedWatch.setDescription(`Now watching **${prefix}help | ${bot.guilds.size} Guilds**`)
 	} else if (theMsg === "h+u") {
 	embedWatch.setDescription(`Now watching **${prefix}help | ${bot.users.size} Users**`)
 	} else {
 	embedWatch.setDescription(`Now watching **${theMsg}**`)
              }
              embedWatch.setColor("#C94830")
              embedWatch.setTimestamp()
          msg.channel.sendEmbed(embedWatch);
         if (theMsg === "h+g") {
          await bot.user.setActivity(`${prefix}help | ${bot.guilds.size} Guilds`, {type: "WATCHING"});
    } else if (theMsg === "h+u") {
     await bot.user.setActivity(`${prefix}help | ${bot.users.size} Users`, {type: 'WATCHING'});
    } else {
           await bot.user.setActivity(theMsg, {type: "WATCHING"});
         }
     
      break;
      case "stream":
      if (!config.admins.includes(msg.author.id)) return m.sendEmbed(embedNoPermission)
 if (!theMsg) return m.send(":warning: Cannot stream nothing!")
      let embedStream = new Discord.RichEmbed()
          .setAuthor("State Changed")
          if (theMsg === "h+g") {
              embedStream.setDescription(`Now streaming **${prefix}help | ${bot.guilds.size} Guilds**`)
 	} else if (theMsg === "h+u") {
 	embedStream.setDescription(`Now streaming **${prefix}help | ${bot.users.size} Users**`)
 	} else {
 	embedStream.setDescription(`Now streaming **${theMsg}**`)
              }
              embedStream.setColor("#C94830")
              embedStream.setTimestamp()

          msg.channel.sendEmbed(embedStream);
    if (theMsg === "h+g") {
          await bot.user.setGame(`${prefix}help | ${bot.guilds.size} Guilds`, `${TWITCH}`);
    } else if (theMsg === "h+u") {
     await bot.user.setGame(`${prefix}help | ${bot.users.size} Users`, `${TWITCH}`);  
    } else {
           await bot.user.setGame(`${theMsg}`, `${TWITCH}`);
         }
          break;
      case "play":
 var embedError = new Discord.RichEmbed()
              .setAuthor("No URL/Query provided")
              .setDescription("Please provide a Link/Search query to play music.")
              .addField("Usage", `${prefix}play <youtube link / search query>`)
              .setColor("#0000FF")
              .setThumbnail("https://images.vexels.com/media/users/3/136461/isolated/preview/d8279505f7fa8e7cd761c755be58f0b7-colorful-music-note-icon-by-vexels.png")
              .setTimestamp()
          
 if (!theMsg) return msg.channel.sendEmbed(embedError);
      const voiceChannel = msg.member.voiceChannel;
      if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
      const permissions = voiceChannel.permissionsFor(msg.client.user);
      if (!permissions.has('CONNECT')) {
          return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
      }
      if (!permissions.has('SPEAK')) {
          return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
      }

      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
          const playlist = await youtube.getPlaylist(url);
          const videos = await playlist.getVideos();
          for (const video of Object.values(videos)) {
              const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
              await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
          }
          return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
      } else {
          try {
              var video = await youtube.getVideo(url);
          } catch (error) {
              try {
                  var videos = await youtube.searchVideos(searchString, 8);
                  let index = 0;
                  var embed = new Discord.RichEmbed()
              .setAuthor("Select a video by typing it's number", "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c545.png")
 	.setDescription(`${videos.map(video2 => `**[${++index}](${video2.url}).** ${video2.title}`).join('\n')}`)
 	.setThumbnail("https://images.vexels.com/media/users/3/136461/isolated/preview/d8279505f7fa8e7cd761c755be58f0b7-colorful-music-note-icon-by-vexels.png")
              .setFooter(`Please provide a value to select one of the search results ranging from 1-8, this timeouts in 15 seconds.`)
              .setColor("#FF0000")
                  var theMessage = await msg.channel.send({embed});
                  // eslint-disable-next-line max-depth
                  try {
                      var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 || msg2.content < 9, {
                          maxMatches: 1,
                          time: 15000,
                          errors: ['time']
                      });
 		    msg.member.voiceChannel.join();
                  } catch (err) {
                      console.error(err);
                      theMessage.delete();
 		    var embedd = new Discord.RichEmbed()
              .setAuthor("Request Canceled", "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-256.png")
              .setDescription(`You did not choose, the request was canceled.`)
              .setFooter(`This was requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
              .setColor("#0000FF")
                      return msg.channel.sendEmbed(embedd);
                  }
                  const videoIndex = parseInt(response.first().content);
                  var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return msg.channel.send('🆘 I could not obtain any search results.');
                }
            }
            
            return handleVideo(video, msg, voiceChannel);
        }
        break;
        case "skip":
        if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
        if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
	
        serverQueue.connection.dispatcher.end('Skip command has been used!');

        return undefined;
        break;
        case "stop":
        if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
        if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
        if (msg.guild.voiceConnection) {
            serverQueue.songs = [];
		    serverQueue.connection.dispatcher.end();
        }
	        return undefined;
        break;
        case "volume":
        if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
	if (!arg[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}%**`);
        if (!serverQueue) return msg.channel.send('There is nothing playing.');
	if (isNaN(arg[1])) return msg.channel.send(":x: Please provide a value between `[1-100]`");
        if (arg[1] > 100) {
		try {
		
 	    var confirmMsg = await m.send(`:warning: Listening at a higher volume than 100% for a long time may damage your hearing. React below to confirm setting the volume at **${arg[1]}%** , or ignore to cancel.`)
 	    confirmMsg.react('✅')
	    var filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === msg.author.id
            await confirmMsg.awaitReactions(filter, { max: 1, time: 10000, errors: ['time']})

        
        serverQueue.connection.dispatcher.setVolumeLogarithmic(arg[1] / 100);
            var embed = new Discord.RichEmbed()
                .setAuthor("Volume Updated", bot.user.displayAvatarURL)
                .setDescription(`The player's volume has been updated.`)
                .addField("Old Volume", `**${serverQueue.volume}%**`, inline = true)
                .addField("New Volume", `**${arg[1]}%**`, inline = true)
                .setFooter(`Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
	        .setThumbnail("https://images.vexels.com/media/users/3/136461/isolated/preview/d8279505f7fa8e7cd761c755be58f0b7-colorful-music-note-icon-by-vexels.png")
                .setTimestamp()
                .setColor("#FF0000")
                msg.channel.send({embed});
            serverQueue.volume = arg[1];
			confirmMsg.delete()
		} catch (error) {
	    confirmMsg.delete()
	    var embedd = new Discord.RichEmbed()
              .setAuthor("Request Canceled", "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-256.png")
              .setDescription(`Volume was not updated to **${arg[1]}%**, no reaction detected.`)
              .setFooter(`This was requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
              .setColor(randomColor)
                      return msg.channel.sendEmbed(embedd);
	} 
	} else {
		serverQueue.connection.dispatcher.setVolumeLogarithmic(arg[1] / 100);
            var embed = new Discord.RichEmbed()
                .setAuthor("Volume Updated", bot.user.displayAvatarURL)
                .setDescription(`The player's volume has been updated.`)
                .addField("Old Volume", `**${serverQueue.volume}%**`, inline = true)
                .addField("New Volume", `**${arg[1]}%**`, inline = true)
                .setFooter(`Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
	        .setThumbnail("https://images.vexels.com/media/users/3/136461/isolated/preview/d8279505f7fa8e7cd761c755be58f0b7-colorful-music-note-icon-by-vexels.png")
                .setTimestamp()
                .setColor("#FF0000")
                msg.channel.send({embed});
            serverQueue.volume = arg[1];
	}
        break;
        case "np":
        if (!serverQueue) return msg.channel.send('There is nothing playing.');
        var embed = new Discord.RichEmbed()
                .setAuthor("Now Playing", "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c545.png")
                .setDescription(`I am currently playing **${serverQueue.songs[0].title}**`)
                .setFooter(`Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
	        .setThumbnail("https://images.vexels.com/media/users/3/136461/isolated/preview/d8279505f7fa8e7cd761c755be58f0b7-colorful-music-note-icon-by-vexels.png")
                .setTimestamp()
                .setColor("#FF0000")
                msg.channel.send({embed});
        break;
        case "queue":
      if (!serverQueue) return msg.channel.send('There is nothing playing.');
 	    let list = 0;
      var embed = new Discord.RichEmbed()
              .setAuthor("Song Queue", "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c545.png")
              .setDescription(`The current songs queue`)
              .addField("Now Playing", `**${serverQueue.songs[0].title}**`)
              .addField("Queue", `${serverQueue.songs.map(song => `**${++list} -** ${song.title}`).join('\n')}`)
              .setFooter(`Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
         .setThumbnail("https://images.vexels.com/media/users/3/136461/isolated/preview/d8279505f7fa8e7cd761c755be58f0b7-colorful-music-note-icon-by-vexels.png")
              .setTimestamp()
              .setColor("#FF0000")
              msg.channel.send({embed});
      break;
      case "pause":
      if (serverQueue && serverQueue.playing) {
          serverQueue.playing = false;
          serverQueue.connection.dispatcher.pause();
          return msg.channel.send('⏸ Paused the music for you!');
      }
      return msg.channel.send('The player is not playing.');
      break;
      case "resume":
      if (serverQueue && !serverQueue.playing) {
          serverQueue.playing = true;
          serverQueue.connection.dispatcher.resume();
          return msg.channel.send('▶ Resumed the music for you!');
      }
      return msg.channel.send('The player is not paused.');
      break;
  }
})

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  
  console.log(video);
  const song = {
      id: video.id,
      title: Util.escapeMarkdown(video.title),
      url: `https://www.youtube.com/watch?v=${video.id}`,
      duration: video.duration,
      channel: video.channel

  };
  if (!serverQueue) {
      const queueConstruct = {
          textChannel: msg.channel,
          voiceChannel: voiceChannel,
          authorName: msg.author.username,
          authorDisc: msg.author.discriminator,
          authorAvatar: msg.author.displayAvatarURL,
          connection: null,
          songs: [],
          volume: 50,
          playing: true
      };
      queue.set(msg.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try {
          var connection = await voiceChannel.join();
          queueConstruct.connection = connection;
          playit(msg.guild, queueConstruct.songs[0]);
      } catch (error) {
          console.error(`I could not join the voice channel: ${error.message}\nIf you think this is a bug, please use \`${prefix}reportbug <issue>\``);
          queue.delete(msg.guild.id);
          return msg.channel.send(`I could not join the voice channel: ${error.message}\nIf you think this is a bug, please use \`${prefix}reportbug <issue>\``);
      }
  } else {
      serverQueue.songs.push(song);
      console.log(serverQueue.songs);
      if (playlist) return undefined;
      else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
  }
  return undefined;
}

function playit(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
 	serverQueue.voiceChannel.leave();
 	queue.delete(guild.id);
 	return;
 }
  console.log(serverQueue.songs);
 
  
 
  const dispatcher = serverQueue.connection.playStream(YTDL(song.url)) 
  
      dispatcher.on('end', function() {
     serverQueue.songs.shift()
     playit(guild, serverQueue.songs[0]);
          
      })
      dispatcher.on('error', error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
  var hours = song.duration.hours
  var minutes = song.duration.minutes
  var seconds = song.duration.seconds
  
  var embed = new Discord.RichEmbed()
              .setAuthor("Now Playing", "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c545.png")
              .addField("Title", `${song.title}`)
              .addField("Length", `${song.duration.hours}:${song.duration.minutes}:${song.duration.seconds}`, inline = true)
              .addField("Uploaded By", `${song.channel.title}`, inline = true)
              .addField("Channel", `${serverQueue.voiceChannel.name}`)
              .addField(`Members Listening`, `${eval(`${serverQueue.voiceChannel.members.size}` - 1)}`)
              .setThumbnail("https://images.vexels.com/media/users/3/136461/isolated/preview/d8279505f7fa8e7cd761c755be58f0b7-colorful-music-note-icon-by-vexels.png")
              .setColor("#D975A1")
           
              
              
          serverQueue.textChannel.send({embed});
}
bot.on('message', async (message) => {
 if (!message.content.startsWith(prefix)) return;

 var WholeMsg = message.content.split(" ").slice(1)
      var theMsg = WholeMsg.join(" ")
 var args = message.content.substring(prefix.length).split(" ");
 var mentionedUser = message.mentions.users.first()
      var menGuildUser = message.mentions.members.first()
 var m = message.channel
  	    let embedNoPermission = new Discord.RichEmbed()
          .setAuthor("⛔ No Permission")
          .setDescription("You do not have permission to perform this action.")
          .setColor("#FF0000")
          .setTimestamp()
          .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
 if (message.author.bot) return;
 
  if (!message.author.equals(bot.user))

switch (args[0].toLowerCase()) {  
	case "vckick":
 	if (!message.member.hasPermission('MOVE_MEMBERS')) return m.send(":no_entry: You do not have permission `Move Members` to use this command.")
	if (menGuildUser.id === '295233686893232129') return m.send(':no_entry: My owner cannot be kicked!')
	if (menGuildUser.id === message.author.id) return m.send(':no_entry: Oops! You cannot kick yourself!')
              if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !message.guild.me.hasPermission('MOVE_MEMBERS')) return m.send(":no_entry: I do not have permissions `Manage Channels` and `Move Members`!")
 	if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return m.send(":no_entry: I do not have permission `Manage Channels`!")
 	if (!message.guild.me.hasPermission('MOVE_MEMBERS')) return m.send(":no_entry: I do not have permission `Move Members`!")
 	if (!menGuildUser) return m.send('Please mention a user to kick!')
              if (!menGuildUser.voiceChannel) return m.send(':warning: The mentioned user is not in a voice channel!')
 	if (menGuildUser.hasPermission('ADMINISTRATOR') && !menGuildUser.id === message.author.id) return m.send(":no_entry: That user has `Administrator` permission. Oh, untouchable!")
 	if (menGuildUser.id === message.guild.ownerID && !message.author.id === '295233686893232129') return m.send(":no_entry: That user is the owner of this guild. Ouch, this did not succeed!")
         if (menGuildUser.id === message.guild.ownerID && menGuildUser.id === message.author.id) {
              
       
 	var kickedFrom = menGuildUser.voiceChannel.name
 	
 	await message.guild.createChannel(`Voice kick: ${mentionedUser.username}#${mentionedUser.discriminator} - Kicked by ${message.author.username}#${message.author.discriminator}`, 'voice')
              var kickChannel = await message.guild.channels.find('name', `Voice kick: ${mentionedUser.username}#${mentionedUser.discriminator} - Kicked by ${message.author.username}#${message.author.discriminator}`)
 	
 	var channelID = kickChannel.id
        var channel = kickChannel

              await menGuildUser.setVoiceChannel(channelID)
 	await channel.delete()
              var vcKickEmbed = new Discord.RichEmbed()
                 .setAuthor('Voice Channel Kick', mentionedUser.displayAvatarURL)
                 .setDescription(`**${mentionedUser.username}#${mentionedUser.discriminator}** has been kicked from **${kickedFrom}**`)
                 .setColor('#3B3E28')
 	   .setTimestamp()
 	   .setFooter(`Kicked by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
 	message.channel.sendEmbed(vcKickEmbed)
 	} else {
 		var kickedFrom = menGuildUser.voiceChannel.name
 	
 	await message.guild.createChannel(`Voice kick: ${mentionedUser.username}#${mentionedUser.discriminator} - Kicked by ${message.author.username}#${message.author.discriminator}`, 'voice')
              var kickChannel = await message.guild.channels.find('name', `Voice kick: ${mentionedUser.username}#${mentionedUser.discriminator} - Kicked by ${message.author.username}#${message.author.discriminator}`)
 	
 	var channelID = kickChannel.id
         var channel = kickChannel

              await menGuildUser.setVoiceChannel(channelID)
 	await channel.delete()
              var vcKickEmbed = new Discord.RichEmbed()
                 .setAuthor('Voice Channel Kick', mentionedUser.displayAvatarURL)
                 .setDescription(`**${mentionedUser.username}#${mentionedUser.discriminator}** has been kicked from **${kickedFrom}**`)
                 .setColor('#3B3E28')
 	   .setTimestamp()
 	   .setFooter(`Kicked by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
 	message.channel.sendEmbed(vcKickEmbed)
 	}
 break;
 case "dblupdate":
 	if (!config.admins.includes(message.author.id)) return m.sendEmbed(embedNoPermission)
 	dbl.postStats(bot.guilds.size);
 	m.send(`Successfully updated servers count: ${bot.guilds.size}`);
 	break;
 case "unban":
 	if (!message.guild.me.hasPermission('BAN_MEMBERS')) return m.send(":no_entry: I do not have permission `Ban Members`!")
        if (!message.member.hasPermission('BAN_MEMBERS')) return m.send(":no_entry: You do not have permission `Ban Members`!")
        if (isNaN(args[1])) return m.send(`Usage: \`${prefix}unban <id>\``)

 	message.guild.unban(args[1])
 	.then(user => m.send(`${user.username}#${user.discriminator} has been unbanned by ${message.author.username}#${message.author.discriminator}`))
              .catch(m.send(":x: That user was not found, or not banned."))

 	break;
 	case "ban":
 	
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return m.send(":no_entry: I do not have permission `Ban Members`!")
        if (!message.member.hasPermission('BAN_MEMBERS')) return m.send(":no_entry: You do not have permission `Ban Members`!")
        if (!menGuildUser) return m.send(`Usage: \`${prefix}ban <user> <reason>\``)
        if (!menGuildUser.bannable) return m.send(":warning: That user is having higher role than me or you. Could not be banned.")
        	try {
        	menGuildUser.ban(theMsg.replace(mentionedUser, ""));
        	var embed = new Discord.RichEmbed()
    .setAuthor("User Banned", mentionedUser.displayAvatarURL)
    .setColor('#0000FF')
    .setDescription(`${mentionedUser.username}#${mentionedUser.discriminator} has been banned from **${message.guild.name}**.`)
     .setFooter(`Banned by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
     .setTimestamp()
     if (theMsg.replace(mentionedUser, "")) {
          embed.addField("Reason", theMsg.replace(mentionedUser, ""))
     } else {
     	    embed.addField("Reason", `No reason provided.`)
     }
          m.send({embed})
     } catch (err) {
     	m.send(err.message)
     }
     break;
     case "kick":
        if (!message.guild.me.hasPermission('KICK_MEMBERS')) return m.send(":no_entry: I do not have permission `Kick Members`!")
        if (!message.member.hasPermission('KICK_MEMBERS')) return m.send(":no_entry: You do not have permission `Kick Members`!")
        if (!menGuildUser) return m.send(`Usage: \`${prefix}kick <user> <reason>\``)
        if (!menGuildUser.kickable) return m.send(":warning: That user is having higher role than me or you. Could not be kicked.")
        	try {
        	menGuildUser.kick(theMsg.replace(mentionedUser, ""));
        	var embed = new Discord.RichEmbed()
    .setAuthor("User Kicked", mentionedUser.displayAvatarURL)
    .setColor('#0000FF')
    .setDescription(`${mentionedUser.username}#${mentionedUser.discriminator} has been kicked from **${message.guild.name}**.`)

     .setFooter(`Kicked by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
     .setTimestamp()
     if (theMsg.replace(mentionedUser, "")) {
          embed.addField("Reason", theMsg.replace(mentionedUser, ""))
     } else {
     	    embed.addField("Reason", `No reason provided.`)
     }
 		
     m.send({embed})
     } catch (err) {
     	m.send(err.message)
     }
     break;
 	case "purge":
 	if (!message.member.hasPermission('MANAGE_MESSAGES')) return m.send(":warning: You need permission `Manage Messages` to use this command.")
 	if (!theMsg) return m.send(`:warning: Invalid value to delete.\nUsage: \`${prefix}purge <number of messages (1-100)>\``)
 
     try {
     const fetched = await message.channel.fetchMessages({limit: args[1]});
 	    try {
 	    var confirmMsg = await m.send(`**${fetched.size}** messages will be deleted. Reply with \`y\` to confirm that action or ignore this message to cancel.`)
 	    var response = await message.channel.awaitMessages(msg2 => msg2.content === "y" || msg2.content === "yes", {
                          maxMatches: 1,
                          time: 10000,
                          errors: ['time']
                      });

 if (response) {
     confirmMsg.delete()
          await message.channel.bulkDelete(args[1])
 	    var embed = new Discord.RichEmbed()
    .setAuthor("Purge")
    .setColor('#0000FF')
    .setDescription(`Successfully deleted ${fetched.size} messages.`)
     .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
     .setTimestamp()
         var done = await m.send({embed})
    done.delete(3000)
 }
 	    } catch (error) {

     		confirmMsg.delete();
     		var errorMsg = await m.send(":x: Messages are not deleted, you did not confirm.")
                      errorMsg.delete(5000)
     	}
     
 	    
     } catch (err) {
     	if (err.message === "The messages must be an Array, Collection, or number.") return m.send("The messages to delete must be a number.")
     	if (err.message.includes("equal to 100.")) return m.send("You can only delete a maximum of 100 messages at once.")
     	if (err.message.includes('is not int.')) return m.send(`:warning: Invalid value to delete.\nUsage: \`${prefix}purge <number of messages (1-100)>\``)
 	    m.send(err.message)
      }
     break;
 	case "eval":
 	if (!config.admins.includes(message.author.id)) return message.channel.sendEmbed(embedNoPermission)
 	if (!theMsg) return m.send(':warning: Cannot eval nothing!')
 	try {
        var Result = eval(theMsg)
 		var embed = new Discord.RichEmbed()
    .setAuthor("Your Code")
    .setColor('#D0C4BD')
    .setDescription("```js\n" + theMsg + "\n```")
    .addField('Result', "```js\n" + Result + "\n```")
     .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
     .setTimestamp()
 m.send({embed})
 
  
 } catch (err) {
      m.send(err.message)
 }
     break;
 	 case "announce":
 	if (!message.member.hasPermission('ADMINISTRATOR')) return m.send(":no_entry: You do not have permission: `Administrator`")
     let announceChannel = message.guild.channels.find('name', "announcements");
     
     if (!announceChannel) {
     	var confirmMsg = await m.send("Announcements channel was not found, create one or type `.confirm` to let me create new one. This timeouts in 10 seconds.")
     	try {
     	var response = await message.channel.awaitMessages(msg2 => msg2.content === ".confirm", {
                          maxMatches: 1,
                          time: 10000,
                          errors: ['time']
                      });
     	if (response) {
     		if (!message.member.hasPermission('MANAGE_CHANNELS')) return m.send(":no_entry: You do not have permission: `Manage Channels`, the **reports** channel was not created.") && confirmMsg.delete()
     		if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return m.send(":no_entry: I do not have permission: `Manage Channels`, the **reports** channel was not created.") && confirmMsg.delete()
     		try {
     			message.guild.createChannel("announcements", 'text')
     			confirmMsg.delete()
     			m.send("**announcements** channel has been created. You can now use the announce command.")
     		} catch (error) {
                  console.log(error)
     		}
     	}
     	} catch (err) {
     		confirmMsg.delete();
     		var errorMsg = await m.send("**announcements** channel was not created, you did not confirm.")
     		errorMsg.delete(5000)
     	}
 	    } else {
     if (!theMsg) return m.send(`Command usage: ${prefix}announce \`<message>\``)
     
         var embed = new Discord.RichEmbed()
 	.setAuthor('Announcement', 'http://wfarm1.dataknet.com/static/resources/icons/set108/2f905ab.png')
         .setDescription(theMsg)
              .setFooter(`Announcement by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
              .setTimestamp()
 	.setColor('#FF8800')
    announceChannel.send({embed})
 }
 	break;
     case "report":
     let reportsChannel = message.guild.channels.find('name', "reports");
     
     if (!reportsChannel) {
     	var confirmMsg = await m.send("Reports channel was not found, create one or type `.confirm` to let me create new one. This timeouts in 10 seconds.")
     	try {
     	var response = await message.channel.awaitMessages(msg2 => msg2.content === ".confirm", {
                          maxMatches: 1,
                          time: 10000,
                          errors: ['time']
                      });
     	if (response) {
     		if (!message.member.hasPermission('MANAGE_CHANNELS')) return m.send(":no_entry: You do not have permission: `Manage Channels`, the **reports** channel was not created.") && confirmMsg.delete()
     		if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return m.send(":no_entry: I do not have permission: `Manage Channels`, the **reports** channel was not created.") && confirmMsg.delete()
     		try {
     			message.guild.createChannel("reports", 'text')
     			confirmMsg.delete()
     			m.send("**reports** channel has been created. You can now use the report command.")
     		} catch (error) {
                  console.log(error)
     		}
     	}
     	} catch (err) {
     		confirmMsg.delete();
     		var errorMsg = await m.send("**reports** channel was not created, you did not confirm.")
     		errorMsg.delete(5000)
     	}

     } else {
     if (!mentionedUser) return m.send("Please mention a user!")
     if (!theMsg.replace(mentionedUser, "")) return m.send("Please provide a reason!")
     
         var embed = new Discord.RichEmbed()
    .setAuthor("User Report")
    .setColor('#FF0000')
    .setDescription(`User ${mentionedUser.username}#${mentionedUser.discriminator} was reported.`)
    .addField(`Reason`, `${theMsg.replace(mentionedUser, "")}`)
    .addField(`User ID`, `${mentionedUser.id}`, inline = true)
    .addField(`User Registeration Date`, mentionedUser.createdAt.toString().replace("GMT", ""))
     .setFooter(`Reported by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
     .setTimestamp()
    reportsChannel.send({embed})
 }
     break;

 	case "image":
 	if (!message.channel.nsfw) return message.channel.send(":warning: This command works in \`NSFW\` channels only.")
 	if (!theMsg) return message.channel.send(`:warning: Please enter a search query!\nUsage: ${prefix}image \`<search query>\``)
      try {
      img.search(`${theMsg}`, {page: Math.floor(Math.random() * 5 + 1)})
         .then(images => {
         	var embed = new Discord.RichEmbed()
    .setColor('#4285F4')
    .setAuthor(`Google Images Search`, "https://cdn.pixabay.com/photo/2015/10/31/12/56/google-1015752_960_720.png")
    .setTitle(`Search result for "${theMsg}"`)
    .setImage(images[0].url)
         .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
         .setTimestamp()
    message.channel.send({embed})
         }).catch(function(error) {
         	if (error.message === "Cannot read property 'url' of undefined") return message.channel.send(`No results were found for query: ${theMsg}`)
 	if (error.message === 'Response code 403 (Forbidden)') return message.channel.send(':warning: Google Search API is offline, please try again later.')
         	message.channel.send(`:x: ERROR: ${error.message}\n\nIf you think this is a bug, please use ${prefix}reportbug \`${error.message}\`, or try to use the command again.`)

         });
     } catch (err) {
       message.channel.send(`No results were found for query: ${theMsg}`)
       }
			break;
    	case "dog":
	   var { body } = await superagent.get('https://dog.ceo/api/breeds/image/random');
   var embed = new Discord.RichEmbed()
   .setColor('#BD1608')
	   .setTitle(":dog: Pow")
	   .setImage(body.message)
	   .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
	   .setTimestamp()
	   message.channel.send({embed})
    	break;
    	case "cat":
       var { body } = await superagent
	   .get('http://random.cat/meow');
	    var embed = new Discord.RichEmbed()
	   .setColor('#BD1608')
	   .setTitle("Meow :cat:")
	   .setImage(body.file)
   .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
    .setTimestamp()
	   message.channel.send({embed})
  	break;
}
});

bot.login(process.env.TOKEN);
