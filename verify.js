function isValidDeployJsonStructure(str) {
  try {
    const infoObj = JSON.parse(str)
    const expectedKeys = new Set(['p', 'op', 'tick', 'max', 'lim'])
    const keys = Object.keys(infoObj)
    const tmpFlag =
      keys.length === expectedKeys.size &&
      keys.every((key) => expectedKeys.has(key))

    const valVflag =
      infoObj.p === `drc-20` &&
      typeof infoObj.max === `string` &&
      typeof infoObj.lim === `string` &&
      infoObj.tick.toLowerCase() === 'dogi'

    const lengthVflag =
      infoObj.tick &&
      infoObj.tick.length >= 4 &&
      infoObj.tick.length <= 6 &&
      infoObj.max.length < 19 &&
      infoObj.lim.length < 19

    return tmpFlag && valVflag && lengthVflag
  } catch (e) {
    return false
  }
}

function isValidJsonStructure(str) {
  try {
    const infoObj = JSON.parse(str)
    const expectedKeys = new Set(['p', 'op', 'tick', 'amt'])
    const keys = Object.keys(infoObj)
    const tmpFlag =
      keys.length === expectedKeys.size &&
      keys.every((key) => expectedKeys.has(key))
    const valVflag =
      infoObj.p === `drc-20` &&
      typeof infoObj.amt === `string` &&
      infoObj.tick.toLowerCase() === 'dogi'

    const lengthVflag =
      infoObj.tick &&
      infoObj.tick.length >= 4 &&
      infoObj.tick.length <= 6 &&
      infoObj.amt.length < 19

    return tmpFlag && valVflag && lengthVflag
  } catch (e) {
    return false
  }
}

module.exports = {
  isValidDeployJsonStructure,
  isValidJsonStructure,
}
