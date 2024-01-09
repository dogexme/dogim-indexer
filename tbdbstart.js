const mysql = require('mysql')
const util = require('util')
const logger = require('./logger') // 路径应根据实际情况进行调整
const MaxRetriesReachedError = require('./MaxRetriesReachedError')
const configUtil = require('./configUtil')

const MAX_RETRIES = configUtil.getConfigValue('MAX_RETRIES')

const host = configUtil.getConfigValue('data_host')
const user = configUtil.getConfigValue('data_user')
const password = configUtil.getConfigValue('data_password')
const database = configUtil.getConfigValue('database')

const connection = mysql.createConnection({
  connectionLimit: 10,
  host: host,
  user: user,
  password: password,
  database: database,
})

const query = util.promisify(connection.query).bind(connection)

const insertTxnRecord = async (data) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let insertQuery = `INSERT INTO tbl_tx_info (block,tx_index,txnid,content, address,txnid_pre,op) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`
      return await query(insertQuery, data)
    } catch (error) {
      logger.error(
        `insertTxnRecord Error: ${error} ,data:${JSON.stringify(data)}`,
      )
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const selectTxInfoById = async (txnid) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let selectQuery = `SELECT id FROM tbl_tx_info WHERE txnid=?`
      return await query(selectQuery, [txnid])
    } catch (error) {
      logger.error(`selectTxInfoById Error: ${error},txnid:${txnid}`)
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const insertIndexBlockInfo = async (block) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let insertQuery = `INSERT INTO tbl_block_index_info (block)  VALUES (?)`
      return await query(insertQuery, [block])
    } catch (error) {
      logger.error(`insertIndexBlockInfo Error: ${error},block: ${block}`)
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const selectRecord = async (tick) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let selectQuery = `SELECT * FROM tbl_drc_info WHERE tick = ?`

      return await query(selectQuery, [tick])
    } catch (error) {
      logger.error(`selectRecord Error: ${error},tick:${tick}`)
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

module.exports = {
  insertTxnRecord,
  selectTxInfoById,
  insertIndexBlockInfo,
  selectRecord
}
