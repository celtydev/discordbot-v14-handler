const { Client } = require("discord.js");

const config = require("../../config")
const emoji = require('../../emojis')
const logger = require('silly-logger');

module.exports = {
    name: "ping",
    description: "Calculates and sends the latency of the robot.",
    owner: false,
    run: async (client, interaction) => {

        try {
           
            const ping = Math.round(client.ws.ping);
            await interaction.reply({ content: `> * **\`${ping}\`**` });
        } catch (error) {
            logger.error(error);
        }
    }
};






















