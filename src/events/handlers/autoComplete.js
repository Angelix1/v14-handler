module.exports = {
  name: "autoComplete",
  listener: "interactionCreate",
  async run(client, int) {
    
    // console.log(int)

    if(int.type == 4) { // AutoComplete

      let options = int.options.getFocused(true);
      let { value, name } = options;
      
      let createAC = (name, value) => {
        return { name, value };
      };      

      // console.log(options)

      if(name == 'command_name') {
        let commandsName = client.slashCommands.map((c) => c.data.name);
        let ACL = [];

        commandsName.forEach((x) => {
          if (x.includes(value)) {
            ACL.push(createAC(x, x));
          }
        });
        return int.respond(ACL);
      }
      
      if(name == 'event_name') {
        let eventsName = client.events.map((c) => c.data.name);
        let ACL = [];

        eventsName.forEach((x) => {
          if (x.includes(value)) {
            ACL.push(createAC(x, x));
          }
        });
        return int.respond(ACL);
      }




//
    }
  },
};
