require('dotenv').config()

const Twit = require('twit')
const T = new Twit({
  consumer_key:         process.env.TWITTER_API_KEY,
  consumer_secret:      process.env.TWITTER_API_SECRET_KEY,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})
const { daysLeft, hoursLeft, minutesLeft, progress } = require('ofim')

const random = (items) => {
  return items[Math.floor(Math.random()*items.length)];
}

const prefix = [
  'Calma',
  'Relaxa'
]

const body = [
  `Faltam apenas`
]

const left = [
  daysLeft, hoursLeft, minutesLeft, progress
]

const suffix = [
  'para o mandato acabar.'
]

const tweet = (t) => {
  if (process.env.TWEETING !== 'YES') return

  T.post('statuses/update', t, (err, data, response) => {
    if (err) {
      console.error(err);
    }
  })
}

const tweetProgress = () => {
  const p = progress(false)
  const filled = Math.floor(p/10)
  const bar = `${'▓'.repeat(filled*2)}${'░'.repeat((10-filled)*2)}`;
  tweet({
    status: `Faltam ${daysLeft(true)} para o mandato acabar.\n${bar} ${progress(true)}`
  })
}

const reply = (t) => {
  tweet({
    in_reply_to_status_id: t.id_str,
    status: `${random(prefix)} @${t.user.screen_name}! ${random(body)} ${random(left)(true)} ${random(suffix)}}`
  })
}

const stream = T.stream('statuses/filter', { track: ['acabar mandato'], language: 'pt' })
stream.on('tweet', function (tweet) {
  if (tweet.user.screen_name !== 'ofimdomandato')
    reply(tweet)
})

module.exports = {
  tweetProgress,
}
