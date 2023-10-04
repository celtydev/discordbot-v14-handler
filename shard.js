 const { ShardingManager } = require('discord.js');
const config = require('./config');
const logger = require('silly-logger');

const manager = new ShardingManager('./index.js', {
  token: config.token,
  totalShards: auto,
  respawn: true
});


manager.on('shardCreate', (shard) => {

  shard
    .on('ready', () => {
        logger.debug(`[Shard] Le shard ${shard.id} s'est lancé.`);

    })
    .on('disconnect', () => {
      logger.warn(`[Shard] Le shard ${shard.id} vient de se déconnecter.`);
      
    })
    .on('death', () => {
      logger.crash(`[Shard] Le shard ${shard.id} vient de subir un arrêt inattendu.`);

    });
});


manager.spawn().catch(console.error);
