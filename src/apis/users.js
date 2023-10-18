const { join } = require('path')
const { User } = require('../mongoose/model')
const crypto = require('crypto')

const userCreate = async (req, res) => {
  function decrypt(encryptedText) {
    const decipher = crypto.createDecipher('aes-256-cbc', 'encryption-key')
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  }
  const { pid } = req.body
  const existingUser = await User.findOne({ pid })
  try {
    if (!existingUser && pid !== 'undef') {
      const decryptPID = decrypt(pid)
      const match = decryptPID.match(/^([가-힣a-zA-Z]+)(\d+)$/)
      const name = match[1]
      const phone = match[2]
      const newUser = await User({
        pid,
        name,
        phone,
      })
      await newUser.save()
    }
  } catch (err) {
    console.log('pid없음')
  }
  res.send('')
}

const userUpdate = async (req, res) => {
  const { pid, data, type } = req.body
  const user = await User.findOne({ pid })
  if (user) {
    const company = {
      INSU0: '롯데',
      INSU1: '메리츠',
      INSU2: 'DB',
      INSU3: '삼성',
      INSU4: '하나',
      INSU5: 'KB',
      INSU6: '현대',
      INSU7: '흥국',
      INSU8: '한화',
      INSU9: 'MG',
      INSU10: '악사',
    }
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')
    const hours = String(currentDate.getHours()).padStart(2, '0')
    const minutes = String(currentDate.getMinutes()).padStart(2, '0')
    const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`
    try {
      switch (type) {
        case 'log':
          user.log += `${formattedDate} ${data}\n`
          user.isLooked = false
          await user.save()
          break
        case 'customer':
          const prevList = data.list
          const transList = []
          prevList.forEach((item) => {
            const transformedItem = { ...item, name: company[item.name] }
            transList.push(transformedItem)
          })
          const jsonTransList = JSON.stringify(transList, null, 2)
          const formattedList = `[${jsonTransList.replace(/\n/g, '\n ')}]`

          user.customer.push({
            register: formattedDate,
            csname: data.csname,
            phoneAuth: data.phoneAuth.slice(-4),
            fsn: data.fsn,
            bsn: data.bsn.slice(0, 1),
            carValue1: data.carValue1,
            carValue2: data.carValue2,
            carValue3: data.carValue3,
            carValue4: data.carValue4,
            carValue5: data.carValue5,
            range: data.range,
            minBirth: data.minBirth,
            secondBirth: data.secondBirth,
            level: data.level,
            option1: data.option1,
            option2: data.option2,
            option3: data.option3,
            option4: data.option4,
            option5: data.option5,
            option6: data.option6,
            option7: data.option7,
            option8: data.option8,
            list: formattedList,
          })
          await user.save()
          break
        case 'sendContent':
          const csname = data.csname
          const phoneSend = data.phoneSend.slice(-4)
          const insuType = data.insuType ? 'CM' : 'TM'
          const list = data.insuList.map((item) => company[item] || item)
          const insuList = JSON.stringify(list)
          const targetCustomer = user.customer.find(
            (customer) => customer.csname === csname
          )
          if (targetCustomer) {
            targetCustomer.sendContent.push({
              phoneSend,
              insuType,
              insuList,
            })
            await user.save()
          }
          break
        default:
          break
      }
    } catch (err) {
      console.log(err)
    }
  }
  res.send('')
}

const userUpdateCustomer = async (req, res) => {
  const { pid, log } = req.body
  const user = await User.findOne({ pid })

  try {
    if (user) {
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const month = String(currentDate.getMonth() + 1).padStart(2, '0')
      const day = String(currentDate.getDate()).padStart(2, '0')
      const hours = String(currentDate.getHours()).padStart(2, '0')
      const minutes = String(currentDate.getMinutes()).padStart(2, '0')
      const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`

      user.log += `${formattedDate} ${log}\n`
      await user.save()
    }
  } catch (err) {
    console.log('')
  }
  res.send('')
}
module.exports = {
  userCreate,
  userUpdate,
  userUpdateCustomer,
}
