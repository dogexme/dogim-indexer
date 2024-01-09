const db = require('./tbdbstart')
const logger = require('./logger')
const workerpool = require('workerpool')
const rpcClient = require('./rpcUtil')
const MaxRetriesReachedError = require('./MaxRetriesReachedError')
const configUtil = require('./configUtil')

const pool = workerpool.pool('./dogeThread.js', {
  maxWorkers: 15,
})

async function getBlockTransactionsByHeight(blockhash, currentBlock) {
  if (blockhash) {
    try {
      const res = await rpcClient.getBlock(blockhash)

      if (res.data.result) {
        let promises = []
        let txArray = res.data.result.tx
        // 遍历交易数组
        for (let txid of txArray) {
          let info = await db.selectTxInfoById(txid)
          if (!info || info.length === 0) {
            promises.push(
              pool
                .exec('getTxInfo', [txid, currentBlock, txArray.indexOf(txid)])
                .catch((err) => {
                  logger.error(err)
                  logger.error(`getBlockTransactionsByHeight txid: ${txid}`)
                  if (err instanceof MaxRetriesReachedError) {
                    throw err
                  }
                }),
            )
          }
        }
        // 等待所有的Promise都完成
        await Promise.all(promises)
        //把处理完的block写入数据库
        await db.insertIndexBlockInfo(currentBlock)
      }
    } catch (err) {
      if (err instanceof MaxRetriesReachedError) {
        throw err
      } else if (!err instanceof TypeError) {
        logger.error(`Error: ${err}`)
        logger.error(`txid: ${txid}`)
      }
    }
  }
}

async function checkBlock() {
  let currentBlock = configUtil.getConfigValue('currentBlock')
  while (true) {
    try {
      const res = await rpcClient.getBlockhash(currentBlock)

      const delayHash = await rpcClient.getBlockhash(
        currentBlock + configUtil.getConfigValue('delayBlock'),
      )

      if (res.data && res.data.result && delayHash) {
        await getBlockTransactionsByHeight(res.data.result, currentBlock)
        currentBlock++
      } else {
        throw new Error(`Block #${currentBlock} not found.`)
      }
      let date = new Date()
      let time = date.toISOString() //返回一个 ISO 格式的字符串： YYYY-MM-DDTHH:mm:ss.sssZ
      let logObj = {
        time: time,
        blockNo: currentBlock,
      }
      logger.info(logObj)
      console.info(logObj)

      if (currentBlock === configUtil.getConfigValue('start_endBlock')) {
        process.exit()
      }
    } catch (err) {
      // 打印错误信息，并等待 10 秒
      logger.error(`Error: ${err.message}`)
      await new Promise((resolve) => setTimeout(resolve, 20000)) // Wait 10 seconds
    }
  }
}

checkBlock()
