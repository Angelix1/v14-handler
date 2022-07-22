module.exports = {

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
  
};
