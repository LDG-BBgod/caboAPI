const mongoose = require('mongoose')
const schema = require('./schema')

const db = mongoose.connection
const model = (() => {
  db.on('error', console.error)
  db.on('open', () => {})

  mongoose.connect(
    `mongodb+srv://padzz321:ldg8410229@smartcabo.ot2ea6n.mongodb.net/smartcabo`,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  const models = {}
  for (const key in schema) {
    models[key] = mongoose.model(key, schema[key])
  }

  return models
})()

module.exports = model
