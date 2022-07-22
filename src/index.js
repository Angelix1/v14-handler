const { 
  Client,
  Partials,
  GatewayIntentBits
} = require('discord.js');
const fs = require('fs');

let cfg = require('./config/config');

let token = process.env.token || cfg.token;
let dict = require('./config/types');

// Anonymous process Properties
Object.defineProperty(process, 'src', { value: function() { return `${process.cwd()}/src`} });

let client = new Client({
  partials: [ 
    Partials.Message, 
    Partials.Reaction, 
    Partials.GuildMember,
    Partials.User,
    Partials.ThreadMember
  ],
  presence: { 
    activities: [
      { 
        name: `${cfg.defaultPrefix}help`,
        type: (dict?.presenceType?.listening ?? 0),
      }
    ], 
    status: 'online'
  },
  intents:  // Full Intents [ 3276799 ]
  [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ]  
})

// Modules
require(process.src() + '/utils/loadModules')(global);
require(process.src() + '/utils/loadCollection').init(client);
require(process.src() + '/utils/registerEvents').load(client);
require(process.src() + '/utils/registerLegacy').load(client);
require(process.src() + '/utils/registerSlash').load(client);
require(process.src() + '/utils/loadEvents').handle(client);

// Login
client.login(token)