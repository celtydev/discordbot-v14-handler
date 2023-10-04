const {
  readdirSync
} = require('fs');
const {
  PermissionsBitField,
  Routes
} = require('discord.js');
const {
  REST
} = require('@discordjs/rest');
const emoji = require('../emojis.js');
const config = require('../config.js');
const logger = require('silly-logger');


module.exports = (client) => {
  const data = [];
  const commandsDirectory = './commandes/';

  readdirSync(commandsDirectory).forEach((dir) => {
    const commandFiles = readdirSync(`${commandsDirectory}${dir}/`).filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      const slashCommand = require(`../${commandsDirectory}${dir}/${file}`);

      const {
        name,
        description,
        type,
        options,
        default_permission,
        default_member_permissions
      } = slashCommand;

      if (!name) {
        logger.error(ERROR_MISSING_NAME);

        continue;
      }

      if (!description) {
        logger.error(ERROR_MISSING_DESCRIPTION);
        continue;
      }

      client.slashCommands.set(name, slashCommand);

      data.push({
        name,
        description,
        type,
        options: options ? options : null,
        default_userPerms: default_permission ? default_permission : null,
        default_member_permissions: default_member_permissions ? PermissionsBitField.resolve(default_member_permissions).toString() : null,
      });
    }
  });

  client.on('interactionCreate', async (interaction) => {

    if (!interaction.isCommand()) return;

    if (!interaction.guild) {
      const Embed = {
        color: config.color,
        description: `:x: ・ An error occurred while executing the command.`,
      };
      return interaction.reply({
        embeds: [Embed]
      });
    }
    logger.custom('COMMAND', '#618FB1', '#ffffff', ` ${interaction.guild.name} | ${interaction.channel.name} | ${interaction.user.tag} | ${interaction.commandName}`);

  });


  const rest = new REST({
    version: '10'
  }).setToken(client ? client.config.token : process.env.TOKEN);
  (async () => {
    try {
      await rest.put(Routes.applicationCommands(client ? client.config.clientID : process.env.CLIENT_ID), {
        body: data
      });
    } catch (error) {
      logger.error(error);
    }
  })();
};