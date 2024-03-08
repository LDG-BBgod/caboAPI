const mongoose = require('mongoose')

const Mail = new mongoose.Schema(
  {
    userIp: { type: String, default: true, required: false },
    name: { type: String, default: '', required: false },
    phone: { type: String, default: '', required: false },
    email: { type: String, default: '', required: false },
    question: { type: String, default: '', required: false },
  },
)

module.exports = Mail
