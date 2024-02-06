const crypto = require('crypto')
const axios = require('axios')

function getSigningKey(ts) {
  const timestamp = ts
  const AccessKey = process.env.SENS_ACCESS_KEY_LDJ
  const SecretKey = process.env.SENS_SECRET_KEY_LDJ

  const method = 'POST'
  const uri = process.env.SENS_URI_LDJ

  const message = `${method} ${uri}\n${timestamp}\n${AccessKey}`
  const signingKey = crypto
    .createHmac('sha256', SecretKey)
    .update(message)
    .digest('base64')
  return signingKey
}

async function sendSENSLDJ(data) {
  const timestamp = Date.now().toString()
  const signingKey = getSigningKey(timestamp)

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'x-ncp-apigw-timestamp': timestamp,
    'x-ncp-iam-access-key': process.env.SENS_ACCESS_KE,
    'x-ncp-apigw-signature-v2': signingKey,
  }

  const body = {
    type: data.type,
    contentType: 'COMM',
    countryCode: '82',
    from: '01077702696',
    content: data.content,
    messages: [
      {
        to: data.phone,
      },
    ],
  }

  try {
    const response = await axios.post(
      `https://sens.apigw.ntruss.com${process.env.SENS_URI_LDJ}`,
      body,
      { headers }
    )
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  sendSENSLDJ,
}
