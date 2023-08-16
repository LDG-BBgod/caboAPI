// let messageQueue = [] // 메시지 큐
// let isProcessing = false // 현재 처리 중인지 여부를 나타내는 변수

// parentPort.on('message', async (message) => {
//   messageQueue.push(message) // 메시지를 큐에 추가

//   if (isProcessing) {
//     if (message.type === 'exit') {
//       messageQueue = []
//       await puppeteerManager.releaseInstance(message.userIP)
//       isProcessing = false
//     } else if (message.type === 'pageInit') {
//       messageQueue = []
//       await puppeteerManager.releaseInstance(message.userIP)
//       await pageInit(message.userIP)
//       isProcessing = false
//     }
//     return
//   }

//   isProcessing = true
//   while (messageQueue.length > 0) {
//     const currentMessage = messageQueue.shift()
//     const { type, userIP, data } = currentMessage
//     try {
//       console.log(userIP, type, '처리시작')
//       switch (type) {
//         case 'pageInit':
//           messageQueue = []
//           await puppeteerManager.releaseInstance(userIP)
//           await pageInit(userIP)
//           break
//         case 'phoneSubmit':
//           await phoneSubmit(userIP, data)
//           break
//         case 'authCheck':
//           await phoneSubmit(userIP, data)
//           break
//         case 'test':
//           await test(userIP)
//           break
//         case 'check':
//           await puppeteerManager.checkInstance()
//           break
//         case 'exit':
//           messageQueue = []
//           await puppeteerManager.releaseInstance(userIP)
//           break
//         default:
//           console.log('워커 케이스 에러')
//           break
//       }
//     } catch (err) {
//       parentPort.postMessage(false)
//       return
//     }

//     isProcessing = false // 처리 완료
//     console.log(userIP, type, '처리완료')
//   }

//   parentPort.postMessage(true)
// })