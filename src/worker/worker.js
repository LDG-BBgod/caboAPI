const { parentPort } = require('worker_threads')
const { puppeteerManager } = require('../puppeteer/main')

const { pageInit } = require('../puppeteer/pageInit')
const { phoneSubmit } = require('../puppeteer/phoneSubmit')
const { reSendAuth } = require('../puppeteer/reSendAuth')
const { authCheck } = require('../puppeteer/authCheck')

// 새로운 차량인경우
const { selectCar } = require('../puppeteer/selectCar')
const { step4Back } = require('../puppeteer/step4Back')
const { getResult } = require('../puppeteer/getResult')

// 갱신 차량인경우
const { existCar } = require('../puppeteer/existCar')
const { existGetResult } = require('../puppeteer/existGetResult')

const { test } = require('../puppeteer/test')

parentPort.on('message', async (message) => {
  const { type, userIP, data } = message
  try {
    let result
    console.log(userIP, type, '처리시작')
    switch (type) {
      case 'pageInit':
        await puppeteerManager.releaseInstance(userIP)
        result = await pageInit(userIP)
        break
      case 'phoneSubmit':
        result = await phoneSubmit(userIP, data)
        break
      case 'reSendAuth':
        result = await reSendAuth(userIP, data)
        break
      case 'authCheck':
        result = await authCheck(userIP, data)
        break

      // 새로운 차량인경우
      case 'selectCar':
        result = await selectCar(userIP, data)
        break
      case 'step4Back':
        result = await step4Back(userIP, data)
        break
      case 'getResult':
        result = await getResult(userIP, data)
        await puppeteerManager.releaseInstance(userIP)
        break

      // 갱신 차량인경우
      case 'existCar':
        result = await existCar(userIP, data)
        break
      case 'existGetResult':
        result = await existGetResult(userIP, data)
        break

      // 기타
      case 'test':
        result = await test(userIP, data)
        break
      case 'exit':
        await puppeteerManager.releaseInstance(userIP)
        result = {
          err: false,
        }
        break
      default:
        console.log('워커 케이스 에러')
        break
    }
    console.log(userIP, type, '처리완료 ', '[ 에러 :', result.err, ']')

    if (result.err) {
      await puppeteerManager.releaseInstance(userIP)
    }
    parentPort.postMessage(result)
  } catch (err) {
    console.log(userIP, type, '워커처리중 에러발생')
    const result = {
      err: true,
    }
    parentPort.postMessage(result)
  }
})
