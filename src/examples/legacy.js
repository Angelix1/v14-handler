const { 
  ActionRowBuilder, 
  SelectMenuBuilder, 
  ButtonBuilder, 
  EmbedBuilder,
  ButtonStyle
} = require('discord.js');

const { stripIndents, oneLine } = require('common-tags');

module.exports = {    
  name: "", 
  description: "", 
  aliases: [],
  category: '',
  devsOnly: false,
  userPermissions: [], 
  clientPermissions: [], 
  details: [],
  cooldown: 5, // seconds
  usage: [], // if argsRequired is true then this param required
  argsRequired: true,
  wip: false,

  async run (client, message, args) {
    try
    {









//=================
    }
    catch(e)
    {
      console.log(e)
    }      
//=================
  }
}
