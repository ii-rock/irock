const { Client, Util } = require('discord.js');
const Discord = require("discord.js");
let config = require("./config.json");
const GOOGLE_API_KEY = process.env.google_Key
const superagent = require('superagent');
const DBL = require('dblapi.js')
var nodemailer = require("nodemailer")
const dbl = new DBL(process.env.dbl_Key)

var unirest = require("unirest");


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.gmEm}`,
    pass: `${process.env.gmPw}`
  }
});
 
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

var upSecs = 0;
var upMins = 0;
var upHours = 0;
var upDays = 0;

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
	"#1D1A1A",
	"#efd19f"
];

bot.on('ready', update);
   

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
		bot.user.setActivity("Music", {type: "LISTENING"})
            upMins = 0
            upHours = upHours + 1
        }
        if (upHours >= 24) {
		bot.user.setActivity("Games", {type: "PLAYING"})
            upHours = 0
            upDays = upDays + 1

        }


    }, 1000)
    
});

cbot = new cleverbot(process.env.api_User, process.env.api_Password);
var randomColor = colors[Math.floor(Math.random() * colors.length)]
bot.on("message", async (message) => { 
	
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
                .setDescription(`${prefix}play \`<youtube link/search query>\` - plays a song from youtube in your current voice channel.\n${prefix}stop - stops the player and leaves your current channel.\n${prefix}move  moves me to your current voice channel.\n${prefix}skip - skips your current song and plays the next one in the queue.\n${prefix}pause - pause current song, if any.\n${prefix}resume - resume current song, if any.\n${prefix}volume \`[1-100]\` - changes the volume of the player.\n${prefix}np - shows the current song, if any.\n${prefix}queue - shows the list of the queued songs, if any.`)
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
		    case "login":
    if (!config.admins.includes(message.author.id)) return m.sendEmbed(embedNoPermission)
         if (!args[1]) return m.sendMessage(":x: Please provide account details...");
 	  try {
     bot.user.setAvatar(args[1]);
          
          var embedAv = new Discord.RichEmbed()
              .setAuthor("Successfully Loggen In")
              .setDescription(`**${theMsg}** has logged in, welcome.`)
              .setColor("#888670")
              .setTimestamp()
          message.channel.sendEmbed(embedAv);
   } catch (error) {
 	  message.channel.send(error)
   }
      break;
		    case "sendmail":
			 if (!args[1]) return m.send(':warning: Please provide an Email!')
			 if (!theMsg.replace(args[1], "")) return m.send(':warning: Please provide a message to send!')
			 var mailOptions = {
  from: 'glorydiscordbot@gmail.com',
  to: args[1],
  subject: `[Discord] Rocky - Message from ${message.author.username}#${message.author.discriminator}`,
  text: `${message.author.username}#${message.author.discriminator} said: ${theMsg.replace(args[1], "")}\n\n\nThis email was sent by using .sendmail command on Discord. You can also use it right now!\n\nInvite me to your server through this link: ${process.env.invite}`
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
  message.channel.send(':warning: Invalid email submitted! Please try again.')
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
      case "uptime":
      let embedr = new Discord.RichEmbed()
          .setAuthor("Current Uptime")
          .setDescription(upDays + " Days, " + upHours + " Hours, " + upMins + " Minutes, " + upSecs + " Seconds")
          .setColor(randomColor)
          .setTimestamp()
          message.channel.sendEmbed(embedr);
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
 
  if (!message.author.equals(bot.user)) return;
	 
break;
  }
});

	
bot.login(process.env.TOKEN);
