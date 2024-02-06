const { puppeteerManager, retryForActions, waitForBlockUIVisible } = require('./main')

async function reSendAuth(userId, data) {
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
    const reSendSMS = async () => {
      await page.evaluate(() => {
        authCiReq()
      })
    }
    if (await retryForActions(page, reSendSMS)) {
      returnData.err = true
      return returnData
    }
    await waitForBlockUIVisible(page)
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
  reSendAuth,
}
