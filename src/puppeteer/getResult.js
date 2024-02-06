const { puppeteerManager, waitForBlockUIVisible } = require('./main')
const fs = require('fs')
const path = require('path')
const { PNG } = require('pngjs')
const pixelmatch = require('pixelmatch')

async function getResult(userId, userData) {
  const { page } = await puppeteerManager.getInstance(userId)
  await page.waitForTimeout(1000)
  let carInfo = userData
  
  // option 1:대인1  2:대인2  3:대물  4:자손자상  5:무보  6:자차  7:긴급출동  8:물적할증
  switch (carInfo.level) {
    case 'level1':
      carInfo.option2 = 'rad34'
      carInfo.option3 = 'rad35'
      carInfo.option4 = 'rad99'
      carInfo.option5 = 'rad51'
      carInfo.option6 = 'rad49'
      carInfo.option7 = 'rad65'
      carInfo.option8 = 'rad63'
      break
    case 'level2m':
      carInfo.option2 = 'rad33'
      carInfo.option3 = 'rad40'
      carInfo.option4 = 'rad67'
      carInfo.option5 = 'rad50'
      carInfo.option6 = 'rad49'
      carInfo.option7 = 'rad64'
      carInfo.option8 = 'rad63'
      break
    case 'level2h':
      carInfo.option2 = 'rad33'
      carInfo.option3 = 'rad42'
      carInfo.option4 = 'rad69'
      carInfo.option5 = 'rad50'
      carInfo.option6 = 'rad49'
      carInfo.option7 = 'rad64'
      carInfo.option8 = 'rad63'
      break
    case 'level3m':
      carInfo.option2 = 'rad33'
      carInfo.option3 = 'rad40'
      carInfo.option4 = 'rad67'
      carInfo.option5 = 'rad50'
      carInfo.option6 = 'rad48'
      carInfo.option7 = 'rad64'
      carInfo.option8 = 'rad63'
      break
    case 'level3h':
      carInfo.option2 = 'rad33'
      carInfo.option3 = 'rad42'
      carInfo.option4 = 'rad69'
      carInfo.option5 = 'rad50'
      carInfo.option6 = 'rad48'
      carInfo.option7 = 'rad64'
      carInfo.option8 = 'rad63'
      break
    default:
      break
  }

  try {
    // 보장선택(운전저범위, 생년월일)
    await page.waitForSelector('#row_9 > td', {
      timeout: 5000,
    })
    await page.click('#row_9 > td')
    await page.click(`#${carInfo.range}`)
    await page.click(`#row_10 > td`)
    await page.click(
      `#info10 > div.infoMainTxt > div.newcar_dateArea > span > input`
    )
    await page.evaluate(() => {
      document.querySelector(
        `#info10 > div.infoMainTxt > div.newcar_dateArea > span > input`
      ).value = ''
    })
    await page.type(
      `#info10 > div.infoMainTxt > div.newcar_dateArea > span > input`,
      carInfo.minBirth
    )
    if (carInfo.range === 'famradio02' || carInfo.range === 'famradio04') {
      await page.click('#row_11 > td')
      await page.click(
        `#info11 > div.infoMainTxt > div.newcar_dateArea > span > input`
      )
      await page.evaluate(() => {
        document.querySelector(
          `#info11 > div.infoMainTxt > div.newcar_dateArea > span > input`
        ).value = ''
      })
      await page.type(
        `#info11 > div.infoMainTxt > div.newcar_dateArea > span > input`,
        carInfo.secondBirth
      )
    }

    // 보장선택(option 1~8)
    await page.click(`#row_2 > td`)
    await page.click(`#${carInfo.option2}`)
    await page.click(`#row_3 > td`)
    await page.click(`#${carInfo.option3}`)
    await page.click(`#row_5 > td`)
    await page.click(`#${carInfo.option5}`)
    await page.click(`#row_6 > td`)
    await page.click(`#${carInfo.option6}`)
    await page.click(`#row_7 > td`)
    await page.click(`#${carInfo.option7}`)
    await page.click(`#row_8 > td`)
    await page.click(`#${carInfo.option8}`)

    await page.click(`#row_4 > td`)

    if (
      carInfo.option4 === 'rad44' ||
      carInfo.option4 === 'rad45' ||
      carInfo.option4 === 'rad46' ||
      carInfo.option4 === 'rad47'
    ) {
      await page.evaluate(() => {
        fnClickJs1()
      })
    } else if (
      carInfo.option4 === 'rad66' ||
      carInfo.option4 === 'rad67' ||
      carInfo.option4 === 'rad68' ||
      carInfo.option4 === 'rad69' ||
      carInfo.option4 === 'rad70' ||
      carInfo.option4 === 'rad71' ||
      carInfo.option4 === 'rad72'
    ) {
      await page.evaluate(() => {
        fnClickJs2()
      })
    } else {
      await page.evaluate(() => {
        fnClickJs2()
      })
      await page.click(
        '#info04_1 > div.infoMainTxt > div.infosub > ul > li:nth-child(3) > a'
      )
    }
    await page.click(`#${carInfo.option4}`)

    await page.evaluate(() => {
      submitForm5()
    })
    await waitForBlockUIVisible(page)

    const displayValue = await page.evaluate(() => {
      const cont04 = document.getElementById('cont04')
      return getComputedStyle(cont04).display
    })

    // 스탭3에서 입력값에 문제가 없을시 통과되는 코드
    if (displayValue !== 'block') {
      let returnText = null
      returnText = await page.evaluate(() => {
        const target = document.querySelector(
          '.ui-dialog > div.ui-dialog-content.ui-widget-content > pre'
        )
        document.getElementsByClassName('ui-button-text')[0].click()
        return target.textContent
      })
      const returnData = {
        err: false,
        msg: {
          success: false,
          text: returnText,
        },
      }
      return returnData
    }

    // 스탭4 마일리지 2만키로
    await page.click('#spec_row_1 > td')
    await page.waitForSelector('#joinbirth')
    await page.select('#joinbirth', '20000')
    await page.evaluate(() => {
      submitForm4_new()
    })
    await waitForBlockUIVisible(page)

    // 결과 데이터 추출

    await Promise.race([
      page.waitForSelector('div#OO', { visible: true }),
      page.waitForSelector('div#AA', { visible: true }),
      page.waitForSelector('div#O', { visible: true }),
      page.waitForSelector('div#A', { visible: true }),
    ])

    // 마일 적용 후인경우 마일 적용 전으로 이동
    const isNoMile = await page.evaluate(() => {
      const mileApply = document.getElementById('OO')
      return getComputedStyle(mileApply).display
    })

    if (isNoMile === 'none') {
      await page.evaluate(() => {
        changeType('O')
      })
      await waitForBlockUIVisible(page)
    }

    let existData = []

    for (let i = 0; i < 11; i += 1) {
      const absoluteFilePath = path.join(__dirname, 'vsimg', `INSU${i}.png`)
      const logoImg = PNG.sync.read(fs.readFileSync(absoluteFilePath))
      existData[i] = {
        logoImg,
        name: `INSU${i}`,
      }
    }
    let versusData = []
    await page.waitForTimeout(800)
    for (let i = 0; i < 11; i += 1) {
      await page.waitForTimeout(100)
      const rankEL = await page.$(
        `#O > table > tbody > tr:nth-child(${i + 1}) > td:nth-child(1)`
      )
      const rank = await page.evaluate((element) => {
        return element.textContent
      }, rankEL)
      const moneyEL = await page.$(
        ` #O > table > tbody > tr:nth-child(${i + 1}) > td:nth-child(3)`
      )
      const money = await page.evaluate((element) => {
        return element.textContent
      }, moneyEL)
      const imgEL = await page.$(
        `#O > table > tbody > tr:nth-child(${i + 1}) > td:nth-child(2) > img`
      )
      const imgBase64 = await imgEL.screenshot({ encoding: 'base64' })
      // await imgEL.screenshot({path: `test${i}.png`})
      const logoImg = PNG.sync.read(Buffer.from(imgBase64, 'base64'))
      versusData[i] = {
        rank,
        money,
        logoImg,
      }
    }

    for (let i = 0; i < 11; i += 1) {
      const diff = new PNG({
        width: versusData[i].logoImg.width,
        height: versusData[i].logoImg.height,
      })
      for (let j = 0; j < 11; j += 1) {
        const mismatchedPixels = pixelmatch(
          versusData[i].logoImg.data,
          existData[j].logoImg.data,
          diff.data,
          versusData[i].logoImg.width,
          versusData[i].logoImg.height
        )
        if (mismatchedPixels < 200) {
          versusData[i].name = existData[j].name
          delete versusData[i].logoImg
          break
        }
      }
    }

    const returnData = {
      err: false,
      msg: {
        success: true,
        text: versusData,
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
  getResult,
}
