const mongoose = require('mongoose')

const User = new mongoose.Schema({
  pid: { type: String, default: '', required: true, unique: true },
  name: { type: String, default: '', required: false },
  phone: { type: String, default: '', required: false },
  log: { type: String, default: '', required: false },
  customer: [
    {
      register: { type: String, default: '', required: false },
      csname: { type: String, default: '', required: false },
      phoneAuth: { type: String, default: '', required: false },
      fsn: { type: String, default: '', required: false },
      bsn: { type: String, default: '', required: false },
      list: { type: String, default: '', required: false },
      sendContent: [
        {
          phoneSend: { type: String, default: '', required: false },
          insuType: { type: String, default: '', required: false },
          insuList: { type: String, default: '', required: false },
        }
      ]
    },
  ],
})

module.exports = User
