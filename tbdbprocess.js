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
  host: host,
  user: user,
  password: password,
  database: database,
})

const query = util.promisify(connection.query).bind(connection)

const insertRecord = async (data) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let insertQuery = `INSERT INTO tbl_drc_info (tick, owener_address, deploy_time, max, lim) 
      VALUES (?, ?, ?, ?, ?)`
      return await query(insertQuery, data)
    } catch (error) {
      logger.error(`insertRecord Error: ${error} data:${JSON.stringify(data)}`)
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const insertBalanceRecord = async (data) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let insertQuery = `INSERT INTO tbl_drc_balance (address,tick, balance) 
      VALUES (?, ?, ?)`

      return await query(insertQuery, data)
    } catch (error) {
      logger.error(
        `insertBalanceRecord Error: ${error}  data:${JSON.stringify(data)}`,
      )
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

const updateRecord = async (mintVal, id) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let updateQuery = `UPDATE tbl_drc_info SET mint_val = ? WHERE id = ?`

      return await query(updateQuery, [mintVal, id])
    } catch (error) {
      logger.error(`updateRecord Error: ${error},id:${id},mintVal:${mintVal}`)
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const deleteRecord = async (id) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let deleteQuery = `DELETE FROM tbl_drc_info WHERE id = ?`

      return await query(deleteQuery, [id])
    } catch (error) {
      logger.error(`deleteRecord Error: ${error},id:${id}`)
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const selectBalanceRecord = async (tick, addresses) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let selectQuery = `SELECT * FROM tbl_drc_balance WHERE tick = ? and address =?`

      return await query(selectQuery, [tick, addresses])
    } catch (error) {
      logger.error(
        `selectBalanceRecord Error: ${error},addresses:${addresses},tick:${tick}`,
      )
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const updateBalanceRecord = async (balance, id) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let updateQuery = `UPDATE tbl_drc_balance SET balance = ? WHERE id = ?`

      return await query(updateQuery, [balance, id])
    } catch (error) {
      logger.error(
        `updateBalanceRecord Error: ${error},id:${id} ,balance:${balance}`,
      )
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const updateDrcFlagRecord = async (id) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let updateQuery = `UPDATE tbl_drc_info SET mint_over = 1 WHERE id = ?`

      return await query(updateQuery, [id])
    } catch (error) {
      logger.error(`updateDrcFlagRecord Error: ${error},id:${id}`)
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const insertTransferRecord = async (data) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let insertQuery = `INSERT INTO tbl_transfer_info (address, amt, txnid,tick) 
      VALUES (?, ?, ?, ?)`

      return await query(insertQuery, data)
    } catch (error) {
      logger.error(
        `insertTransferRecord Error: ${error} data:${JSON.stringify(data)}`,
      )
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const selectTransferRecord = async (address, tick) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let selectQuery = `SELECT * FROM tbl_transfer_info WHERE address = ? and tick=?`

      return await query(selectQuery, [address, tick])
    } catch (error) {
      logger.error(
        `selectTransferRecord Error: ${error},address:${address},tick:${tick}`,
      )
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const updateTransferFlag = async (flag, id) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let updateQuery = `UPDATE tbl_transfer_info SET flag = ? WHERE id = ?`

      return await query(updateQuery, [flag, id])
    } catch (error) {
      logger.error(`updateTransferFlag Error: ${error},id: ${id}`)
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const deleteTransferRecord = async (id) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let deleteQuery = `DELETE FROM tbl_transfer_info WHERE id = ?`

      return await query(deleteQuery, [id])
    } catch (error) {
      logger.error(`deleteTransferRecord Error: ${error},id:${id}`)
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const selectTransferRecordByTxnid = async (txnid) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let selectQuery = `SELECT * FROM tbl_transfer_info WHERE txnid = ?`

      return await query(selectQuery, [txnid])
    } catch (error) {
      logger.error(
        `selectTransferRecordByTxnid Error: ${error},txnid: ${txnid}`,
      )
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const selectSumByAddressAndTick = async (address, tick) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let selectQuery = `SELECT address, tick, SUM(amt) as total_amt FROM tbl_transfer_info WHERE address = ? AND tick = ?  and flag = 0 GROUP BY address, tick`
      return await query(selectQuery, [address, tick])
    } catch (error) {
      logger.error(
        `selectSumByAddressAndTick Error: ${error},address:${address},tick:${tick}`,
      )
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

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

const selectTxInfo = async (block) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let selectQuery = `SELECT * FROM tbl_tx_info WHERE flag=0 and block=? order by block,tx_index`

      return await query(selectQuery, [block])
    } catch (error) {
      logger.error(`selectTxInfo Error: ${error},block:${block}`)
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

const updateTxInfoFlag = async (id) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let updateQuery = `UPDATE tbl_tx_info SET flag = 1 WHERE id = ?`
      return await query(updateQuery, [id])
    } catch (error) {
      logger.error(`updateTxInfoFlag Error: ${error},id:${id}`)
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const updateCurrentBlock = async (block) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let updateQuery = `UPDATE tbl_current_block SET block= ? where id=1`
      return await query(updateQuery, [block])
    } catch (error) {
      logger.error(`updateCurrentBlock Error: ${error},block:${block}`)
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const insertTxTrsInfo = async (data) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let insertQuery = `INSERT INTO tbl_tx_transfer_info (sender,receiver,txid,tick,amt) 
      VALUES (?, ?, ?, ?, ?)`
      return await query(insertQuery, data)
    } catch (error) {
      logger.error(
        `insertTxTrsInfo Error: ${error},data:${JSON.stringify(data)}`,
      )
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

const updateIndexBlockInfoFlag = async (id) => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let updateQuery = `UPDATE tbl_block_index_info SET flag = 1 WHERE id = ?`
      return await query(updateQuery, [id])
    } catch (error) {
      logger.error(`updateIndexBlockInfoFlag Error: ${error},id: ${id}`)
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

const selectIndexBlockInfo = async () => {
  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      let selectQuery = `SELECT * FROM tbl_block_index_info WHERE flag=0 order by block LIMIT 10`

      return await query(selectQuery, [])
    } catch (error) {
      logger.error(`selectIndexBlockInfo Error: ${error}`)
      retries++
      if (retries >= MAX_RETRIES) {
        // 在达到最大重试次数后，抛出一个特定的错误
        throw new MaxRetriesReachedError('Max retries reached')
      }
    }
  }
}

module.exports = {
  insertRecord,
  selectRecord,
  updateRecord,
  deleteRecord,
  selectBalanceRecord,
  insertBalanceRecord,
  updateBalanceRecord,
  updateDrcFlagRecord,
  insertTransferRecord,
  selectTransferRecord,
  updateTransferFlag,
  deleteTransferRecord,
  selectTransferRecordByTxnid,
  query,
  selectSumByAddressAndTick,
  insertTxnRecord,
  selectTxInfo,
  updateTxInfoFlag,
  updateCurrentBlock,
  selectTxInfoById,
  insertTxTrsInfo,
  updateIndexBlockInfoFlag,
  insertIndexBlockInfo,
  selectIndexBlockInfo,
}
