const { isLive, setLive } = require('./state.service');
const { sendLiveNotification } = require('./telegram.service');

async function handleTwitchEvent(req, res) {
  const messageType = req.headers['twitch-eventsub-message-type'];

  if (messageType === 'webhook_callback_verification') {
    return res.status(200).send(req.body.challenge);
  }

  if (messageType === 'notification') {
    const event = req.body.event;

    if (event.type === 'live') {
      if (await isLive('twitch')) return res.sendStatus(200);

      await sendLiveNotification(
        'Twitch',
        `https://twitch.tv/${event.broadcaster_user_login}`
      );

      await setLive('twitch', true);
    }
  }

  res.sendStatus(200);
}

module.exports = { handleTwitchEvent };