const { puppeteerManager, waitForBlockUIVisible } = require('./main')

async function existCar(userId, userData) {
  const { page } = await puppeteerManager.getInstance(userId)
  let selectedCarIndex = userData.selectedCar
  let returnData = {
    err: false,
    msg: {},
  }
  await page.waitForTimeout(500)

  try {
    const buttonSelector = `#table02 > table > tbody > tr:nth-child(${
      selectedCarIndex + 1
    }) > td:nth-child(6) > button`

    await page.click(buttonSelector)

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
  existCar,
}
