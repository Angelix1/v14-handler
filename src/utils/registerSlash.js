const { readdirSync } = require('fs');
const { clients, slashFolder, slashCommandType, testGuilds, token } = require( process.src() + '/config/config');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

let testToken = process.env.testBotToken;
let usedToken = process.env.token ?? token;

// const rest = new REST({ version: '9' }).setToken(testToken);
const rest = new REST({ version: '9' }).setToken(usedToken);

let clientId = (!clients.testing) ? clients.mainBot : clients.testBot;

const path = `${process.src()}/${slashFolder}`;

module.exports = {
  load: function(client) {
    let commands = [];
    let globalCmd = [];
    let guildCmd = [];

        
    const __ = require('path');
    
    if(!slashFolder && !slashFolder.length) {
      let missing = __.resolve(`src/config/config.js`);
      return process.emitWarning(`slashFolder is Empty String!`, {
        code: 'Custom_Warning',
        detail: `Add folder name if you wanted slash command.\n(${missing})`
      })
    }
    
	if(!clientId) throw ReferenceError(`ClientId Missing. Add it on (${missing})`);
		
    const slashyFolders = readdirSync(path);

    for (const folder of slashyFolders) {
      const commandFiles = readdirSync(`${path}/${folder}`).filter((file) =>
        file.endsWith(".js")
      );

      const FILES = readdirSync(`${path}/${folder}`);

      for (const file of commandFiles) {
        const command = require(`${path}/${folder}/${file}`);
        // console.log(command)
        if (!command || !command.data) {
          continue;
        }
        client.slashCommands.set(command.data.name, command);
        commands.push(command.data);

        if (command.commandType == "global") {
          globalCmd.push(command.data);
        }
        if (command.commandType == "guild") {
          guildCmd.push(command.data);
        }
        // console.log(command.name)
      }
    }

    let loaded = {};
    
    if(commands.length > 0) {
      loaded['CommandType'] = slashCommandType;
      
      if (slashCommandType == "hybrid") {
        
        loaded['Global'] = globalCmd.map(c => c?.name)?.join(', ');
        loaded['Guild'] = guildCmd.map(c => c?.name)?.join(', ');
        
        rest.put(
          Routes.applicationCommands(clientId), { body: globalCmd }
        )
        
        if(testGuilds.length > 0) {
          testGuilds.forEach((g) => {
            rest.put(
              Routes.applicationGuildCommands(clientId, g), { body: guildCmd }
            )
          });
        }
          
      }
      if (slashCommandType == "guild") {
        
        loaded['Guild'] = commands.map(c => c?.name)?.join(', ');
                
        if(testGuilds.length > 0) {
          testGuilds.forEach((g) => {
            rest.put(
              Routes.applicationGuildCommands(clientId, g), { body: commands }
            )
          });
        }
      }
      console.table(loaded)
    }
    else {
      console.log(`[ No Slash Command ]`)
    }
  }
};