// @ts-check
/* eslint-disable no-console */

const express = require('express')

const router = express.Router()

router.post('/pwCheck', async (req, res) => {
  req.body.value === '4989' ? res.send(true) : res.send(false)
})

module.exports = router
