const mongoose = require('mongoose')

const User = new mongoose.Schema({
  isLooked: { type: Boolean, default: true, required: false },
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
      carValue1: { type: String, default: '', required: false },
      carValue2: { type: String, default: '', required: false },
      carValue3: { type: String, default: '', required: false },
      carValue4: { type: String, default: '', required: false },
      carValue5: { type: String, default: '', required: false },
      range: { type: String, default: '', required: false },
      minBirth: { type: String, default: '', required: false },
      secondBirth: { type: String, default: '', required: false },
      level: { type: String, default: '', required: false },
      option1: { type: String, default: '', required: false },
      option2: { type: String, default: '', required: false },
      option3: { type: String, default: '', required: false },
      option4: { type: String, default: '', required: false },
      option5: { type: String, default: '', required: false },
      option6: { type: String, default: '', required: false },
      option7: { type: String, default: '', required: false },
      option8: { type: String, default: '', required: false },
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
