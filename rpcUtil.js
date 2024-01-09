const axios = require('axios')
const logger = require('./logger')
const MaxRetriesReachedError = require('./MaxRetriesReachedError')
const configUtil = require('./configUtil')
const { Address, Script } = require('bitcore-lib-doge')

const rpcuser = configUtil.getConfigValue('rpcuser')
const rpcpassword = configUtil.getConfigValue('rpcpassword')
const rpcport = configUtil.getConfigValue('rpcport')
const url = configUtil.getConfigValue('rpcurl')

const MAX_RETRIES = configUtil.getConfigValue('MAX_RETRIES')

const client = axios.create({
  baseURL: `http://${rpcuser}:${rpcpassword}@${url}:${rpcport}`,
  headers: { 'Content-Type': 'application/json' },
})

const getBlock = async (blockhash) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      const res = await client.post('/', {
        jsonrpc: '1.0',
        id: 'curltest',
        method: 'getblock',
        params: [blockhash],
      })
      return res
    } catch (error) {
      logger.error(`getBlock Error: ${error} blockhash: ${blockhash} `)
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const getBlockhash = async (currentBlock) => {
  const res = await client.post('/', {
    jsonrpc: '1.0',
    id: 'curltest',
    method: 'getblockhash',
    params: [currentBlock],
  })
  return res
}

const getRawTransaction = async (txid) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      const res = await client.post('/', {
        jsonrpc: '1.0',
        id: 'curltest',
        method: 'getrawtransaction',
        params: [txid, 1],
      })
      return res
    } catch (error) {
      logger.error(`getRawTransaction Error: ${error}  txid: ${txid}`)
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

async function getAddressByTxid(txid) {
  while (true) {
    try {
      const rawTransaction = await getRawTransaction(txid)

      if (rawTransaction.data.result.vout.length > 0) {
        return rawTransaction.data.result.vout[
          rawTransaction.data.result.vout.length - 1
        ].scriptPubKey.addresses
      } else if (rawTransaction.data.result.vout.length === 0) {
        return rawTransaction.data.result.vout[0].scriptPubKey.addresses
      } else {
        return null
      }
    } catch (error) {
      logger.error(`Error fetch tx ${txid} getAddressByTxid address: ${error}`)
      if (error instanceof MaxRetriesReachedError) {
        throw error
      } else {
        await new Promise((resolve) => setTimeout(resolve, 3000))
      }
    }
  }
}

function decodemintaddress(rawTransaction) {
  let mintfeeaddress = null
  try {
    mintfeeaddress = Address.fromScript(
      Script.fromHex(rawTransaction.data.result.vin[1].scriptSig.hex),
    ).toString()
  } catch (error) { }
  return mintfeeaddress
}

async function getmintAddress(txid) {
  while (true) {
    try {
      const rawTransaction = await getRawTransaction(txid)
      const mintfeeaddress = decodemintaddress(rawTransaction)
      return mintfeeaddress
    } catch (error) {
      logger.error(`Error fetch tx ${txid} mint address: ${error}`)
      if (error instanceof MaxRetriesReachedError) {
        throw error
      } else {
        await new Promise((resolve) => setTimeout(resolve, 3000))
      }
    }
  }
}

module.exports = {
  getBlock,
  getBlockhash,
  getRawTransaction,
  getAddressByTxid,
  getmintAddress,
  decodemintaddress
}
