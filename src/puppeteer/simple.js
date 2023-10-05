const exec = require('child_process').exec
const puppeteer = require('puppeteer')

var cwd = process.cwd()
process.chdir('C:/Program Files/Google/Chrome/Application')
var command = 'chrome.exe  --remote-debugging-port=9222'

exec(command)
process.chdir(cwd)
;(async () => {
  const browserUrl = 'http:/localhost:9222'
  const browser = await puppeteer.connect({
    browserURL: browserUrl,
  })

  const page = await browser.newPage()

  await page.goto('https://www.e-insmarket.or.kr/')
})()
// ;(async () => {
//   // 브라우저를 실행한다.
//   // 옵션으로 headless모드를 끌 수 있다.
//   const browser = await puppeteer.launch({
//     headless: false,
//     waitUntil: 'networkidle2',
//     // executablePath:
//     //   'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
//     args: [
//       '--remote-debugging-port=9222',

//       // '--disable-features=AutomationControlled',
//       // '--incognito',
//       // '--disable-infobars',
//       // '--disable-dev-shm-usage',
//       // '--disable-features=AutomationControlled',
//     ],
//     ignoreDefaultArgs: ['--enable-automation'],
//   })

//   // 새로운 페이지를 연다.
//   const page = await browser.newPage()
//   // await page.setUserAgent(
//   //   'Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36'
//   // )

//   await page.goto('https://www.e-insmarket.or.kr/')
// })()
