
# Heyo, Angel here. I'm a Discord Bot Developer and here is my lastest handler i made for my v14 bot.
---
This Handler Support both Slash and Legacy. Most the main brain of this handler located in Utils Folder.


## Handler Features

- Reload-able Slash Command and Events
- Support Custom Sub-Event for Each Events it givens.
- Slash commands Support.
- Legacy commands support
- Provided Full Reference and Vast options on both commands. Example available on [Examples](https://github.com/Angelix1/v14-handler/tree/main/src/examples/)
- Support sub directory in legacy and slash.

## Feedback

If you have any feedback, please reach out to me at [Discord](https://discord.com/users/692632336961110087)


## **Installation | How to use it**

**1.** Install [node.js v16+](https://nodejs.org/en/)

**2.** Download this repository and unzip it or git clone it.

**3.** Fill in everything in **`src/config/config.js`**, some value are optional.

**3.5)** If you using Replit.com, you need to change the `entrypoint` on `replit.nix` from `entrypoint = 'index.js'` to `entrypoint = 'src/index.js'`.

**4.** After filling everything in config. Type in **`npm install`** shell. *On Replit you just click Green RUN button on top*

**5.** start the bot with **`node src/index.js`** or **`node index.js`**, depends how your terminal works.
<br/>

### _Modifiying config.js_

```javascript
{
  defaultPrefix: "",
  token: null,
  slashCommandType: "guild", // hybrid [ the command will be applied to global scope ] | guild [ the command only will be applied to testGuilds ]
  eventFolder: '', // events
  legacyFolder: '', // cmdLegacy
  slashFolder: '', // cmdSlash
  owners: [],
  testGuilds: [],
  listOfAppIds:  {},
  clients: {
	  testing: true,
	  testBot: '',
	  mainBot: ''
  }
  
}
```
1. `defaultPrefix` is for legacy command and its optional if `legacyFolder` left empty.
2. `token` this is for Bot's token and also optional if you using env, because on `src/index.js`, it'll check env first and if it can't find one, it'll check config.
3. `slashCommandType` this is for how you want the bot applied the slashes, if you want specific guild only use `guild` and fills the `testGuilds` for the guild you wanted the slash to be applied, and `hybrid` means, it'll register the commands to global scope but on the slash handler there's a property to split which is which global or not, we will get into it later.
4. `eventFolder` this is where you put all custom event files inside subfolder all you want, and the handler will take care of it.
5. `legacyFolder` this is Legacy command folder or Prefix based commands.
6. `slashFolder` slash DUH.
7. `owners` just put your User ID here, and it used for `devsOnly` and `dev` property on both commands to check if its owner commands or not.
8. `testGuilds` list of guild for guild based slash command.
9. `listOfAppIds` meh you can leave this empty, this is dictionary for my original bot.
10. `clients` this is required if you use `slash`, if `testing`is `true` then the process will use `testBot` and if it's `false` the process will use `mainBot`, what should you put on these?, your bot's `ID` or TestBot's `ID`.

## Usage/Examples

- Legacy Example
```javascript
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
  description: "Show Bot's latency",
  aliases: ['pong', 'latency'],
  category: 'util',
  devsOnly: false,
  userPermissions: [ 'CreateInstantInvite', 'EmbedLinks' ], 
  clientPermissions: [ 'Administrator' ], 
  details: ["This will give bot's heartbeat to discord API"],
  cooldown: 5, // seconds
  usage: ['<Require argument> [optional arguments]'], // if argsRequired is true then this param required
  argsRequired: true,
  wip: false,

  async run (client, message, args) {
    try
    {
      message.channel.send({ content: `hi ${message.author}, my latency is ${client.ws.ping}` })
//=================
    }
    catch(e)
    {
      console.log(e)
    }      
//=================
  }
}

```
- Slash Commands
```javascript
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
    description: 'Bot latency',
    type: ApplicationCommandType.ChatInput,
/* long Reference here, you can see it on the example slash.js yourself */

    options: [{
    	name: 'pong'
	description: 'pong?'
	type: 3 // String
	}]
  },
  commandType: 'global', // global | guild
  dev: false,
  async run(client, int) {
    try {
      await int.reply({ content: `pong! ${client.ws.ping}ms!` })
    }
    catch(e) {
      console.log(e)
    }
    
  }
}
```
- Custom Event (events) <br>
**The Listener Must be a valid event Name and you can enable which event you want to listen on [LoadEvents possibleEvents by uncommenting them](https://github.com/Angelix1/v14-handler/tree/main/src/utils)** <br>
*the `name` of the event must match to the filename, so it can be reloaded if you made changes to the file.
- src/events/messages/autoresponse.js
```javascript
module.exports = {
  name: 'autoresponse',
  listener: 'messageCreate',
  async run(client, message) {
    if(message.content == 'hi') { 
    	message.reply('hello') 
    }
  }
};
```
- src/events/messages/updatedmessagelog.js
```javascript
module.exports = {
  name: 'updatedmessagelog',
  listener: 'messageUpdate',
  async run(client, oldMessage, newMessage) {
  	console.log(oldMessage, newMessage)
  }
};
```
## License

[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)

If you Like the Handler, please Star it, Thank you :3
