const { Map, List } = require('immutable')
const { namedays, extNamedays } = require('vardadienas')

const formatExt = name => `_${name}_`
const vd = new Map(namedays)
const ext = new Map(extNamedays)
const all = () =>
  vd
  .map((names, dateKey) => names.concat((ext.get(dateKey) || []).map(formatExt)))
  .map((names, dateKey) => new List(names.map(name => ({ name, dateKey }))))
  .toList()
  .flatten()
  .toArray()
const data = { vd, ext, all }

module.exports = data
