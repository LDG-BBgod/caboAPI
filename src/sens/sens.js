const crypto = require('crypto')
const axios = require('axios')

function getSigningKey(ts) {
  const timestamp = ts
  const AccessKey = process.env.SENS_ACCESS_KEY //변경예정
  const SecretKey = process.env.SENS_SECRET_KEY //변경예정

  const method = 'POST'
  const uri = process.env.SENS_URI

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
    'x-ncp-iam-access-key': process.env.SENS_ACCESS_KEY,
    'x-ncp-apigw-signature-v2': signingKey,
  }

  const body = {
    type: 'LMS',
    contentType: 'COMM',
    countryCode: '82',
    from: process.env.COMPANY_PHONE,
    content: data.content,
    messages: [
      {
        to: data.phone,
      },
    ],
  }

  try {
    const response = await axios.post(
      `https://sens.apigw.ntruss.com${process.env.SENS_URI}`,
      body,
      { headers }
    )
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  sendSENS,
}
