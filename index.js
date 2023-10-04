const Bot = require("./structures/Client");
const client = new Bot();
const Discord = require("discord.js");
const mongoose = require('mongoose');
const config = require('./config.js')
const logger = require('silly-logger');

mongoose.connect(config.data, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.success("La BaseData est maintenant opérationnelle."))
  .catch((error) => logger.error(error));



process.on("unhandledRejection", (error) => {
  if (error.code == 10062) return;
  logger.error(error);
})


client.on('guildCreate', (guild) => {
  logger.custom('ADDED', '#0CFF00', '#ffffff', `${guild.name} (${guild.id})`);

});


client.on('guildDelete', async (guild) => {

  try {

    logger.custom('REMOVED', '#FF0000', '#ffffff', `${guild.name} (${guild.id})`);


  } catch (error) {
    logger.error(error);
  }
});





client.connect();
module.exports = client;