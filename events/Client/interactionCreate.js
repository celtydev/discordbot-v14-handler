const {
  Client,
  CommandInteraction,
  InteractionType
} = require("discord.js");
const config = require('../../config.js')
const emoji = require('../../emojis.js')
const logger = require('silly-logger');


module.exports = {
  name: "interactionCreate",

  run: async (client, interaction) => {
    if (interaction.type === InteractionType.ApplicationCommand) {
      const slashCommand = client.slashCommands.get(interaction.commandName);
      if (!slashCommand) return;

      try {
        await slashCommand.run(client, interaction);
      } catch (error) {
        const errorMessage = "The request you made failed. Please check the settings and try again. Please retry later.";
        if (interaction.replied) {
          const Embed = {
            color: config.color,
            description: `${emoji.warning} ・ ${errorMessage}.`,
          };
          await interaction.editReply({
            embeds: [Embed]
          }).catch(() => {});

        } else {
          const Embed = {
            color: config.color,
            description: `${emoji.warning} ・ ${errorMessage}.`,
          };
          await interaction.reply({
            ephemeral: true,
            embeds: [Embed]
          }).catch(() => {});
        }
        logger.error(error);
      }
    }

    if (interaction.isButton()) {}
  },
};