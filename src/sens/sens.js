const crypto = require('crypto')
const axios = require('axios')

function getSigningKey(ts) {
  const timestamp = ts
  const AccessKey = 'Lyf4UlLYnAqvptuxG9Oq' //변경예정
  const SecretKey = 'O8DxN19g9zaRZ335Wgx5FCzQfXPIbZfkLR5dng4C' //변경예정

  const method = 'POST'
  const uri = '/sms/v2/services/ncp:sms:kr:289661491399:cabo/messages'

  const message = `${method} ${uri}\n${timestamp}\n${AccessKey}`
  const signingKey = crypto
    .createHmac('sha256', SecretKey)
    .update(message)
    .digest('base64')
  return signingKey
}

async function sendSENS(data) {
  const timestamp = Date.now().toString()
  const signingKey = getSigningKey(timestamp)

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'x-ncp-apigw-timestamp': timestamp,
    'x-ncp-iam-access-key': 'Lyf4UlLYnAqvptuxG9Oq',
    'x-ncp-apigw-signature-v2': signingKey,
  }

  const body = {
    type: 'LMS',
    contentType: 'COMM',
    countryCode: '82',
    from: '01028168229',
    content: data.content,
    messages: [
      {
        to: data.phone,
      },
    ],
  }

  try {
    const response = await axios.post(
      'https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:289661491399:cabo/messages',
      body,
      { headers }
    )
  } catch (error) {
    console.log('요기에러~')
    console.error(error)
  }
}

module.exports = {
  sendSENS,
}
