const { puppeteerManager, waitForBlockUIVisible } = require('./main')

async function selectCar(userId, userData) {
  const { page } = await puppeteerManager.getInstance(userId)
  await page.waitForTimeout(300)
  let carInfo = userData

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
    await page.evaluate((data) => {
      const inputs = document.getElementsByName('iMaker')
      for (const input of inputs) {
        if (input.value.includes(data)) {
          input.click()
        }
      }
    }, carInfo.carValue1)
    await waitForBlockUIVisible(page)
    await page.waitForTimeout(100)

    await page.evaluate((data) => {
      const inputs = document.getElementsByName('iCarName')
      for (const input of inputs) {
        if (input.value.includes(data)) {
          input.click()
        }
      }
    }, carInfo.carValue2)
    await waitForBlockUIVisible(page)
    await page.waitForTimeout(100)

    await page.evaluate((data) => {
      const inputs = document.getElementsByName('iMadeym')
      for (const input of inputs) {
        if (input.value.includes(data)) {
          input.click()
        }
      }
    }, carInfo.carValue3)
    await waitForBlockUIVisible(page)
    await page.waitForTimeout(100)

    await page.evaluate((data) => {
      const inputs = document.getElementsByName('iCarNameDtl')
      for (const input of inputs) {
        if (input.value.includes(data)) {
          input.click()
        }
      }
    }, carInfo.carValue4)
    await waitForBlockUIVisible(page)
    await page.waitForTimeout(100)

    await page.evaluate((data) => {
      const inputs = document.getElementsByName('iOptionDtl')
      for (const input of inputs) {
        if (input.value.includes(data)) {
          input.click()
        }
      }
    }, carInfo.carValue5)

    await page.evaluate(() => {
      setParam('1')
    })
    await waitForBlockUIVisible(page)

    const returnData = {
      err: false,
      msg: {
        success: true,
        text: '',
      },
    }
    return returnData
    
  } catch (err) {
    if (
      err.message.includes(
        'Navigation failed because browser has disconnected!'
      )
    ) {
      const returnData = {
        err: false,
        msg: {},
      }
      return returnData
    } else {
      const returnData = {
        err: true,
        msg: {},
      }
      return returnData
    }
  }
}

module.exports = {
  selectCar,
}
