require('dotenv').config();
const express = require('express');
const path = require('path');

const db = require('./db');
const twitchRoute = require('./routes/twitch.route');
const { startTikTokListener } = require('./services/tiktok.service');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Webhook route
app.use('/webhooks/twitch', twitchRoute);

//
// 🏠 Dashboard
//
app.get('/', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM streamers ORDER BY id DESC'
  );

  res.render('index', { streamers: result.rows });
});

//
// ➕ Add Streamer Route
//
app.post('/add', async (req, res) => {
  const { platform, username, telegram_chat_id } = req.body;

  await db.query(
    'INSERT INTO streamers (platform, username, telegram_chat_id) VALUES ($1, $2, $3)',
    [platform, username, telegram_chat_id]
  );

  if (platform === 'tiktok') {
    startTikTokListener(username);
  }

  res.redirect('/');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});