const {
  puppeteerManager,
  waitForBlockUIVisible,
  retryForActions,
} = require('./main')

async function authCheck(userId, userData) {
  const { page } = await puppeteerManager.getInstance(userId)
  const { authNum } = userData
  let returnData = {
    err: false,
    msg: {
      success: true,
      text: '',
      data: [],
    },
  }
  await page.waitForTimeout(300)

  try {
    await page.evaluate(() => {
      document.getElementById('authNumber').value = ''
    })
    await page.type('#authNumber', authNum)
    await page.evaluate(() => {
      authNoMachReq()
    })
    await waitForBlockUIVisible(page)

    // 에러체크
    let elements = null
    elements = await page.evaluate(() => {
      try {
        const target = document.getElementsByClassName('ui-dialog')[0]
        return target.textContent
      } catch (err) {
        return null
      }
    })
    if (elements) {
      await page.evaluate(() => {
        document.getElementsByClassName('ui-button-text')[0].click()
      })
      returnData.msg.success = false
      return returnData
    }

    // 3년이내 확인
    const isStep2 = '#ifArea > div.con02_story.con_new'
    try {
      await page.waitForSelector(isStep2, { timeout: 5000 })
    } catch (error) {
      console.error('요소가 나타나지 않았거나 타임아웃이 발생했습니다.')
      // 이경우 3년이내 경우이므로 예외처리 해야함
    }
    const check3Year = async () => {
      const isStep2 = '#ifArea > div.con02_story.con_new'
      await page.waitForSelector(isStep2, { timeout: 200 })
    }
    if (await retryForActions(page, check3Year)) {
      returnData.msg.success = false
      returnData.msg.text = '3년'
      return returnData
    }

    // 모든작업 성공시
    const isExist = await page.$eval(
      '#table02 > table > tbody > tr > td:nth-child(1)',
      (element) => element.textContent.replace(/\s+/g, '')
    )
    returnData.msg.data = []
    if (isExist === '조회된데이터가없습니다.') {
    } else {
      const trCount = await page.evaluate(() => {
        const tbody = document.querySelector('#table02 > table > tbody')
        return tbody.querySelectorAll('tr').length
      })
      for (let i = 0; i < trCount; i++) {
        const carNum = await page.$eval(
          `#table02 > table > tbody > tr:nth-child(${i + 1}) > td:nth-child(3)`,
          (element) => element.textContent
        )
        const endDate = await page.$eval(
          `#table02 > table > tbody > tr:nth-child(${i + 1}) > td:nth-child(5)`,
          (element) => element.textContent
        )
        returnData.msg.data.push({ carNum, endDate, index: i })
      }
    }
    console.error('여기까지')
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
  authCheck,
}
