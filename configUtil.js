const { readFileSync } = require('fs')

function getConfigValue(name) {
  const config = JSON.parse(readFileSync('./config.json'))
  return config[name]
}

module.exports = {
  getConfigValue,
}
