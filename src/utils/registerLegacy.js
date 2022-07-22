const { readdirSync } = require('fs');
const { legacyFolder } = require( process.src() + '/config/config');

const path = `${process.src()}/${legacyFolder}`;

module.exports = {
  load: async function(client) {
        
    const __ = require('path');
    
    if(!legacyFolder && !legacyFolder.length) {
      let missing = __.resolve(`src/config/config.js`);
      return process.emitWarning(`legacyFolder is Empty String!`, {
        code: 'Custom_Warning',
        detail: `Add folder name if you wanted legacy command.\n(${missing})`
      })
    }
    const commandFolders = await readdirSync(path);

    let loads = {};

    for (const folder of commandFolders) {
      const commandFiles = readdirSync(`${path}/${folder}`).filter((file) =>
        file.endsWith(".js")
      );
      const FILES = readdirSync(`${path}/${folder}`);

      loads[folder] = FILES.join(", ").replace(/\.js/gi, "");
      
      for (const file of commandFiles) {
        const command = require(`${path}/${folder}/${file}`);
        client.legacyCommands.set(command.name, command);
      }
    }

    if(Object.keys(loads).length > 0) {
      console.table(loads)
    } 
    else {
      console.log(`[ No Legacy Commands ]`)
    }
    
  }
};