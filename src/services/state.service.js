const redis = require('../clients/redis.client');

async function isLive(platform) {
  return (await redis.get(`stream:${platform}`)) === 'live';
}

async function setLive(platform, value) {
  await redis.set(`stream:${platform}`, value ? 'live' : 'offline');
}

module.exports = { isLive, setLive };