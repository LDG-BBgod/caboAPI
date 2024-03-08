const { TempUser, Mail } = require('../mongoose/model')

const userLog = async (req, res) => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  const hours = String(currentDate.getHours()).padStart(2, '0')
  const minutes = String(currentDate.getMinutes()).padStart(2, '0')
  const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`

  try {
    const userIp = req.ip
    const { log } = req.body
    console.log('아이피 일치 유저 찾기 시작 ip : ', userIp)
    const existingUser = await TempUser.findOne({ userIp })
    console.log('찾고 다음간계 진행')
    if (existingUser) {
      existingUser.log += `${formattedDate} ${log}\n`
      await existingUser.save()
    } else {
      const newUser = await TempUser({
        userIp,
        log: `${formattedDate} ${log}\n`,
      })
      await newUser.save()
    }
  } catch (err) {
    console.error('기록 중 에러 발생 : ', err)
  }
  res.send('')
}
const mail = async (req, res) => {
  try {
    const userIp = req.ip
    const { name, phone, email, question } = req.body
    const newMail = await Mail({
      userIp,
      name,
      phone,
      email,
      question,
    })
    await newMail.save()
  } catch (err) {
    console.error(err)
  }
  res.send('')
}

module.exports = {
  userLog,
  mail,
}
