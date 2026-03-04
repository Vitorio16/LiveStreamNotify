const db = require('./db');

async function init() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS streamers (
      id SERIAL PRIMARY KEY,
      platform VARCHAR(20) NOT NULL,
      username VARCHAR(100) NOT NULL,
      telegram_chat_id VARCHAR(50) NOT NULL,
      enabled BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log("Database ready");
}

module.exports = init;