const { TempUser, Mail } = require('../mongoose/model')

const userLog = async (req, res) => {
  console.log('로그 기록 진입함')
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
    const existingUser = await TempUser.findOne({ userIp })
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
