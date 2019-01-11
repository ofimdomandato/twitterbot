require('dotenv').config()

const express = require('express')
const router = express.Router()
const { progress } = require('ofim')


router.get('/', function(req, res, next) {
  res.render('index', { title: 'O fim do mandato' });
});

router.get('/progress', function(req, res, next) {
  const { tweetProgress } = req.bot
  tweetProgress()
  res.send('OK')
});

module.exports = router;
