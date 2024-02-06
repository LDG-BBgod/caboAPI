// @ts-check
/* eslint-disable no-console */
const express = require('express')
const path = require('path')
const { WebSocketServer } = require('ws')

const { sendSENS } = require('../sens/sens')
const { insuData } = require('../insuData')
const { workerManager } = require('../worker/main')

async function waitTime(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

const wsPORT = 5001
const wss = new WebSocketServer({ port: wsPORT })

wss.on('connection', (ws, req) => {
  const wsId = req.url.split('=')[1]
  console.log(wsId, '웹소켓 연결')

  ws.on('close', async () => {
    console.log(wsId, '웹소켓 연결해제 및 shutdown 진입')
    const userIP = wsId
    try {
      await workerManager.removeWorker(userIP)
    } catch (err) {
      console.error(err)
    }
  })
})

const router = express.Router()

router.post('/pageInit', async (req, res) => {
  const userIP = req.body.pid

  try {
    const worker = await workerManager.getWorker(userIP)
    worker.once('message', async (result) => {
      res.send(result)
    })
    const data = {
      type: 'pageInit',
      userIP,
    }
    worker.postMessage(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('에러 발생')
  }
})

// let isWorkerRunning = false
// let queuedResponse = null
// router.post('/pageInit', async (req, res) => {
//   const userIP = req.body.pid
//   console.log('유저아이피',userIP)
//   if (isWorkerRunning) {
//     queuedResponse = res
//     return
//   }

//   isWorkerRunning = true

//   try {
//     const worker = await workerManager.getWorker(userIP)
//     worker.once('message', async (result) => {
//       isWorkerRunning = false
//       res.send(result)

//       if (queuedResponse) {
//         queuedResponse.send(result)
//         queuedResponse = null
//       }
//     })
//     const data = {
//       type: 'pageInit',
//       userIP,
//     }
//     worker.postMessage(data)
//   } catch (err) {
//     console.error(err)
//     isWorkerRunning = false
//     res.status(500).send('에러 발생')
//   }
// })

router.post('/phoneSubmit', async (req, res) => {
  const userIP = req.body.pid
  try {
    const worker = await workerManager.getWorker(userIP)
    worker.once('message', async (result) => {
      res.send(result)
    })
    const data = {
      type: 'phoneSubmit',
      userIP,
      data: req.body,
    }
    worker.postMessage(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('에러 발생')
  }
})

router.post('/reSendAuth', async (req, res) => {
  const userIP = req.body.pid
  try {
    const worker = await workerManager.getWorker(userIP)
    worker.once('message', async (result) => {
      res.send(result)
    })
    const data = {
      type: 'reSendAuth',
      userIP,
      data: req.body,
    }
    worker.postMessage(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('에러 발생')
  }
})

router.post('/authCheck', async (req, res) => {
  const userIP = req.body.pid
  try {
    const worker = await workerManager.getWorker(userIP)
    worker.once('message', async (result) => {
      res.send(result)
    })
    const data = {
      type: 'authCheck',
      userIP,
      data: req.body,
    }
    worker.postMessage(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('에러 발생')
  }
})

router.post('/selectCar', async (req, res) => {
  const userIP = req.body.pid
  try {
    const worker = await workerManager.getWorker(userIP)
    worker.once('message', async (result) => {
      res.send(result)
    })
    const data = {
      type: 'selectCar',
      userIP,
      data: req.body,
    }
    worker.postMessage(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('에러 발생')
  }
})

router.post('/existCar', async (req, res) => {
  const userIP = req.body.pid
  try {
    const worker = await workerManager.getWorker(userIP)
    worker.once('message', async (result) => {
      res.send(result)
    })
    const data = {
      type: 'existCar',
      userIP,
      data: req.body,
    }
    worker.postMessage(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('에러 발생')
  }
})

router.post('/existGetResult', async (req, res) => {
  const userIP = req.body.pid
  try {
    const worker = await workerManager.getWorker(userIP)
    worker.once('message', async (result) => {
      res.send(result)
    })
    const data = {
      type: 'existGetResult',
      userIP,
      data: req.body,
    }
    worker.postMessage(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('에러 발생')
  }
})

router.post('/step4Back', async (req, res) => {
  const userIP = req.body.pid
  try {
    const worker = await workerManager.getWorker(userIP)
    worker.once('message', async (result) => {
      res.send(result)
    })
    const data = {
      type: 'step4Back',
      userIP,
      data: req.body,
    }
    worker.postMessage(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('에러 발생')
  }
})

router.post('/getResult', async (req, res) => {
  const userIP = req.body.pid
  try {
    const worker = await workerManager.getWorker(userIP)
    worker.once('message', async (result) => {
      res.send(result)
    })
    const data = {
      type: 'getResult',
      userIP,
      data: req.body,
    }
    worker.postMessage(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('에러 발생')
  }
})

router.post('/shutdown', async (req, res) => {
  const userIP = req.body.pid
  console.log(userIP, 'shutdown 진입')
  try {
    await workerManager.removeWorker(userIP)
  } catch (err) {
    console.error(err)
    res.status(500).send('에러 발생')
  }
})

router.post('/sendSMS', async (req, res) => {
  try {
    const { phone, resData, selectedList, isOnline } = req.body

    const indexs = selectedList.map((item) => {
      return parseInt(item.match(/\d+/)[0], 10)
    })
    const listsIndex = indexs.map((index) => {
      return resData[index]
    })
    const ids = listsIndex.map((item) => item.name)
    const listArr = insuData.filter((item) => ids.includes(item.id))
    if (isOnline) {
      // 가입링크전송

      for (let i = 0; i < listArr.length; i += 1) {
        if (listArr[i].pc === listArr[i].mobile) {
          // pc & mobile 가입링크 같은경우 문자발송
          const sendData = {
            phone,
            content: `${listArr[i].name} 가입링크\n${listArr[i].pc}`,
          }
          await sendSENS(sendData)
          await waitTime(2000)
        } else {
          // pc & mobile 가입링크 다른경우 문자발송
          const sendData1 = {
            phone,
            content: `${listArr[i].name} 컴퓨터 가입링크\n${listArr[i].pc}`,
          }
          await sendSENS(sendData1)
          await waitTime(2000)
          const sendData2 = {
            phone,
            content: `${listArr[i].name} 모바일 가입링크\n${listArr[i].mobile}`,
          }
          await sendSENS(sendData2)
          await waitTime(2000)
        }
      }
    } else {
      // 전화번호 전송
      for (let i = 0; i < listArr.length; i += 1) {
        const sendData = {
          phone,
          content: `${listArr[i].name} 가입전화번호\n${listArr[i].phone}`,
        }

        await sendSENS(sendData)
        await waitTime(2000)
      }
    }

    res.send('')
  } catch (err) {
    console.error(err)
    res.status(500).send('에러 발생')
  }
})

router.post('/sendLink', async (req, res) => {
  try {
    const { phone, resData, selectedList, isOnline, isMobile } = req.body

    const indexs = selectedList.map((item) => {
      return parseInt(item.match(/\d+/)[0], 10)
    })
    const listsIndex = indexs.map((index) => {
      return resData[index]
    })
    const ids = listsIndex.map((item) => item.name)
    const listArr = insuData.filter((item) => ids.includes(item.id))
    if (isOnline) {
      const directLink = isMobile ? listArr[0].mobile : listArr[0].pc
      res.send(directLink)
    } else {
      res.send(listArr[0].phone)
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('에러 발생')
  }
})

router.post('/test', async (req, res) => {
  const userIP = req.body.pid
  console.log(userIP, '비교요청 들어옴')
  try {
    const worker = await workerManager.getWorker(userIP)
    worker.once('message', async (result) => {
      res.send(result)
    })
    // 실제 데이터 인풋
    const data = {
      type: 'test',
      userIP,
      data: req.body,
    }
    worker.postMessage(data)
  } catch (err) {
    console.error(err)
    res.status(500).send('에러 발생')
  }
})

module.exports = router
