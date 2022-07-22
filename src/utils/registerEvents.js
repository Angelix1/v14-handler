const { readdirSync } = require('fs');
const { eventFolder } = require( process.src() + '/config/config');

const path = `${process.src()}/${eventFolder}`;

module.exports = {
  load: function(client) {
    
    const __ = require('path');
    if(!eventFolder && !eventFolder.length) {
      let missing = __.resolve(`src/config/config.js`);
      throw ReferenceError(`Event Folder Missing, please add it on (${missing})`);
    }

    let CEFolder = readdirSync(path);
    
    for (const subfolder of CEFolder) {
      const eventFiles = readdirSync(
        `${path}/${subfolder}`
      ).filter((file) => file.endsWith(".js"));
    
      for (const file of eventFiles) {
        const event = require(`${path}/${subfolder}/${file}`);
        if (!event || !event.listener) {
          continue;
        }
        client.events.set(event.name, event);
        // console.log(event)
      }
    }
  }
}