
# Heyo, Angel here. I'm a Discord Bot Developer and here is my lastest handler i made for my v14 bot.
---
This Handler Support both Slash and Legacy. Most the main brain of this handler located in Utils Folder.



## **Installation | How to use it**

**1.** Install [node.js v16+](https://nodejs.org/en/)

**2.** Download this repository and unzip it or git clone it.

**3.** Fill in everything in **`src/config/config.js`**, some value are optional.

**4.** After filling everything in config. Type in **`npm install`** shell.

**5.** start the bot with **`node src/index.js`** or **`node index.js`**, depends how your terminal works.
<br/>

### _Modify - config.js_

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



## Handler Features

- Reload-able Slash Command and Events
- Support Custom Sub-Event for Each Events it givens.
- Slash commands Support.
- Legacy commands support
- Provided Full Reference and Vast options on both commands. Example available on [Examples](https://github.com/Angelix1/v14-handler/src/examples/)
- Support sub directory in legacy and slash.

## Feedback

If you have any feedback, please reach out to me at [Discord](https://discord.com/users/692632336961110087)

## Usage/Examples

- Commands Example
```javascript
// chat input slash commands
const { CommandInteraction, ApplicationCommandType } = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  name: "",
  description: ``,
  userPermissions: [],
  botPermissions: [],
  category: "",
  cooldown: 10,
  type: ApplicationCommandType.ChatInput,
  /**
   *
   * @param {BOT} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    // Code
  },
};

// message input slash commands
const {
  ContextMenuCommandInteraction,
  ApplicationCommandType,
} = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  name: "",
  category: "",
  type: ApplicationCommandType.Message,
  /**
   *
   * @param {BOT} client
   * @param {ContextMenuCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
  },
};

// user slash commands

const {
  ContextMenuCommandInteraction,
  ApplicationCommandType,
} = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  name: "",
  category: "",
  type: ApplicationCommandType.User,
  /**
   *
   * @param {BOT} client
   * @param {ContextMenuCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
  },
};

// message commands
const { Message } = require("discord.js");
const BOT = require("../../../handlers/Client");

module.exports = {
  name: "",
  description: ``,
  userPermissions: [],
  botPermissions: [],
  category: "",
  cooldown: 10,
  /**
   *
   * @param {BOT} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
  },
};

```

## License

[MIT](https://choosealicense.com/licenses/mit/)

# Thanks For Using Mine Handler Please Give a Star
