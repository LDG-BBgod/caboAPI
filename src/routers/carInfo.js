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
        
        const customOrder = ['현대', '기아', '삼성', '외산', '대우', '쌍용']
        const sortedBrands = [...jsonData].sort((a, b) => {
          const indexA = customOrder.indexOf(a.nm);
          const indexB = customOrder.indexOf(b.nm);
        
          // 주어진 순서에 따라 정렬
          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
          } else if (indexA !== -1) {
            return -1;
          } else if (indexB !== -1) {
            return 1;
          }
          // 두 항목 모두 주어진 순서에 없는 경우, 기타를 맨 마지막으로 배치
          if (a.nm === '기타') {
            return 1;
          } else if (b.nm === '기타') {
            return -1;
          }
          return 0;
        });

        return sortedBrands
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
