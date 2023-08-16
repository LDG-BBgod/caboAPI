const { puppeteerManager, waitForBlockUIVisible } = require('./main')

async function step4Back(userId, userData) {
  const { page } = await puppeteerManager.getInstance(userId)
  await page.waitForTimeout(300)
  const { authNum } = userData

  try {
    await page.evaluate(() => {
      goTab2_new()
    })
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
  step4Back,
}
