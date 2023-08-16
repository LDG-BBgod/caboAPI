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
    } else {
      const returnData = {
        err: false,
        msg: {
          success: true,
          text: '',
        },
      }
      return returnData
    }
  } catch (err) {
    const returnData = {
      err: true,
      msg: {},
    }
    return returnData
  }
}

module.exports = {
  authCheck,
}
