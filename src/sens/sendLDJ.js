const crypto = require('crypto')
const axios = require('axios')

function getSigningKey(ts) {
  const timestamp = ts
  const AccessKey = '1gUeu71dUBQKfuKIh2fW'
  const SecretKey = 'LPH3SXDuS2WhHdSNZCBzjXcQOmvIkukGjH04inCe'

  const method = 'POST'
  const uri =
    '/sms/v2/services/ncp:sms:kr:274620864620:smartcabo_sendpidlink/messages'

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
    'x-ncp-iam-access-key': '1gUeu71dUBQKfuKIh2fW',
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
      'https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:274620864620:smartcabo_sendpidlink/messages',
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
