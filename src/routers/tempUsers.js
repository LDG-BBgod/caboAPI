const express = require('express')
const { TempUser } = require('../apis')

const router = express.Router()

router.post('/log', TempUser.userLog)
router.post('/contact', TempUser.mail)

module.exports = router
