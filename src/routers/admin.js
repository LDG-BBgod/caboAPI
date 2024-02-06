const express = require('express')
const { User } = require('../mongoose/model')

const router = express.Router()

router.post('/login', async (req, res) => {
  const { id, pw } = req.body
  id === 'padzz321' && pw === 'ldg8410229!' ? res.send(true) : res.send(false)
})
router.post('/getName', async (req, res) => {
  const { id, pw } = req.body
  let isTrue = false
  id === 'padzz321' && pw === 'ldg8410229!' ? (isTrue = true) : (isTrue = false)
  const resData = {
    data: [],
  }
  try {
    if (isTrue) {
      const allUser = await User.find()
      allUser.forEach((item) => {
        resData.data.push({
          name: item.name,
          isLooked: item.isLooked,
        })
      })
    }
  } catch (err) {
    console.log(err)
  }
  res.send(resData)
})
router.post('/getDetail', async (req, res) => {
  const { id, pw, name } = req.body
  let isTrue = false
  id === 'padzz321' && pw === 'ldg8410229!' ? (isTrue = true) : (isTrue = false)
  let resData = {}
  try {
    if (isTrue) {
      resData = await User.findOne({ name })
      resData.isLooked = true
      await resData.save()
    }
  } catch (err) {
    console.log(err)
  }
  res.send(resData)
})
module.exports = router
