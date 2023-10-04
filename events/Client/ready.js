const {
  prefix,
  activityText
} = require("../../config.js");
const {
  ActivityType,
  MessageEmbed
} = require("discord.js");
const config = require('../../config.js')
const logger = require('silly-logger');


module.exports = {
  name: "ready",
  run: async (client) => {
    logger.success(`${client.user.tag} (${client.user.id}) est prêt ${client.guilds.cache.size.toLocaleString('fr-FR')} serveurs | ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount * 2, 0).toLocaleString('fr-FR')} utilisateurs`);


  }


};