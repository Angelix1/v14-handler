let { Collection } = require('discord.js')
let { owners, defaultPrefix } = require(process.src() + '/config/config');

module.exports = {
  init: function(client) {
    
    client.legacyCommands = new Collection();
    client.slashCommands = new Collection();
    client.cooldown = new Collection();
    client.events = new Collection();
    client.owners = owners;
    client.defaultPrefix = defaultPrefix;
    
    // client. = new Collection();

    return console.log('[ Collection Set ]')
  }
}