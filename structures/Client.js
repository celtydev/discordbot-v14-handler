const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  Intents
} = require("discord.js");
const config = require('../config');

class Bot extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,

      ],
      partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember
      ]
    });




    this.slashCommands = new Collection();
    this.config = config;
    this.owner = config.ownerID;
    this.commands = new Collection();
    if (!this.token) this.token = config.token;

    ['slashCommand', 'events'].forEach((handler) => {
      if (handler) {
        require(`../handlers/${handler}`)(this);
      }
    });
  }

  connect() {
    return super.login(this.token);
  };
};

module.exports = Bot;