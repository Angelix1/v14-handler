let possibleEvents = [
/*  
  'channelCreate',
  'channelDelete',
  'channelUpdate',
  'emojiCreate',
  'emojiDelete',
  'emojiUpdate',
  'guildBanAdd',
  'guildBanRemove',
  'guildMemberAdd',
  'guildMemberRemove',
  'inviteCreate',
  'inviteDelete',
  'messageReactionAdd',
  'messageReactionRemove',
  'presenceUpdate',
  'roleCreate',
  'roleDelete',
  'roleUpdate',
  'stickerCreate',
  'stickerDelete',
  'stickerUpdate',
  'threadCreate',
  'threadDelete',
  'threadListSync',
  'threadMembersUpdate',
  'threadMemberUpdate',
  'threadUpdate',
  'voiceStateUpdate',
*/
  'interactionCreate',
  'messageCreate',
  'messageDelete',
  'messageUpdate',
  'guildMemberUpdate',
  'userUpdate',
  'ready',
]


module.exports = {
  name: "loadEvents",
  async handle(client)
  {
    let events = client.events;
    function Find(collected, type) {  
      return collected.filter(e => e.listener == type)  
    }
    var load = {};
    possibleEvents.forEach(evt => {
      // print(evt)

      var loadedEventList = {};
      let thisEvent = Find(events, evt)

      
      if(thisEvent.size >= 1) {
          
        loadedEventList[evt] = thisEvent.map(x => x.name)
        
        load[evt] = loadedEventList[evt].join(', ');
        
        client.on(evt, async (...args) => {
          // print(args)
          thisEvent.forEach(async listen => {

            let revent = client?.events?.get(listen?.name);
            // print(listen.name)
            try { 
              revent.run(client, ...args)
            } 
            catch(e) {
              print(e)
            }
            
          })
        })
      }
    })

    console.table(load)
    
  }
}