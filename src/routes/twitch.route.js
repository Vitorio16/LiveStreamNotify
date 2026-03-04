const express = require('express');
const router = express.Router();
const { handleTwitchEvent } = require('../services/twitch.service');

router.post('/', handleTwitchEvent);

module.exports = router;