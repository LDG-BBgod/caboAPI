// @ts-check
/* eslint-disable no-console */

const express = require('express')

const axios = require('axios')

const router = express.Router()

router.post('/option1', async (req, res) => {
  let resData = null
  try {
    resData = await axios
      .get(`https://api.codef.io/v1/kr/car/brand-list`)
      .then((res) => {
        const decodeData = decodeURIComponent(res.data)
        const jsonData = JSON.parse(decodeData).data
        return jsonData.reverse()
      })
  } catch (err) {
    console.log(err)
  }
  res.send(resData)
})

router.post('/option2', async (req, res) => {
  let resData = null
  try {
    const options1 = req.body.options.carValue1.id
    resData = await axios
      .get(`https://api.codef.io/v1/kr/car/model-list?brand=${options1}`)
      .then((res) => {
        const decodeData = decodeURIComponent(res.data)
        const jsonData = JSON.parse(decodeData).data
        return jsonData
      })
  } catch (err) {
    console.log(err)
  }
  res.send(resData)
})

router.post('/option3', async (req, res) => {
  let resData = null
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  const formattedDate = `${year}${month}${day}`
  try {
    const options1 = req.body.options.carValue1.id
    const options2 = req.body.options.carValue2.id
    resData = await axios
      .get(
        `https://api.codef.io/v1/kr/car/year-list?brand=${options1}&model=${options2}&startDate=${formattedDate}`
      )
      .then((res) => {
        const decodeData = decodeURIComponent(res.data)
        const jsonData = JSON.parse(decodeData).data
        return jsonData
      })
  } catch (err) {
    console.log(err)
  }
  res.send(resData)
})

router.post('/option4', async (req, res) => {
  let resData = null
  try {
    const options1 = req.body.options.carValue1.id
    const options2 = req.body.options.carValue2.id
    const options3 = req.body.options.carValue3.id
    resData = await axios
      .get(
        `https://api.codef.io/v1/kr/car/detail-list?brand=${options1}&model=${options2}&year=${options3}`
      )
      .then((res) => {
        const decodeData = decodeURIComponent(res.data)
        const jsonData = JSON.parse(decodeData).data
        return jsonData
      })
  } catch (err) {
    console.log(err)
  }
  res.send(resData)
})

router.post('/option5', async (req, res) => {
  let resData = null
  try {
    const options1 = req.body.options.carValue1.id
    const options2 = req.body.options.carValue2.id
    const options3 = req.body.options.carValue3.id
    const options4 = req.body.options.carValue4.id
    resData = await axios
      .get(
        `https://api.codef.io/v1/kr/car/option-list?brand=${options1}&model=${options2}&year=${options3}&option=${options4}`
      )
      .then((res) => {
        const decodeData = decodeURIComponent(res.data)
        const jsonData = JSON.parse(decodeData).data
        return jsonData
      })
  } catch (err) {
    console.log(err)
  }
  res.send(resData)
})

module.exports = router
