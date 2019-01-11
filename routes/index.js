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

router.get('/ping', function(req, res, next) {
  res.send('OK')
});

router.get('/ATriggerVerify.txt', function(req, res, next) {
  res.send(```CDBDE21DCC1A2E0047AF582EB616AF72

This is ATrigger.com API Verification File.
This file should be placed on the root folder of target url. This file is unique for each account in ATrigger.com
http://example.com/mySite/Task?name=joe        This file should be available at: http://example.com/ATriggerVerify.txt
http://sub.example.com/mySite/Task?name=joe    This file should be available at: http://sub.example.com/ATriggerVerify.txt

```)
});

module.exports = router;
