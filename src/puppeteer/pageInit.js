const { puppeteerManager } = require('./main')

async function pageInit(userId) {
  const { page } = await puppeteerManager.getInstance(userId)
  await page.waitForTimeout(300)
  try {
    // 페이지 접속
    await page.goto('https://www.e-insmarket.or.kr/')
    await page.waitForFunction(() => typeof fnGoAimtRealIntro === 'function', {
      timeout: 5000,
    })
    console.log(userId, '다모아 사이트 접속 완료')

    // 자동차보험비교 페이지 접속
    await page.evaluate(() => {
      fnGoAimtRealIntro()
    })
    await page.waitForFunction(() => typeof allTermAgree === 'function', {
      timeout: 5000,
    })
    console.log(userId, '정보입력 페이지 접속 완료')

    // 기본셋팅
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
    const returnData = {
      err: false,
      msg: {
        success: true,
        text: '',
      },
    }
    return returnData
  } catch (err) {
    const returnData = {
      err: true,
      msg: {},
    }
    return returnData
  }
}

module.exports = {
  pageInit,
}
