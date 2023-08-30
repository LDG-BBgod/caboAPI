// @ts-check
/* eslint-disable no-console */

const express = require('express')
const crypto = require('crypto')

const { User } = require('../apis')

const router = express.Router()

router.post('/create', User.userCreate)
router.post('/update', User.userUpdate)
router.post('/updateCustomer', User.userUpdateCustomer)

router.post('/pid', (req, res) => {
  function encrypt(text) {
    const cipher = crypto.createCipher('aes-256-cbc', 'encryption-key')
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
  }
  let resString
  try {
    const originalString = req.body.name + req.body.phone
    const encryptedString = encrypt(originalString)
    const dtype = req.body.type === '6' ? 'A' : 'B'
    resString = `https://www.smartcabo.co.kr/mo?dtype=${dtype}&pid=${encryptedString}`
  } catch (err) {
    resString = `pid생성에러`
  }

  res.send(resString)
})

module.exports = router
