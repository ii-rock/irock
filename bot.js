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


var jokes = fs.readFileSync("jokes.txt").toString().split("\n");
var roll = fs.readFileSync("roll.txt").toString().split("\n");

var cleverbot = require("cleverbot.io"),
clever = new cleverbot(process.env.api_User, process.env.api_Password);

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

bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  if (member.guild.id === "295236047317762058") {
      
      if (member.user.bot) {
          var role = member.guild.roles.find("name", "Bots");
	      member.addRole(role)
	      var channel = bot.channels.get("389585768961540098").sendMessage(`**${member.displayName}** has arrived!`)
      if (!channel) return;
					     
      } else {
          var role = member.guild.roles.find("name", "Gamer");
      member.addRole(role);
      var channel = bot.channels.get("389585768961540098").sendMessage(`**${member.displayName}** has arrived!`)
      if (!channel) return;
      }   
  }        
});

var servers = bot.guilds.size

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
    clever.setNick('Rocky');
	clever.create(function (err, session) {
		
	})
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


bot.on("message", function(message) { 
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
	        .addField("Moderation", `${prefix}userinfo \`<user>\` - shows a few information about the mentioned user.\n${prefix}serverinfo - shows a few information about the current guild.\n${prefix}getinvite - creates an invite for the current or mentioned channel.\n${prefix}settopic \`<mention a channel> <new topic>\` - changes the current or mentioned channel's topic.\n${prefix}purge \`<number of messages (1-100)>\` - deletes a specified amount of messages.\n${prefix}ban \`<user> <reason>\` - bans a user from the server.\n${prefix}kick \`<user> <reason>\` - kicks a user from the server.\n${prefix}report \`<user> <reason>\` - report a user with a reason and it will be sent in the **reports** channel if found.`)
                .addField("Google", `${prefix}google \`<search query>\` - search something on google and the bot will give you the link.\n${prefix}shortenurl \`<URL/Link>\` - convert a long link to a short one.\n${prefix}image \`<search query>\` - search for an image on google.`)
                .addField("Cleverbot System", `${prefix}talk \`<message>\` - talk to the bot and it will reply to you.\n(Direct Messaging): You can chat with the bot privately and it will reply to you asap!\nExample,\nUser: Hey\n${bot.user.username}: Hey, how are you?`)
	        .addField("Other", `${prefix}8ball - ask a question and the bot will reply with a random answer.\n${prefix}say \`<message>\` - says your message.\n${prefix}cat - sends a random cat picture.\n${prefix}dog - sends a random dog picture.\n${prefix}roll - rolls a number.\n${prefix}yomama \`<user>\` - Joke with the mentioned user using yomama jokes.\n${prefix}dm \`<user> <message>\` - send the mentioned user a direct message.`)
                .addField("About Bot", `${prefix}ping - shows the time taken for the bot to respond.\n${prefix}uptime - shows the time since the bot has started up.\n${prefix}servers - shows the servers count that the bot has joined.\n${prefix}about - shows information about the bot's owner and the library used to create the bot.\n${prefix}invite - sends my invitation link.\n${prefix}reportbug - report a bug and it will be sent to the owner.`)
                .setColor("#3C51C3")
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
                .setTimestamp()
	if (!message.guild) {
        
        if (message.content.includes('help')) return message.author.sendEmbed(embedHelp) && message.author.send(`I am a music bot, clever.\nInvite me to your guild: ${process.env.invite}`)
	if (message.content.startsWith(prefix)) return;
	    message.channel.startTyping()
	    clever.ask(message.content, function (err, response) {
            message.reply(response)
								 
	
            message.channel.stopTyping()
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
	    case "dm":
		    if (!mentioned) return m.send('Comon, that\'s not possible, you have to mention a user!')
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
        var rolls = roll[Math.floor(Math.random() * roll.length)]
        var embedRoll = new Discord.RichEmbed()
       .setAuthor(`${message.author.username}#${message.author.discriminator} rolls a dice`, message.author.displayAvatarURL)
       .setColor('#0000FF')
       .setDescription(`:game_die: ${rolls}`)
       .setTimestamp()
        m.sendEmbed(embedRoll)
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
    .setAuthor("Google Search")
    .setDescription("You've searched on google.")
    .setColor("#15f153")
    .setThumbnail("https://cdn.pixabay.com/photo/2015/10/31/12/56/google-1015752_960_720.png")
    .addField("Search Result", `**[Click Here](${Result})**`, inline = true)
    .addField("Search Query", theMsg, inline = true)
    .setFooter(`Requested by ${author.username}#${author.discriminator}`, author.displayAvatarURL)
    .setTimestamp()
        m.send({embed});
    	}
    	 
        break;
        case "talk":
        if (theMsg.length <= 1) {
            message.reply(":x: The message has to be longer than 1 character!")
        } else {
	message.channel.startTyping()
      
	    clever.ask(theMsg, function (err, response) {
        message.reply(response)
	message.channel.stopTyping()
        bot.channels.get("405872224806109185").sendMessage(`[Talk Reply] ${bot.user.username}#${bot.user.discriminator}: ${response}`);
	
	})
        }
                        
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
        let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
    .setDescription(theMsg)
    .setColor("#E2C34A")
    .setTimestamp()

        m.send({embed})
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
                .setAuthor("My Invitation Link")
                .setDescription(`[Click Here](${process.env.invite})`)
                .setColor("#C94830")
                .setThumbnail(bot.user.displayAvatarURL)
                .setTimestamp()
            message.channel.sendEmbed(embeed);
            break;
        case "help":
           
	       if (config.admins.includes(message.author.id)) embedHelp.addField("Owner Commands", `${prefix}close - closes the websocket connection and disconnects the bot.\n${prefix}restart - restarts the bot.\n${prefix}setstatus - changes my state.\n${prefix}setgame - makes me play a specified game.\n${prefix}watch - sets my status to Watching.\n${prefix}listen - sets my status to Listening.\n${prefix}stream - sets my status to Streaming.\n${prefix}setname - changes my username.\n${prefix}setavatar - changes my avatar.\n${prefix}eval - runs a code inside the console and returns the result.`)
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
            .setAuthor("My Uptime")
            .setDescription("```Current Uptime: \n" + upDays + " Days \n" + upHours + " Hours \n" + upMins + " Minutes \n" + upSecs + " Seconds```")
            .setColor("#51317B")
            .setTimestamp()
            message.channel.sendEmbed(embedr);
            break;
        case "servers":
        let embedo = new Discord.RichEmbed()
            .setAuthor("Servers Count")
            .setDescription(`I am in ${bot.guilds.size} servers`)
            .setColor("#AE9C56")
            .setTimestamp()
            message.channel.sendEmbed(embedo);
            break;
        case "ping":
        let embedg = new Discord.RichEmbed()
            .setAuthor("My Ping")
            .setDescription(`${bot.ping.toString()}ms`)
            .setColor("#3892EF")
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
                .setThumbnail("http://icons.iconarchive.com/icons/iconmoon/viva/256/Headphones-icon.png")
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
                    var videos = await youtube.searchVideos(searchString, 5);
                    let index = 0;
                    var embed = new Discord.RichEmbed()
                .setAuthor("Video selection. Type the video number to continue.", "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c545.png")
		.setDescription(`${videos.map(video2 => `**${++index}.** ${video2.title}`).join('\n')}`)
		.setThumbnail("http://icons.iconarchive.com/icons/iconmoon/viva/256/Headphones-icon.png")
                .setFooter(`Please provide a value to select one of the search results ranging from 1-5, this timeouts in 15 seconds.`)
                .setColor("#FF0000")
                    var theMessage = await msg.channel.send({embed});
                    // eslint-disable-next-line max-depth
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 6, {
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
                .setDescription(`No reply were recieved, the request was canceled.`)
                .setFooter(`This was requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
                .setColor("#FF0000")
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
        serverQueue.connection.dispatcher.end();
	handleVideo(video, msg, voiceChannel);
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
        if (arg[1] > 100) return msg.channel.send(":x: Please provide a value between `[1-100]`");
        
        
        serverQueue.connection.dispatcher.setVolumeLogarithmic(arg[1] / 100);
            var embed = new Discord.RichEmbed()
                .setAuthor("Volume Updated", bot.user.displayAvatarURL)
                .setDescription(`The player's volume has been updated.`)
                .addField("Old Volume", `**${serverQueue.volume}%**`, inline = true)
                .addField("New Volume", `**${arg[1]}%**`, inline = true)
                .setFooter(`Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
	        .setThumbnail("http://icons.iconarchive.com/icons/iconmoon/viva/256/Headphones-icon.png")
                .setTimestamp()
                .setColor("#FF0000")
                msg.channel.send({embed});
            serverQueue.volume = arg[1];
        break;
        case "np":
        if (!serverQueue) return msg.channel.send('There is nothing playing.');
        var embed = new Discord.RichEmbed()
                .setAuthor("Now Playing", "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c545.png")
                .setDescription(`I am currently playing **${serverQueue.songs[0].title}**`)
                .setFooter(`Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.displayAvatarURL)
	        .setThumbnail("http://icons.iconarchive.com/icons/iconmoon/viva/256/Headphones-icon.png")
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
	        .setThumbnail("http://icons.iconarchive.com/icons/iconmoon/viva/256/Headphones-icon.png")
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
            volume: 70,
            playing: true
        };
        queue.set(msg.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            playit(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}\nIf you think this is a bug, please use \`${prefix}reportbug <issue>\``);
            queue.delete(msg.guild.id);
            return msg.channel.send(`I could not join the voice channel: ${error}\nIf you think this is a bug, please use \`${prefix}reportbug <issue>\``);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
    }
    return undefined;
}

function playit(guild, song, msg) {
    const serverQueue = queue.get(guild.id);
    
    console.log(serverQueue.songs);
   
    if (!song) {
	    serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
	    return;
        }
	
    const dispatcher = serverQueue.connection.playStream(YTDL(song.url)) 
    
        dispatcher.on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            else console.log(reason);
	    serverQueue.songs.shift()
	    playit(guild, serverQueue.songs[0]);
            
        })
        dispatcher.on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

    var embed = new Discord.RichEmbed()
                .setAuthor("Now Playing", "http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c545.png")
                .setDescription(`The player is now playing.`)
                .addField("Video Name", `${song.title}`)
                .addField("Duration", `\`${song.duration.hours}:${song.duration.minutes}:${song.duration.seconds}\``)
                .addField("Uploader", `${song.channel.title}`)
                .addField("Voice Channel", `${serverQueue.voiceChannel.name}`)
                .setThumbnail("http://icons.iconarchive.com/icons/iconmoon/viva/256/Headphones-icon.png")
                .setColor("#FCBD06")

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
	
switch (args[0].toLowerCase()) {  
	case "dblupdate":
		if (!config.admins.includes(message.author.id)) return m.sendEmbed(embedNoPermission)
		dbl.postStats(bot.guilds.size);
		m.send(`Successfully updated servers count: ${bot.guilds.size}`);
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
            await message.channel.bulkDelete(args[1])
		    var embed = new Discord.RichEmbed()
	   .setAuthor("Purge")
	   .setColor('#0000FF')
	   .setDescription(`Successfully deleted ${fetched.size} messages.`)
       .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
       .setTimestamp()
            m.send({embed})
            
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
           	message.channel.send(`:warning: Oops, that shouldn't happen!\n:x: ERROR: ${error.message}\n\nIf you think this is a bug, please use ${prefix}reportbug \`${error.message}\`, or try to use the command again.`)

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
