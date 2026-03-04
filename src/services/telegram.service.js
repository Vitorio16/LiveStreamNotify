const axios = require('axios');

const BOT = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendLiveNotification(platform, url) {
  return axios.post(
    `https://api.telegram.org/bot${BOT}/sendMessage`,
    {
      chat_id: CHAT_ID,
      text: `🔥 I'm LIVE on ${platform}!\n\nWatch here:\n${url}`,
      reply_markup: {
        inline_keyboard: [
          [{ text: `Watch on ${platform}`, url }]
        ]
      }
    }
  );
}

module.exports = { sendLiveNotification };