const { puppeteerManager, waitForBlockUIVisible } = require('./main')
const fs = require('fs')
const path = require('path')
const { PNG } = require('pngjs')
const pixelmatch = require('pixelmatch')

async function test(userId, userData) {
  // 현재창크롬

  // 현재창크롬

  try {
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.connect({
      browserWSEndpoint:
        'ws://127.0.0.1:9222/devtools/browser/91a65724-6d73-4eea-a1e9-62bb010ab46b',
    })
    const pages = await browser.pages()
    const page = pages[0]
    await page.setViewport({ width: 1150, height: 1080 })

    // await Promise.race([
    //   page.waitForSelector('div#OO', { visible: true }),
    //   page.waitForSelector('div#AA', { visible: true }),
    //   page.waitForSelector('div#O', { visible: true }),
    //   page.waitForSelector('div#A', { visible: true }),
    // ])

    // //   // 마일 적용 후인경우 마일 적용 전으로 이동
    // const displayValue = await page.evaluate(() => {
    //   const mileApply = document.getElementById('OO')
    //   return getComputedStyle(mileApply).display
    // })

    // if (displayValue === 'none') {
    //   await page.evaluate(() => {
    //     changeType('O')
    //   })
    //   await waitForBlockUIVisible(page)
    // }

    // let existData = []
    // for (let i = 0; i < 11; i += 1) {
    //   const logoImg = PNG.sync.read(fs.readFileSync(`vsimg/INSU${i}.png`))
    //   existData[i] = {
    //     logoImg,
    //     name: `INSU${i}`,
    //   }
    // }
    // let versusData = []
    // for (let i = 0; i < 11; i += 1) {
    //   const rankEL = await page.$(
    //     `#O > table > tbody > tr:nth-child(${i + 1}) > td:nth-child(1)`
    //   )
    //   const rank = await page.evaluate((element) => {
    //     return element.textContent
    //   }, rankEL)
    //   const moneyEL = await page.$(
    //     ` #O > table > tbody > tr:nth-child(${i + 1}) > td.txt_r`
    //   )
    //   const money = await page.evaluate((element) => {
    //     return element.textContent
    //   }, moneyEL)
    //   const imgEL = await page.$(
    //     `#O > table > tbody > tr:nth-child(${i + 1}) > td:nth-child(2) > img`
    //   )
    //   const imgBase64 = await imgEL.screenshot({ encoding: 'base64' })
    //   const logoImg = PNG.sync.read(Buffer.from(imgBase64, 'base64'))
    //   versusData[i] = {
    //     rank,
    //     money,
    //     logoImg,
    //   }
    // }

    // for (let i = 0; i < 11; i += 1) {
    //   const diff = new PNG({
    //     width: versusData[i].logoImg.width,
    //     height: versusData[i].logoImg.height,
    //   })
    //   for (let j = 0; j < 11; j += 1) {
    //     const mismatchedPixels = pixelmatch(
    //       versusData[i].logoImg.data,
    //       existData[j].logoImg.data,
    //       diff.data,
    //       versusData[i].logoImg.width,
    //       versusData[i].logoImg.height
    //     )
    //     if (mismatchedPixels < 200) {
    //       versusData[i].name = existData[j].name
    //       delete versusData[i].logoImg
    //       break
    //     }
    //   }
    // }

    // const returnData = {
    //   err: false,
    //   msg: {
    //     success: true,
    //     text: versusData,
    //   },
    // }
    // return returnData
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
  test,
}
