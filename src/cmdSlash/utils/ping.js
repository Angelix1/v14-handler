const { 
  ActionRowBuilder, 
  SelectMenuBuilder, 
  ButtonBuilder, 
  EmbedBuilder,
  ButtonStyle,
  ApplicationCommandType, 
  ApplicationCommandOptionType, 
  ModalBuilder, 
  TextInputBuilder
} = require('discord.js');

const { stripIndents, oneLine } = require('common-tags');


module.exports = {
  data: {
    name: 'ping',
    description: 'Ping',
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
    options: []
  },
  commandType: 'global', // global | guild
  dev: false,
  async run(client, int) {
	  int.reply(`${client.ws.ping}ms!`)
  }
}