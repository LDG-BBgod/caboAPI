const { puppeteerManager, waitForBlockUIVisible } = require('./main')

async function authCheck(userId, userData) {
  const { page } = await puppeteerManager.getInstance(userId)
  await page.waitForTimeout(300)
  const { authNum } = userData

  try {
    await page.evaluate(() => {
      document.getElementById('authNumber').value = ''
    })
    await page.type('#authNumber', authNum)
    await page.evaluate(() => {
      // 보험다모아에 존재하는 함수
      authNoMachReq()
    })
    await waitForBlockUIVisible(page)

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
      const returnData = {
        err: false,
        msg: {
          success: false,
          text: '',
        },
      }
      return returnData
    }

    // 3년이내 확인
    await page.waitForTimeout(500)
    const isStep2 = '#ifArea > div.con02_story.con_new'
    const elementExists = await page.evaluate((selector) => {
      const element = document.querySelector(selector)
      return !!element
    }, isStep2)

    if (elementExists) {
      console.log('요소가 페이지에 존재합니다.')
    } else {
      console.log('요소가 페이지에 존재하지 않습니다.')
      // 이경우 3년이내 경우이므로 예외처리 해야함
    }

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
  authCheck,
}
