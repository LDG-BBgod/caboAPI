const mongoose = require('mongoose')
const schema = require('./schema')

const db = mongoose.connection
const model = (() => {
  db.on('error', console.error)
  db.once('open', async () => {
    // 쿼리에 새로운 필드 추가시 사용
    // const User = schema.User
    // try {
    //   const UserModel = mongoose.model('User', User);
    //   // Update all existing documents to set isLooked to true
    //   await UserModel.updateMany({}, { $set: { isLooked: true } });
    //   console.log('isLooked field added and updated for existing documents.');
    // } catch (error) {
    //   console.error('Error updating existing documents:', error);
    // }
  })
  console.log(
    `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PW}@smartcabo.ot2ea6n.mongodb.net/smartcabo`
  )
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PW}@smartcabo.ot2ea6n.mongodb.net/smartcabo`,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`)
  })

  const models = {}
  for (const key in schema) {
    models[key] = mongoose.model(key, schema[key])
  }
  console.log('db셋팅완료')
  return models
})()

module.exports = model
