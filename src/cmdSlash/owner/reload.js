const { 
  ActionRowBuilder, 
  SelectMenuBuilder, 
  ButtonBuilder, 
  EmbedBuilder,
  ButtonStyle,
  ApplicationCommandType, 
  ApplicationCommandOptionType, 
  Options
} = require('discord.js');

const { stripIndents, oneLine } = require('common-tags');
let cfg = require(process.src() + '/config/config');

let eventPath = process.src() + '/' + cfg.eventFolder;
let slashPath = process.src() + '/' + cfg.slashFolder;

const fs = require('fs');

module.exports = {
  data: {
    name: 'reload',
    description: 'Reload Commands/ Events Collection',
    type: ApplicationCommandType.ChatInput,
/*
    @type
    ApplicationCommandType = {
      ChatInput  : Slash commands
      User       : A UI-based command that shows up when you right click or tap on a user
      Message    : A UI-based command that shows up when you right click or tap on a message
    }

    @this.client           - Bot
    @name                  - Command Name or Class Command Name, STRING
    @description           - Command Description, Max 100 chars
    @type                  - {
      ApplicationCommandType.ChatInput
      ApplicationCommandType.ContextMenu
        
    }
    @options.type          - {
      1 = ApplicationCommandOptionType.Subcommand
      2 = ApplicationCommandOptionType.SubcommandGroup 
      3 = ApplicationCommandOptionType.String
      4 = ApplicationCommandOptionType.Integer
      5 = ApplicationCommandOptionType.Boolean
      6 = ApplicationCommandOptionType.User
      7 = ApplicationCommandOptionType.Channel
      8 = ApplicationCommandOptionType.Role
      9 = ApplicationCommandOptionType.Mentionable
      10 = ApplicationCommandOptionType.Number
    }
    @options               - Command Options, Array[Object]
    @options.type          - Refer to @type
    @options.value         - input from users, 
    @options.focused       - true if this option is the currently focused option for autocomplete 
    @options.autocomplete  - Boolean
    @options.choices       - Command Options Choices, Object{ name, value }
*/
    options: [
      {
        name: 'cmd',
        description: 'Reload slash command',
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: 'command_name',
            description: 'Command',
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
          }
        ]
      },
      {
        name: 'event',
        description: 'Reload events',
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: 'event_name',
            description: 'Event',
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
          }
        ]
      }
    ]
  },
  commandType: 'guild', // global | guild
  dev: true,
  async run(client, int) {
    if(!client.owners.some(u => u == int.user.id)) 
      return int.reply({ 
        content: 'You are?',
        ephemeral: true
      });

    
    let Check = '✅';
    let XNO = '❌';
    
    let subCommand = int.options.getSubcommand();

    if(subCommand == 'cmd')
    {
      let command = int.options.getString('command_name');
      const SlashFolders = await fs.promises.readdir(slashPath)
        .catch((err) => {return console.log(err);});
      
      const Fail = new EmbedBuilder()
      .setTitle(`${XNO} Fail`)
      .setColor(functions.colorEmbed.Red)

      const Success = new EmbedBuilder()
      .setTitle(`${Check} Success`)
      .setColor(functions.colorEmbed.Green)
      
      try 
      {      
        for (const subFolder of SlashFolders) 
        {
          const file = await fs.promises.readdir(`${slashPath}/${subFolder}`)
          .catch((err) => { 
            return console.log(err);
          });

          const CMD = client.slashCommands.get(command)

          if (!CMD) 
          {
            return int.reply({ 
              embeds: [
                Fail.setDescription(`There is no Slash Commands with name \`${command}\``)
              ], 
              ephemeral: true 
            });
          }

          if (file.includes(`${CMD.data.name}.js`)) 
          {
            try 
            {
              let path = `${slashPath}/${subFolder}/${CMD.data.name}.js`;
              const tempCommand = require( path );
              let newCommand;
              try
              {
                await client.slashCommands.set(tempCommand.data.name+'1', tempCommand);
                newCommand = tempCommand;
                await client.slashCommands.delete(tempCommand.data.name+'1');
              } 
              catch(e) {
                return int.reply({ 
                  embeds: [
                    Fail.setDescription(`There was an error while reloading a CMD \`${command}\`:\n\`${e.message}\``)
                  ], 
                  ephemeral: true 
                });
              }
              
              delete require.cache[ require.resolve(path) ];
              client.slashCommands.delete(command);


              client.slashCommands.set(newCommand.data.name, newCommand);
              return int.reply({ 
                embeds: [
                  Success.setDescription(`\`${command}\` has been succesfully reloaded`)
                ], 
                ephemeral: true 
              });
            } 
            catch (error) 
            {
              return int.reply({ 
                embeds: [
                  Fail.setDescription(`There was an error while reloading a CMD \`${command}\`:\n\`${error.message}\``)
                ], 
                ephemeral: true 
              });
            }
          }
        }
      }
      catch (error) 
      {
        return int.reply({ 
          content: `${XNO} There was an error trying to reload **${command}**: \`${error.message}\``, 
          ephemeral: true 
        });
      }
      
    }
//====================
    if(subCommand == 'event') {
      let Event = int.options.getString('event_name');
      
      const EventsFolders = await fs.promises.readdir(eventPath)
        .catch((err) => {return console.log(err);});
      
      const Fail = new EmbedBuilder()
      .setTitle(`${XNO} Fail`)
      .setColor(functions.colorEmbed.Red)

      const Success = new EmbedBuilder()
      .setTitle(`${Check} Success`)
      .setColor(functions.colorEmbed.Green)
      
      try 
      {      
        for (const subFolder of EventsFolders) 
        {
          const file = await fs.promises.readdir(`${eventPath}/${subFolder}`)
          .catch((err) => { 
            return console.log(err);
          });

          const targetEvent = client.events.get(Event)

          if (!targetEvent) 
          {
            return int.reply({ 
              embeds: [
                Fail.setDescription(`There is no Event with name \`${targetEvent}\``)
              ], 
              ephemeral: true 
            });
          }

          if (file.includes(`${targetEvent.name}.js`)) 
          {
            try 
            {
              let path = `${eventPath}/${subFolder}/${targetEvent.name}.js`;
              const temp = require( path );
              let newEvent;
              try
              {
                await client.events.set(temp.name+'1', temp);
                newEvent = temp;
                await client.events.delete(temp.name+'1');
              } 
              catch(e) {
                return int.reply({ 
                  embeds: [
                    Fail.setDescription(`There was an error while reloading a event \`${Event}\`:\n\`${e.message}\``)
                  ], 
                  ephemeral: true 
                });
              }
              
              client.events.delete(targetEvent);
              delete require.cache[ require.resolve(path) ];

              client.events.set(newEvent.name, newEvent);
              return int.reply({ 
                embeds: [
                  Success.setDescription(`\`${Event}\` has been succesfully reloaded`)
                ], 
                ephemeral: true 
              });
            } 
            catch (error) 
            {
              return int.reply({ 
                embeds: [
                  Fail.setDescription(`There was an error while reloading a event \`${Event}\`:\n\`${error.message}\``)
                ], 
                ephemeral: true 
              });
            }
            break;
          }
        }
      }
      catch (error) 
      {
        return int.reply({ 
          content: `${XNO} There was an error trying to reload **${Event}**: \`${error.message}\``, 
          ephemeral: true 
        });
      }
      
    }

//====================    
  }
}