const { puppeteerManager, retryForActions } = require('./main')

async function pageInit(userId) {
  const { page } = await puppeteerManager.getInstance(userId)
  let returnData = {
    err: false,
    msg: {
      success: true,
      text: '',
    },
  }
  await page.waitForTimeout(300)

  try {
    // 다모아접속
    const goDamoa = async () => {
      await page.goto('https://www.e-insmarket.or.kr/', { timeout: 5000 })
      await page.waitForFunction(() => typeof fnGoAimtRealIntro === 'function')
    }
    if (await retryForActions(page, goDamoa)) {
      returnData.err = true
      return returnData
    }

    // 스탭1 접속
    const goStep1 = async () => {
      await page.evaluate(() => {
        fnGoAimtRealIntro()
      })
      await page.waitForFunction(() => typeof allTermAgree === 'function', {
        timeout: 3000,
      })
    }
    if (await retryForActions(page, goStep1)) {
      returnData.err = true
      return returnData
    }

    // 스탭1 기본셋팅
    const step1Setting = async () => {
      await page.click('#allTermAgreeButton')
      await page.click('#story3_btn > button.mobile')

      await page.waitForSelector('#authInfo > div.terms > button', {
        visible: true,
      })
      await page.evaluate(
        (btn1, btn2) => {
          btn1.click()
          btn2.click()
        },
        await page.$('#authInfo > div.terms > button'),
        await page.$('#agreeChk5')
      )
    }
    if (await retryForActions(page, step1Setting)) {
      returnData.err = true
      return returnData
    }

    // 모든작업 성공시
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
  pageInit,
}
