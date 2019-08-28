const me = require("discord.js") , shadow = new me.Client({disableEveryone: true
 , autoReconnect:true}) , fs = require("fs") , config = require('./config.json')
 , s = 1000 ,  m = s * 60 , h = m * 60 , d = h * 24 , y = d * 365 
 , targeted = JSON.parse(fs.readFileSync('./delete.json' , 'utf8'))
 , cmd = JSON.parse(fs.readFileSync('./cmd.json' , 'utf8'))
 , autoclear = JSON.parse(fs.readFileSync('./clear.json' , 'utf8'))
 , welc = JSON.parse(fs.readFileSync('./welc.json' , 'utf8'))
 , welm = JSON.parse(fs.readFileSync('./welm.json' , 'utf8'))
 , owner = config.id , token = config.token;
shadow.on("ready", () => {
  console.log(`hello , all CopyRight for shadow only`);
  console.log(`self bot : v2 || release time 2019/7/6 `);
  console.log(`name : ${shadow.user.tag}`);
  console.log(`every thing good.`);
  console.log(`have fun :)`);
});
shadow.on('message', message => {
  let yy = "4865487654187";
  if(!cmd[config.id]) cmd[config.id] = {
    pre: config.prefix,
   }
   fs.writeFileSync("./cmd.json", JSON.stringify(cmd, null, 2), (err) => {
    if (err) console.error(err)
   });
   if(!welc[config.id]) welc[config.id] = {
    welc: yy,
  }
  fs.writeFileSync("./welc.json", JSON.stringify(welc, null, 2), (err) => {
    if (err) console.error(err)
  });
   var arg = message.content.split(' ').slice(1);
   var args = message.content.split(' ').slice(1).join(' ');
   if (message.author.id !== owner) return;
   	var prefix = cmd[config.id].pre;
    if (message.content.startsWith(prefix + 'wt')) {
     if(args){
      shadow.user.setActivity(args, {type:'WATCHING'});
      message.channel.send("** Done , You Are Watching :**` "+` ${args}`+"`").then(message => {message.delete(3000)})
      } else 
      if(!args) {
      message.channel.send("**Can You But An Input ? Please?**").then(message => {message.delete(3000)})
      }
     message.delete(3000);
      } else
    if (message.content.startsWith(prefix + 'st')) {        
      if(args){
         message.channel.send("**Done , You Are Streaming :**` "+` ${args}`+"`").then(message => {message.delete(3000)})
        shadow.user.setActivity(args, {type:'STREAMING', url:"https://www.twitch.tv/benkayali"});
      } else 
    if(!args) {
      message.channel.send("**Can You But An Input ? Please?**").then(message => {message.delete(3000)})          
      }
     message.delete(3000);
     } else
  if (message.content.startsWith(prefix + 'pl')) {
      if(args){
         message.channel.send("**Done , You Are Playing :**`"+` ${args}`+"`").then(message => {message.delete(3000)})
        shadow.user.setActivity(args, {type:'PLAYING'});
      } else 
    if(!args) {
      message.channel.send("**Can You But An Input? Please?**").then(message => {message.delete(3000)})          
      }
    message.delete(3000);
   } else
  if (message.content.startsWith(prefix + 'li')) {    
      if(args){
         message.channel.send("**:white_check_mark: Done , You Are Listening :**`"+` ${args}`+"`").then(message => {message.delete(3000)})
        shadow.user.setActivity(args, {type:'LISTENING'});
      } else 
      if(!args) {
      message.channel.send("**Can You But An Input? Please?**").then(message => {message.delete(3000)})          
      }
    message.delete(3000);
   } else
	if (message.content.startsWith(prefix + "dnd")) {
        message.channel.send("**Done Changing Your Status To `DND`**").then(message => {message.delete(3000)})
        message.delete(3000);
		  shadow.user.setStatus("dnd");
	 } else
	if (message.content.startsWith(prefix + "on")) {
        message.channel.send("**Done Changing Your Status To `Online`**").then(message => {message.delete(3000)})
        message.delete(3000);
		  shadow.user.setStatus("online");
	 } else
  if (message.content.startsWith(prefix + "idle")) {
        message.channel.send("**Done Changing Your Status To `IDLE`**").then(message => {message.delete(3000)})
        message.delete(3000);
		  shadow.user.setStatus("idle");
	 } else
	if (message.content.startsWith(prefix + "off")) {
          message.channel.send("**Done Changing Your Status To `OFFLINE`**").then(message => {message.delete(3000)})
          message.delete(3000);
		  shadow.user.setStatus("invisible");
	 } else 
  if (message.content.startsWith(prefix + "c")) {
        let count = parseInt(args) || 1;
          message.delete();
          message.channel.fetchMessages({ limit: Math.min(count, 100), before: message.id }).then(messages => {
          const prunable = messages.filter(m => m.author.id === shadow.user.id);
        return Promise.all(
            prunable.map(m => m.delete())
        );
      }).catch(message.error);
   } else
  if (message.content.startsWith(prefix + "e")) {
      if(args){
       let embed = new me.RichEmbed()
          .setDescription(args)
          .setColor("#050505")
       message.channel.sendEmbed(embed);
       message.delete(3000);
      } else 
      if(!args) {
      message.channel.send("**Can You But Something For Me To Transfer it to embed?**").then(message => {message.delete(3000)})          
      }
   }
  if (message.content.startsWith(prefix + 'sav')) {
      if(!args) message.channel.send('**Put Avatar link Please ?**').then((message) => message.delete(3000));
      shadow.user.setAvatar(args);
      message.channel.sendMessage(`**:white_check_mark: Done Channged Your avatar.**`).then(message => {message.delete(4000)});
      message.delete(3000);
	   }
  if(message.content.startsWith(prefix + 'vo')) {
        var mention = message.mentions.users.first() || shadow.users.get(args);
         if(!mention) return message.channel.send('**Some Mention Or id ? Please ?**');
         var guilds = shadow.guilds.filter((guild) => guild.member(mention) && guild.member(mention).voiceChannel);
         if(guilds.size <= 0) return message.channel.send(`**i Can't find him.**`).then((message) => message.delete(3000));
        var embed = new me.RichEmbed()
         .setAuthor(mention.tag, mention.avatarURL)
         .setDescription(guilds.map((guild) => `${guild.name} | ${guild.member(mention).voiceChannel.name}` ).join("\n"))
        message.channel.send(embed);
    message.delete(3000);
   }
    if (message.content.startsWith(prefix + 'ping')) {
         message.channel.send(`Ping Now : ${Math.round(shadow.ping)}`).then((message) => message.delete(5000));
 	      message.delete(3000);
   }
  if(message.content.startsWith('vr')){
   	 if(!args) return message.channel.send('**Type Some Room id ?**').then(m => m.delete(5000));
    var ro = shadow.channels.get(args);
    if(ro.type !== 'voice') return;
    if(ro){
       let nn = ""
       var xx = new Discord.RichEmbed()
       ro.members.forEach(member =>{
            xx
            .setTitle(`users in room ${ro.name}`)
            .setDescription(nn += member + '\n')
            .setFooter(ro.guild.name.replace(/ +/g, " "), ro.guild.iconURL)
        })
        message.channel.send(xx);
    } else {
      message.channel.send('**i Cant find Tihs Room**').then(e => e.delete(5000))
    }
   message.delete(5000);
   }
  if (message.content.startsWith(prefix + "av")) {
      let user = shadow.users.get(args) || message.mentions.users.first();
          var uu;
          if(user) {
            uu = user;
          } else {
            uu = message.author;
          }
          let avatar = new me.RichEmbed()
              .setColor("#050505")
              .setTitle(`Link Here.`)
              .setURL(`${uu.avatarURL}`)
              .setImage(`${uu.avatarURL}`)
           message.channel.sendEmbed(avatar).then((message) => message.delete(20000));
      message.delete(3000);
   }
  if(message.content.startsWith(prefix + 'ro')) {
    if(!args) return message.channel.send('**put room id please.**').then((message) => message.delete(4000));
    let ch = shadow.channels.get(args);
    if(!ch) return message.channel.send(`**i Can't find this room.**`).then((message) => message.delete(4000));
    if(ch.type == 'voice') {
      ch.join();
      message.channel.send(`**:white_check_mark: Done i join `+'`'+ `#${ch.name}`+'`**').then((message) => message.delete(4000));
    } else {
      message.channel.send('only voice channel.').then((message) => message.delete(3000));
    }
    message.delete(3000);
  }
  if(message.content.startsWith('ban')) {
       let user = message.mentions.users.first();
       message.channel.send(`**:white_check_mark: ${user} was banned from the server ! :airplane: **`);
   }
  if(message.content.startsWith(prefix + 'get')) {
   let ss = shadow.users.get(args) || message.mentions.users.first();
   if(!ss || !ss.bot) return message.channel.send('** Are This Really Bot ?**');
    if(ss) {
      let aa = new me.RichEmbed()
          .setTitle('Link Here')
          .setURL(`https://discordapp.com/oauth2/authorize?client_id=${ss.id}&scope=bot&permissions=0`)
          .setDescription(`https://discordapp.com/oauth2/authorize?client_id=${ss.id}&scope=bot&permissions=0`)
      message.channel.sendEmbed(aa);
    } else {
    }
    message.delete(3000);
   }
  if(message.content.startsWith(prefix + "sr")) {
    let ll = shadow.guilds.get(args);
    let server;
    if(ll) {
      server = ll;
    } else {
      server = message.guild;
    }
    if(server) {
    var embed  = new me.RichEmbed()
    .setAuthor(server.name.replace(/ +/g, " "), server.iconURL)
    .setDescription(` Owner   : <@${server.owner.user.id}>
 Members : ${server.memberCount} (${server.members.filter(m => m.presence.status !== 'offline').size})
 text    : ${server.channels.filter(m => m.type === 'text').size} 
 room    : ${server.channels.filter(m => m.type === 'voice').size} 
 roles   : ${server.roles.size}
 voice   : ${server.members.filter(e => e.voiceChannel).size}`)
    .setColor('#050505')
    .setTimestamp()
    message.channel.sendEmbed(embed)
    } else {
    message.channel.send(':x: Put an Server id pleas ?').then((message) => message.delete(4000));
    }
    message.delete(3000);
   }
  if(message.content.startsWith(prefix + 'bots')) {
    let ss = shadow.guilds.get(args);
    let i = 1;
    let server;
    if(ss) {
      server = ss;
    } else {
      server = message.guild;
    }
    if(server) {
    const bbot = server.members.filter(m=>m.user.bot).map(m=>`${i++}- <@${m.id}>`);
      const embed = new me.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(`${bbot.join(' ')}`)
      .setFooter(`${server.members.filter(m=>m.user.bot).size} Bots.`)
      .setTimestamp();
    message.channel.send(embed)
    } else {
    message.channel.send(':x: Put an Server id pleas ?').then((message) => message.delete(4000));
    }
   message.delete(s * 5);
   }
  if(message.content.startsWith(prefix + "hc")) {
    let server;
    let gul = shadow.guilds.get(args);
    let cc = []; 
    var qq = 0;
     if(gul) {
      server = gul;
     } else {
      server = message.guild;
      }
      if(server) {
      server.channels.forEach(channel => {
      var type = "#";
      if(channel.type == "text") 
        if(!channel.permissionsFor(message.author).has('VIEW_CHANNEL')) cc.push("`" + ++qq + "-` " + type + channel.name +'  ('+channel.id+')');
    });
    message.delete(5000);
    message.channel.send(`${cc.join(`\n`)}`);
     } else {
      message.channel.send(':x: Put an Server id pleas ?').then((message) => message.delete(4000));
     }
     message.delete(5000);
   }
  if(message.content.startsWith(prefix + "hv")) {
     let server;
     let gul = shadow.guilds.get(args);
     let tt = []; 
     var vv = 0;
     if(gul) {
     server = gul;
     } else {
      server = message.guild;
     }
     if(server) {
     server.channels.forEach(channel => {
     var type = ":loud_sound:";
     if(channel.type == "voice")
     if(!channel.permissionsFor(message.author).has('VIEW_CHANNEL')) tt.push("`" + ++vv + "-` " + type + channel.name +'  ('+channel.id+')');
     });
     message.channel.send(`${tt.join(`\n`)}`);
     } else {
     message.channel.send(':x: Put an Server id pleas ?').then((message) => message.delete(4000));
     }
    message.delete(5000);
   }
  if (message.content.startsWith(prefix + 'target')) {
    if(!args) return message.channel.send('**Some Id Or Mention ? Please ?**').then((message) => message.delete(4000));
     let user = shadow.users.get(args) || message.mentions.users.first();
     if(!user) return message.channel.send("**i Can't find this One.**").then((message) => message.delete(4000));
     if(!targeted[user.id]) targeted[user.id] = {
     status: 'off'
      }
      fs.writeFile("./delete.json", JSON.stringify(targeted, null, 2), (err) => {
      if (err) console.error(err)
      })
       if(targeted[user.id].status === 'on') {
     targeted[user.id] = {
       status : 'off'
       }
     fs.writeFile("./delete.json", JSON.stringify(targeted, null, 2), (err) => {
       if (err) console.error(err)
       })
        message.channel.send(`:white_check_mark: Done Removed <@${user.id}> Good Night Baby`).then((message) => message.delete(5000));
        } else {
         targeted[user.id] = {
         status : 'on'
         }
         fs.writeFile("./delete.json", JSON.stringify(targeted, null, 2), (err) => {
         if (err) console.error(err)
         })
         message.channel.send(`:white_check_mark: Done Add <@${user.id}> say hi baby`).then((message) => message.delete(5000));
         }
         message.delete(3000);
   }
  if(message.content.startsWith('start')) {
    if(isNaN(args)) return message.channel.send('**type number ? please ?**');
     autoclear[config.id] = {
       time : args,
       active : 'on'
     }
    fs.writeFile("./clear.json", JSON.stringify(autoclear, null, 2), (err) => {
      if (err) console.error(err)
     });
     message.channel.send(`**:white_check_mark: Done Start Auto Clear for ${args}s **`).then((message) => message.delete(4000));
     message.delete(3000);
   }
  if(message.content === 'stop') {
   autoclear[config.id] = {
    active : 'off'
     }
     fs.writeFile("./clear.json", JSON.stringify(autoclear, null, 2), (err) => {
       if (err) console.error(err)
       });
       message.channel.send('**:white_check_mark: Done Stop Auto Clear.**').then((message) => message.delete(4000));
    message.delete(3000);
  }
 if(message.content.startsWith(prefix + 'swm')) {
   if(!args) return message.channel.send('**Type the Message Please.**').then((message) => message.delete(3000));
  welm[config.id] = {
    welmsg : args
    }
    fs.writeFile("./welm.json", JSON.stringify(welm, null, 2), (err) => {
    if (err) console.error(err)
    });
    message.channel.send('**:white_check_mark: Done Set Welcome Message to `'+`${args}`+'`**').then((message) => message.delete(3000));
    message.delete(3000);
   }
   if(message.content.startsWith(prefix + 'swc')) {
    if(!args) return message.channel.send('**Put Chat id Please.**').then((message) => message.delete(3000));
     let chat = shadow.channels.get(args);
     if(!chat || chat.type !== 'text') return message.channel.send('**i Can`t find this Channel.**').then((message) => message.delete(3000));
    welc[config.id] = {
      welchat : chat.id,
      onoff : 'on'
      }
      fs.writeFile("./welc.json", JSON.stringify(welc, null, 2), (err) => {
      if (err) console.error(err)
      });
      message.channel.send("**:white_check_mark: Done Set Welcome Chat : " + `<#${chat.id}>`+"**").then((message) => message.delete(3000));
      message.delete(3000);
     }
  if(message.content.startsWith(prefix + 'wel')) {
    let oo = welc[config.id].welchat;
	if(!args) return message.channel.send('**Only Put ``on`` Or ``off``.**').then((message) => message.delete(3000));
    if(args ==- 'on' || args ==- 'off') return message.channel.send('**Only Put ``on`` Or ``off``.**').then((message) => message.delete(3000));
    welc[config.id] = {
      welchat : oo,
      onoff : args
      }
      fs.writeFile("./welc.json", JSON.stringify(welc, null, 2), (err) => {
      if (err) console.error(err)
      });
      message.channel.send("**:white_check_mark: Done Set Welcome Status : `" + `${args}`+"`**").then((message) => message.delete(3000));
    message.delete(3000);
   }
  if(message.content.startsWith(prefix + 'pre')) {
    if(!args) return message.channel.send('**Put An New Prefix Pleas.**').then((message) => message.delete(3000));
      cmd[config.id] = {
        pre : args
        }
        fs.writeFile("./cmd.json", JSON.stringify(cmd, null, 2), (err) => {
        if (err) console.error(err)
        });
        message.channel.send("**:white_check_mark: Done Set prefix to `"+`${args}`+"`**").then((message) => message.delete(3000));
        message.delete(3000);
   }
	if (message.content === prefix + 'help') {
    message.channel.send('```'+`
 ${prefix}wt     : Watching.
 ${prefix}pl     : Playing.
 ${prefix}li     : Listening.
 ${prefix}st     : Sreaming.
 ${prefix}off    : Set Offline.
 ${prefix}dnd    : Set Dnd.
 ${prefix}idle   : Set Idle.
 ${prefix}on     : Set Online.
 ${prefix}c      : Clear Your Message.
 ${prefix}e      : Transfer to Embed.
 ${prefix}av     : Show The Avatar.
 ${prefix}vo     : Know Where is the user (mention or id).
 ${prefix}ro     : Join Room By Id.
 ${prefix}hc     : Send the name for every hid chats of server (can use by id).
 ${prefix}hv     : Send the name for every hid rooms of server (can use by id).
 ${prefix}target : Target Some User Message.
 ${prefix}ping   : Bot Poing.
 ${prefix}sav    : Channge the Avatar.
 ${prefix}get    : Get an Bot Link.
 ${prefix}sr     : server info (Can Used By id).
 ${prefix}bots   : server bots(Can Used By id).
 ${prefix}swc    : Set the Auto Welcome Chat (Only Channel id).
 ${prefix}swm    : Set the Auto Welcome Message.
 ${prefix}wel    : Active Auto Welcome (on or off).
 ${prefix}pre    : Set the prefix.
 start   : Auto Clear Message (set the time by secend).
 stop    : Stop Auto Clear Message.
 All CopyRight Resived for ©Shadow.`+'```');
   message.delete(3000);
  }
 });
shadow.on('message', message => {
   if(!targeted[message.author.id]) return;
   if(targeted[message.author.id].status == 'off') return;
   if(message.channel.type == "text") {
    message.delete();
   } else {
   }
});
shadow.on('message', message => {
  if(message.author.id !== owner) return;
  if(!autoclear[config.id]) autoclear[config.id] = {
    active: 'off',
	time: 0
	}
  if(autoclear[config.id].active == 'off') return;
  if(!autoclear[config.id].time) return;
  let rr = autoclear[config.id].time;
  if(autoclear[config.id].active == 'on') {
    setTimeout(() => 
    message.delete(), s * rr)
  }
});
shadow.on('guildMemberAdd', member => {
	let oo = "548726789542"; 
  if(!welc[config.id]) welc[config.id] = {
    welchat: oo,
  }
  fs.writeFileSync("./welc.json", JSON.stringify(welc, null, 2), (err) => {
    if (err) console.error(err)
  });
  if(welc[config.id].onoff == 'on') {
    var shad = member.guild.channels.get(welc[config.id].welchat);
    if(!shad) return;
    let ah;
    var we = welm[config.id].welmsg;
    if (we) {
      ah = we;
    } else {
      ah = member.guild.name.replace(/ +/g, " ");
    }
    setTimeout(() => shad.send(ah), 7000)
  }
});
shadow.login(token);
shadow.on("error", console.error);
shadow.on("reconnect", () => {
return
});