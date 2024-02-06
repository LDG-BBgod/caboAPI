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
  step4Back,
}
