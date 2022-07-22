let Discord = require('discord.js')
let { stripIndents, oneLine } = require('common-tags');

module.exports = {
  name: 'legacy',
  listener: 'messageCreate',
  async run(client, message) {
    
    if(message.type == 18 || message.author.bot) return;
    if(message.channel.type === 1) return;

    let Devs = client.owners; // config/config.js
    let cooldowns = client.cooldown // utils/Collection.js
    let { permissions } = require(process.src() + '/config/types');
    let addSpaceBetween = (str) => { return str.replaceAll(/[A-Z]/g, ' $&').trim() };

    
    let prefix, spl = message.content.split(' ');

    prefix = (client.prefix && client.prefix[message.guild.id]) ?? defaultPrefix;
    
    /* default_prefix can be found in config/config and assigned on global on utils/loadModules */
    
    if( (spl.length == 1 && spl[0].replace(/(<|!|@|>)/gi, '')) == client.user.id) {
        return message.channel.send({
          content: `Hey my prefix is \`${prefix}\``
        })
      }

    client.prefix = prefix;
    
    if(!message.content.toLowerCase().startsWith(prefix)) return;

  	const args = message.content.slice(prefix.length).trim().split(/ +/g);
  	const commandName = args.shift().toLowerCase();
    
    let command = client.legacyCommands.get(commandName) || 
      client.legacyCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if(command) {
    
      //━━━━━━━━━━━━━━ [ args check ] ━━━━━━━━━━━━━━━
      if(command.argsRequired && !args.length) {
        if(command.usage && command.usage.length >= 1) {
          let Arguments = '';
          let pr = (Array.isArray(prefix)) ? prefix[0] : prefix;
          let Use = `${pr}${command.name}`
  
          Arguments += `Missing Arguments\nCommand Usage:\n${Use} ${command.usage.join(`\n${Use} `)}\n`
  
          if(command.aliases.length >= 1) {
            let allAlias = '';
            for(let alias of command.aliases) {
              let Alias = `${pr}${alias}`
  
              allAlias += `${Alias} ${command.usage[0]}\n`;
  
            }
            Arguments += `\nUsing Aliases:\n${allAlias}`;
          }
  
          Arguments += `\n<> = Required | [] = Optional`
  
          return message.reply(stripIndents`\`\`\`yaml
          ${Arguments}
          \`\`\``);
        }
        if(!command.usage || command.usage.length < 1) {
          return message.reply('Please provide an arguments')
        }
      }
      
      //━━━━━━━━━━━━━━ [ Dev bypass ] ━━━━━━━━━━━━━━━
        if(Devs.some(id => id == message.author.id)) {
          return command.run(client, message, args);
        }

      //━━━━━━━━━━━━━━ [ WIP check ] ━━━━━━━━━━━━━━━
        if(command.wip && (command.wip == true) ) {
          return message.channel.send({
            content: `This command is still in Work In Progress. It'll be unuseable for now.`
          })
        }
      //━━━━━━━━━━━━━━ [ devsOnly ] ━━━━━━━━━━━━━━━
      	if (command.devsOnly && !Devs.includes(message.author.id)) return;
    
      //━━━━━━━━━━━━━━ [ User permissions ] ━━━━━━━━━━━━━━━
        if (command.userPermissions && command.userPermissions.length > 0 && !Devs.includes(message.author.id) ) {
          if(Array.isArray(command.userPermissions)) {
            let missingPerms = [];
            for(let perm of command.userPermissions) {

              let bit = permissions[perm];
              
              if( Boolean(message.member.permissions.has( bit )) == false) {
                missingPerms.push( addSpaceBetween(perm) );
              }
              // continue;
            }
    
            let PH = oneLine`
              You need the following permissions for the \`${command.name}\` command to work:
              \`${missingPerms.join('\`, \`')}\`
            `
    
            if(missingPerms.length > 0) {
              return message.channel.send({ content: PH });
            }
          }
        }

        //━━━━━━━━━━━━━━ [ Client permissions ] ━━━━━━━━━━━━━━━
        if (command.clientPermissions && command.clientPermissions.length > 0) {
          if(Array.isArray(command.clientPermissions)) {
            let missingPerms = [];
            for(let perm of command.clientPermissions) {

              let bit = permissions[perm];
              
              if( Boolean( message.guild.me.permissions.has(bit)) == false) {
                missingPerms.push( addSpaceBetween(perm) );
              }
              // continue;
            }
    
            let PH = oneLine`
              I need the following permissions for the \`${command.name}\` command to work:
              \`${missingPerms.join('\`, \`')}\`
            `
            if(missingPerms.length > 0) {
              return message.channel.send({ content: PH });
            }
          }
        }

//━━━━━━━━━━━━━━ [ cooldown ] ━━━━━━━━━━━━━━━

      if (!cooldowns.has(command.name)) {
    		cooldowns.set(command.name, new Discord.Collection());
    	}
    
    	const now = Date.now();
    	const timestamps = cooldowns.get(command.name);
    	const cooldownAmount = (command.cooldown || 5) * 1000;

      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.reply( { content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`} );
        }
      }
    
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      
      //━━━━━━━━━━━━━━ [ run ] ━━━━━━━━━━━━━━━
      try {
        command.run(client, message, args)
      }
      catch(e) {
        await message.channel.send(e.message.toString())
        return console.log(e)
      }
    }
    //end
  }
}