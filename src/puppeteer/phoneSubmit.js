const {
  puppeteerManager,
  waitForBlockUIVisible,
  retryForActions,
} = require('./main')

async function phoneSubmit(userId, userData) {
  const { page } = await puppeteerManager.getInstance(userId)
  const { name, fsn, bsn, telcom, phone } = userData
  let gender = null
  if (parseInt(bsn.charAt(0)) % 2 === 0) {
    gender = '여'
  } else {
    gender = '남'
  }
  const phone1 = phone.substring(0, 3)
  const phone2 = phone.substring(3, 7)
  const phone3 = phone.substring(7)
  const nation = '내국인'
  let returnData = {
    err: false,
    msg: {
      success: true,
      text: '',
    },
  }

  await page.waitForTimeout(300)
  try {
    await page.evaluate(() => {
      document.getElementById('name').value = ''
      document.getElementsByName('jumin1')[0].value = ''
      document.getElementsByName('jumin2')[0].value = ''
      document.getElementsByName('phoneNum2')[0].value = ''
      document.getElementsByName('phoneNum3')[0].value = ''
    })
    // 고객정보 입력
    await page.type('#name', name)
    await page.type('input[name="jumin1"]', fsn)
    await page.type('input[name="jumin2"]', bsn)
    await page.type('input[name="phoneNum2"]', phone2)
    await page.type('input[name="phoneNum3"]', phone3)

    switch (gender) {
      case '남':
        await page.evaluate((btn) => {
          btn.click()
        }, await page.$('#sexM'))
        break
      case '여':
        await page.evaluate((btn) => {
          btn.click()
        }, await page.$('#sexF'))
        break
      default:
        console.log('성별선택에러')
        break
    }

    switch (nation) {
      case '내국인':
        await page.evaluate(() => {
          document.querySelector('select[name="localDiv"]').value = '1'
        })
        break
      case '외국인':
        await page.evaluate(() => {
          document.querySelector('select[name="localDiv"]').value = '2'
        })
        break
      default:
        console.log('내외국인선택에러')
        break
    }

    switch (telcom) {
      case 'SKT':
        await page.evaluate((btn) => {
          btn.click()
        }, await page.$('#aSkt'))
        break
      case 'KT':
        await page.evaluate((btn) => {
          btn.click()
        }, await page.$('#aKt'))
        break
      case 'LG':
        await page.evaluate((btn) => {
          btn.click()
        }, await page.$('#aLg'))
        break
      case '알뜰SKT':
        await page.evaluate((btn) => {
          btn.click()
        }, await page.$('#arSkt'))
        break
      case '알뜰KT':
        await page.evaluate((btn) => {
          btn.click()
        }, await page.$('#arKt'))
        break
      case '알뜰LG':
        await page.evaluate((btn) => {
          btn.click()
        }, await page.$('#arLg'))
        break
      default:
        console.log('통신사선택에러')
        break
    }

    switch (phone1) {
      case '010':
        await page.evaluate(() => {
          document.querySelector('select[name="phoneNum1"]').value = '010'
        })
        break
      case '011':
        await page.evaluate(() => {
          document.querySelector('select[name="phoneNum1"]').value = '011'
        })
        break
      case '016':
        await page.evaluate(() => {
          document.querySelector('select[name="phoneNum1"]').value = '016'
        })
        break
      case '017':
        await page.evaluate(() => {
          document.querySelector('select[name="phoneNum1"]').value = '017'
        })
        break
      case '018':
        await page.evaluate(() => {
          document.querySelector('select[name="phoneNum1"]').value = '018'
        })
        break
      case '019':
        await page.evaluate(() => {
          document.querySelector('select[name="phoneNum1"]').value = '019'
        })
        break
      default:
        console.log('폰번1선택에러')
        break
    }
    await page.evaluate(() => {
      authCiReq()
    })
    await waitForBlockUIVisible(page)

    // 에러페이지 이동 체크

    // 입력 오류 에러 체크
    let elements = null
    elements = await page.evaluate(() => {
      try {
        const target = document.getElementsByClassName('ui-dialog')[0]
        return target.textContent
      } catch (err) {
        return null
      }
    })
    if (elements) {
      await page.evaluate(() => {
        document.getElementsByClassName('ui-button-text')[0].click()
      })
      returnData.msg.success = false
    }

    // 모든작업 성공시
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
  phoneSubmit,
}
