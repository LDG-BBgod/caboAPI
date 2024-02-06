const { puppeteerManager, waitForBlockUIVisible } = require('./main')

async function selectCar(userId, userData) {
  const { page } = await puppeteerManager.getInstance(userId)
  let carInfo = userData
  let returnData = {
    err: false,
    msg: {
      success: true,
      text: '',
    },
  }
  await page.waitForTimeout(500)

  try {
    // 오늘 날짜 선택 화면
    await page.evaluate((button) => {
      button.click()
    }, await page.$('#ifArea > div.con02_story.con_new'))

    await waitForBlockUIVisible(page)

    await page.evaluate(() => {
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const month = String(currentDate.getMonth() + 1).padStart(2, '0')
      const day = String(currentDate.getDate()).padStart(2, '0')
      const startDate = `${year}-${month}-${day}`
      const endDate = `${year + 1}-${month}-${day}`

      document.getElementById('insStartDtPicker').value = startDate
      document.getElementById('datepicker2').value = endDate
      setDateParam()
    })

    await waitForBlockUIVisible(page)

    // // 차량정보 선택화면(5가지)
    // 제조사
    await page.evaluate((data) => {
      const inputs = document.getElementsByName('iMaker')
      for (const input of inputs) {
        if (input.value.includes(data)) {
          input.click()
        }
      }
    }, carInfo.carValue1)
    await waitForBlockUIVisible(page)
    await page.waitForTimeout(200)

    // 자동차명
    try {
      await page.evaluate((data) => {
        const inputs = document.getElementsByName('iCarName')
        for (const input of inputs) {
          if (input.value.includes(data)) {
            input.click()
          }
        }
      }, carInfo.carValue2)

    } catch {
      await page.evaluate((data) => {
        const inputs = document.getElementsByName('iMaker')
        for (const input of inputs) {
          if (input.value.includes(data)) {
            input.click()
          }
        }
      }, carInfo.carValue1)
      await waitForBlockUIVisible(page)
      await page.waitForTimeout(200)
      await page.evaluate((data) => {
        const inputs = document.getElementsByName('iCarName')
        for (const input of inputs) {
          if (input.value.includes(data)) {
            input.click()
          }
        }
      }, carInfo.carValue2)
    }
    await waitForBlockUIVisible(page)
    await page.waitForTimeout(200)
    // 등록년도
    try{
      await page.evaluate((data) => {
        const inputs = document.getElementsByName('iMadeym')
        for (const input of inputs) {
          if (input.value.includes(data)) {
            input.click()
          }
        }
      }, carInfo.carValue3)
    }catch{
      await page.evaluate((data) => {
        const inputs = document.getElementsByName('iCarName')
        for (const input of inputs) {
          if (input.value.includes(data)) {
            input.click()
          }
        }
      }, carInfo.carValue2)
      await waitForBlockUIVisible(page)
      await page.waitForTimeout(200)
      await page.evaluate((data) => {
        const inputs = document.getElementsByName('iMadeym')
        for (const input of inputs) {
          if (input.value.includes(data)) {
            input.click()
          }
        }
      }, carInfo.carValue3)
    }
    await waitForBlockUIVisible(page)
    await page.waitForTimeout(200)

    // 세부차명
    try{
      await page.evaluate((data) => {
        const inputs = document.getElementsByName('iCarNameDtl')
        for (const input of inputs) {
          if (input.value.includes(data)) {
            input.click()
          }
        }
      }, carInfo.carValue4)
    }catch{
      await page.evaluate((data) => {
        const inputs = document.getElementsByName('iMadeym')
        for (const input of inputs) {
          if (input.value.includes(data)) {
            input.click()
          }
        }
      }, carInfo.carValue3)
      await waitForBlockUIVisible(page)
      await page.waitForTimeout(200)
      await page.evaluate((data) => {
        const inputs = document.getElementsByName('iCarNameDtl')
        for (const input of inputs) {
          if (input.value.includes(data)) {
            input.click()
          }
        }
      }, carInfo.carValue4)
    }
    await waitForBlockUIVisible(page)
    await page.waitForTimeout(200)

    // 세부항목
    try{
      await page.evaluate((data) => {
        const inputs = document.getElementsByName('iOptionDtl')
        for (const input of inputs) {
          if (input.value.includes(data)) {
            input.click()
          }
        }
      }, carInfo.carValue5)
    }catch{
      await page.evaluate((data) => {
        const inputs = document.getElementsByName('iCarNameDtl')
        for (const input of inputs) {
          if (input.value.includes(data)) {
            input.click()
          }
        }
      }, carInfo.carValue4)
      await waitForBlockUIVisible(page)
      await page.waitForTimeout(200)
      await page.evaluate((data) => {
        const inputs = document.getElementsByName('iOptionDtl')
        for (const input of inputs) {
          if (input.value.includes(data)) {
            input.click()
          }
        }
      }, carInfo.carValue5)
    }

    await page.evaluate(() => {
      setParam('1')
    })
    await waitForBlockUIVisible(page)
    await page.waitForTimeout(200)

    return returnData
  } catch (err) {
    const isDisconnected = err.message.includes(
      'Navigation failed because browser has disconnected!'
    )
    if (!isDisconnected) {
      returnData.err = true
    }
    return returnData
  }
}

module.exports = {
  selectCar,
}
