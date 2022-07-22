let configs = require(process.src()+'/config/config');
let functionPath = './functions';

module.exports = (globalValue) => {
  
  globalValue.defaultPrefix = configs.defaultPrefix;
  
  globalValue.err = function(e) { return console.log(e) };
  
  globalValue.functions = {
    colorEmbed: require(`${functionPath}/colorEmbed`),
    rgb: require(`${functionPath}/rgb`),
    sleep: require(`${functionPath}/sleep`),
  }
      
  
  return console.log('[ Modules Loaded ]');
}