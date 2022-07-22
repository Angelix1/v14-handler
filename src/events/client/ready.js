module.exports = {
  name: 'ready',
  listener: 'ready',
  async run(client) {
    console.log(`${client.user.tag} is online!`)
  }
};