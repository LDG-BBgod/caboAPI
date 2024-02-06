    // let trigger = true
    // let returnValue = false
    // while (trigger) {
    //   await page.evaluate(() => {
    //     // 보험다모아에 존재하는 함수
    //     authCiReq()
    //   })
    //   await waitForBlockUIVisible(page)

    //   const inputVisible = await page.evaluate(() => {
    //     const element = document.querySelector('#authNumber')
    //     if (element) {
    //       const style = getComputedStyle(element)
    //       return style.visibility !== 'hidden' && style.display !== 'none'
    //     }
    //     return false
    //   })
    //   if (!inputVisible) {
    //     const textContent = await page.evaluate(() => {
    //       const elements = document.querySelectorAll('.ui-dialog')
    //       const lastElement = elements[elements.length - 1]
    //       const uiDialogTitle = lastElement.querySelector('.ui-dialog-title')
    //       return uiDialogTitle.textContent
    //     })
    //     if (textContent === '휴대폰인증번호 요청오류[]') {
    //       await page.waitForTimeout(1000)
    //       await page.keyboard.press('Escape')
    //       await page.waitForTimeout(1000)
    //     } else if (textContent === '휴대폰인증번호 요청오류[0000/B100]') {
    //       await page.waitForTimeout(1000)
    //       await page.keyboard.press('Escape')
    //       await page.waitForTimeout(1000)
    //       returnValue = false
    //       trigger = false
    //       // return 해당 오류에대한 리턴 작성
    //     }
    //   } else {
    //     returnValue = true
    //     trigger = false
    //   }
    // }
    // const returnData = {
    //   err: false,
    //   msg: {
    //     success: returnValue,
    //     text: '',
    //   },
    // }
    // return returnData