module.exports = {
  name: 'slash',
  listener: 'interactionCreate',
  async run(client, int) {
    // console.log(int)

    try
    {  
      if (int.isChatInputCommand()) {
        const command = client.slashCommands.get(int.commandName);
      
        if (!command) return;
    
        if(command.dev && !client.owners.includes(int.user.id)) {
          return int.reply({ content: 'Command Only For Developers', ephemeral: true })
        }
      
        try 
        {
          await command.run(client, int);
          console.log(int.user.tag+" [ Slash: "+command.data.name+` ]`  )
        } 
        catch (error) 
        {
          console.error(error);
          await int.reply({ 
            content: 'There was an error while executing this command!', ephemeral: true 
          });
        }
      }
    }
    catch(e) {
      console.log(e)
    }
  }
}