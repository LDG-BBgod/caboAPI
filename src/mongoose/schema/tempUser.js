const mongoose = require('mongoose')

const TempUser = new mongoose.Schema(
  {
    userIp: { type: String, default: true, required: false },
    log: { type: String, default: '', required: false },
    register: { type: Date, default: Date.now, required: true },
  }
)

module.exports = TempUser
