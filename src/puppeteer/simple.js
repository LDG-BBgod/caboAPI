// puppeteer을 가져온다.
const puppeteer = require('puppeteer')

;(async () => {
  // 브라우저를 실행한다.
  // 옵션으로 headless모드를 끌 수 있다.
  const browser = await puppeteer.launch({
    headless: false,
    waitUntil: 'networkidle2',
    // executablePath:
    //   'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: [
      '--remote-debugging-port=9222',

      // '--disable-features=AutomationControlled',
      // '--incognito',
      // '--disable-infobars',
      // '--disable-dev-shm-usage',
      // '--disable-features=AutomationControlled',
    ],
    ignoreDefaultArgs: ['--enable-automation'],
  })

  // 새로운 페이지를 연다.
  const page = await browser.newPage()
  // await page.setUserAgent(
  //   'Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36'
  // )

  await page.goto('https://www.e-insmarket.or.kr/')
})()
