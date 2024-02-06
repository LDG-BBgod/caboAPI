function waitSeconds(number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, number)
  })
}
const puppeteer = require('puppeteer')

class PuppeteerManager {
  constructor() {
    this.instances = null
    this.pendingInstances = false
    // console.log('puppeteer 매니저가 생성되었습니다')
  }

  async createInstance(userId) {
    let option = null
    if (process.env.IS_DEV === 'true') {
      option = {
        headless: false,
        // executablePath:
        //   'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: [
          '--remote-debugging-port=9224',
          '--incognito',
          '--no-sandbox',
          '--disable-infobars',
          '--disable-dev-shm-usage',
          '--disable-features=AutomationControlled',
        ],
        ignoreDefaultArgs: ['--enable-automation'],
      }
    } else {
      option = {
        // headless: 'new',
        headless: false,
        executablePath: '/usr/bin/chromium-browser',
        args: [
          '--remote-debugging-port=9224',
          '--incognito',
          '--no-zygote',
          '--mute-audio',
          '--no-sandbox',
          '--disable-gpu',
          '--no-first-run',
          '--single-process',
          '--hide-scrollbars',
          '--disable-breakpad',
          '--disable-infobars',
          '--disable-extensions',
          '--disable-dev-shm-usage',
          '--disable-notifications',
          '--disable-dev-shm-usage',
          '--metrics-recording-only',
          '--disable-setuid-sandbox',
          '--force-color-profile=srgb',
          '--ignore-certificate-errors',
          '--disable-accelerated-2d-canvas',
          '--disable-renderer-backgrounding',
          '--disable-ipc-flooding-protection',
          '--ignore-certificate-errors-skip-list',
          '--disable-background-timer-throttling',
          '--disable-features=AutomationControlled',
          '--disable-backgrounding-occluded-windows',
          '--disable-component-extensions-with-background-pages',
          '--disable-features=TranslateUI,BlinkGenPropertyTrees',
          '--enable-features=NetworkService,NetworkServiceInProcess',
        ],
        ignoreDefaultArgs: ['--enable-automation'],
      }
    }

    const pendingPromise = async () => {
      // const xvfb = new Xvfb({
      //   silent: true,
      //   xvfb_args: ['-screen', '0', '1280x720x24', '-ac'],
      // })
      // xvfb.start((err) => {
      //   if (err) console.error(err)
      // })

      // option.args.push(`--display=${xvfb._display}`)

      const browser = await puppeteer.launch(option)
      const pages = await browser.pages()
      const page = pages[0]
      page.on('popup', (newPage) => {
        newPage.close()
      })
      console.log(userId, 'puppeteer 인스턴스가 생성되었습니다')
      return { browser, page }
    }
    let newInstance = null
    try {
      this.pendingInstances = true
      newInstance = await pendingPromise()
    } catch (err) {
      console.log(userId, '인스턴스 생성 오류', err)
      this.pendingInstances = false
    }
    this.instances = newInstance
    this.pendingInstances = false
    return newInstance
  }

  async getInstance(userId) {
    if (this.instances) {
      return this.instances
    } else {
      const newInstance = await this.createInstance(userId)
      this.instances = newInstance

      return newInstance
    }
  }

  async releaseInstance(userId) {
    if (this.instances) {
      const { browser, page } = this.instances
      await page.close()
      await browser.close()
      this.instances = null
      console.log(userId, 'puppeteer 인스턴스가 종료되었습니다.')
    } else if (this.pendingInstances === true) {
      await waitSeconds(1000)
      await this.releaseInstance(userId)
    }
  }

  async checkInstance() {
    console.log(`인스턴스 수 : ${this.instances}`)
  }
}

// 보험다모아 로딩 기다리는 함수
async function waitForBlockUIVisible(page) {
  try {
    await page.waitForFunction(
      () => {
        const blockUIElement = document.querySelector('.blockUI')
        return blockUIElement !== null
      },
      { timeout: 2000 }
    )
    try {
      await page.waitForFunction(
        () => {
          const blockUIElement = document.querySelector('.blockUI')
          return blockUIElement === null
        },
        { timeout: 2000 }
      )
      return true
    } catch (err) {
      return false
    }
  } catch (err) {
    return false
  }
}

// 보험다모아 재시도 함수
async function retryForActions(page, Func) {
  for (let retry = 1; retry <= 3; retry++) {
    try {
      await Func()
      return false
    } catch (err) {
      console.log('실행실패', retry, ' : ', Func)
      await page.waitForTimeout(333)
    }
  }
  return true
}

const puppeteerManager = new PuppeteerManager()

module.exports = {
  puppeteerManager,
  waitForBlockUIVisible,
  retryForActions,
}
