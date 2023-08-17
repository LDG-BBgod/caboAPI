const { parentPort } = require('worker_threads')
const { puppeteerManager } = require('../puppeteer/main')

const { pageInit } = require('../puppeteer/pageInit')
const { phoneSubmit } = require('../puppeteer/phoneSubmit')
const { authCheck } = require('../puppeteer/authCheck')
const { getResult } = require('../puppeteer/getResult')
const { selectCar } = require('../puppeteer/selectCar')
const { step4Back } = require('../puppeteer/step4Back')
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
      case 'authCheck':
        result = await authCheck(userIP, data)
        break
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
      case 'test':
        result = await test(userIP, data)
        break
      case 'exit':
        await puppeteerManager.releaseInstance(userIP)
        result = {
          err: false
        }
        break
      default:
        console.log('워커 케이스 에러')
        break
    }
    console.log(userIP, type, '처리완료', result)
    if (result.err) {
      await puppeteerManager.releaseInstance(userIP)
    }
    parentPort.postMessage(result)
  } catch (err) {
    const result = {
      err: true,
    }
    parentPort.postMessage(result)
  }
})
