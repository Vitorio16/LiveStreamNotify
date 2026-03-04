const { WebcastPushConnection } = require('tiktok-live-connector');

const activeConnections = new Map();

function startTikTokListener(username) {
  if (!username) return;

  if (activeConnections.has(username)) {
    return; // already running
  }

  const connection = new WebcastPushConnection(username);

  connection.connect()
    .then(() => console.log(`TikTok connected: ${username}`))
    .catch(err => console.error(`TikTok error (${username}):`, err));

  connection.on('streamEnd', () => {
    console.log(`TikTok ended: ${username}`);
    activeConnections.delete(username);
  });

  activeConnections.set(username, connection);
}

module.exports = { startTikTokListener };