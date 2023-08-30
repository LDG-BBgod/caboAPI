// @ts-check
/* eslint-disable no-console */
const express = require('express')
const { User } = require('../apis')

const router = express.Router()

router.post('/create', User.userCreate)
router.post('/update', User.userUpdate)
router.post('/updateCustomer', User.userUpdateCustomer)

module.exports = router




