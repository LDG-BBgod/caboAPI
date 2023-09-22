// @ts-check
/* eslint-disable no-console */

const express = require('express')
const crypto = require('crypto')

const { User } = require('../apis')
const { sendSENSLDJ } = require('../sens/sendLDJ')

const router = express.Router()

async function waitTime(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

router.post('/create', User.userCreate)
router.post('/update', User.userUpdate)
router.post('/updateCustomer', User.userUpdateCustomer)

router.post('/pid', (req, res) => {
  function encrypt(text) {
    const cipher = crypto.createCipher('aes-256-cbc', 'encryption-key')
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
  }
  let resString
  try {
    const originalString = req.body.name + req.body.phone
    const encryptedString = encrypt(originalString)
    const dtype = req.body.type === '6' ? 'sistype' : 'eletype'
    resString = `https://www.smartcabo.co.kr/mo?dtype=${dtype}&pid=${encryptedString}`
  } catch (err) {
    resString = `pid생성에러`
  }

  res.send(resString)
})

router.post('/pidsend', async (req, res) => {
  console.log(req.body)
  const { phone, pid } = req.body
  const content1 = `안녕하세요 카보입니다.
사장님께서 앱을 사용하실 수 있도록 개인아이디가 포함되어있는 링크를 보내드립니다. 
  
${pid}
비밀번호 : 4989
  
11개보험사중 6개의 보험사가 제휴 보험사이며, 제휴 보험사로 고객분이 가입시 딜러님께 6~7% 광고수수료가 지급됩니다.
제휴포험사(보험료 파란색표시):
(KB, DB, 현대, 악사, 흥국, 한화)
  
기타 상담 문의시 대표상담번호로 전화주셔요
010-7770-2696
주 7일 10시~22시
  
책임보험 문의도 대표상담번호로 가능합니다`
  const data1 = {
    phone,
    pid,
    content: content1,
    type: 'LMS',
  }
  const content2 = `앱사용이 번거로우시면 전화로도 이용가능합니다. 주말, 밤, 상관없이 단기 책임보험도 문의가능하니 편하게 연락주세요.`
  const data2 = {
    phone,
    pid,
    content: content2,
    type: 'LMS',
  }
  sendSENSLDJ(data1)
  await waitTime(2000)
  sendSENSLDJ(data2)
  res.send('')
})

module.exports = router
