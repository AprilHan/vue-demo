var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
  res.send('hello world')
})
router.post('/test', (req, res) => {
  console.log(req)
  res.send('success')
})

module.exports = router
