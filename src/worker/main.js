const { Worker } = require('worker_threads')
const path = require('path')

class WorkerManager {
  constructor() {
    this.workers = new Map()
    this.workerTimeout = 20 * 60000 //생명주기 20분
    // console.log('워커 매니저가 생성되었습니다.')
  }

  async createWorker(userId) {
    const worker = new Worker(__dirname + '/worker.js')
    console.log(userId, '워커가 생성되었습니다.')

    return worker
  }

  async getWorker(userId) {
    if (this.workers.has(userId)) {
      const worker = this.workers.get(userId)
      this.resetWorkerTimeout(worker)
      return worker
    } else {
      const newWorker = await this.createWorker(userId)
      this.workers.set(userId, newWorker)
      this.resetWorkerTimeout(newWorker)
      return newWorker
    }
  }

  async removeWorker(userId) {
    const worker = this.workers.get(userId)
    if (worker) {
      worker.once('message', async () => {
        worker.terminate()
        this.workers.delete(userId)
        console.log(userId, '워커종료')
      })
      worker.postMessage({ type: 'exit', userIP: userId, data: {} })
    } else {
      console.log(userId, '이미 종료된 워커')
    }
  }

  async removeWorkerByInstance(worker) {
    this.workers.forEach((w, userId) => {
      if (w === worker) {
        worker.postMessage({ type: 'exit', userIP: userId, data: {} })
        worker.once('message', async () => {
          worker.terminate()
          this.workers.delete(userId)
          console.log(userId, '워커종료')
        })
      }
    })
  }

  resetWorkerTimeout(worker) {
    if (worker.timeout) {
      clearTimeout(worker.timeout)
    }
    worker.timeout = setTimeout(() => {
      this.removeWorkerByInstance(worker)
    }, this.workerTimeout)
  }

  async checkWorker() {
    console.log(`워커수 : ${this.workers.size}`)
  }
}

const workerManager = new WorkerManager()

module.exports = {
  workerManager,
}
