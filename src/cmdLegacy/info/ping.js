const { 
  ActionRowBuilder, 
  SelectMenuBuilder, 
  ButtonBuilder, 
  EmbedBuilder,
  ButtonStyle
} = require('discord.js');

const { stripIndents, oneLine } = require('common-tags');

module.exports = {    
  name: "ping", 
  description: "Bot Heartbeat", 
  aliases: [],
  category: 'info',
  devsOnly: false,
  userPermissions: [], 
  clientPermissions: [], 
  details: [],
  cooldown: 5, // seconds
  usage: [], // if argsRequired is true then this param required
  argsRequired: false,
  wip: false,

  async run (client, message, args) {
    try
    {
      
      message.channel.send(`pong! ${client.ws.ping}ms`);


//=================
    }
    catch(e)
    {
      console.log(e)
    }      
//=================
  }
}
