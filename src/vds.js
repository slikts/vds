const moment = require('moment')
const { Map } = require('immutable')
const Fuse = require('fuse.js')
const data = require('./data')
const debug = require('debug')('vds')

const formatNames = names => `**${names.join(', ')}**`
const formatNamesAlt = names => `${names.join(', ')}`
const localeFormatDate = date => date.locale('lv').format('Do MMMM')
const dateFromKey = isoMonDay => moment(`0000-${isoMonDay}`)
const getArg = (args = process.argv) => (args.includes('--') ? args.slice(args.lastIndexOf('--') + 1).join(' ') : null)

const getVds = (date) => {
  const key = date.format('MM-DD')
  return {
    vd: data.vd.get(key),
    ext: data.ext.get(key),
  }
}

const renderDate = (dateSource = new Date()) => {
  const date = moment(dateSource)
  const vds = getVds(date)
  return [
    `🎉 ${localeFormatDate(date)}:  ${formatNames(vds.vd)}`,
    `🤓 ${formatNamesAlt(vds.ext)}`,
  ]
}

const searchNames = (text) => {
  const f = new Fuse(data.all(), {
    keys: ['name'],
    threshold: 0.2,
  })
  const collect = (results, { name, dateKey }) =>
    results.set(dateKey, (results.get(dateKey) || []).concat(name))
  return f.search(text)
  .reduce(collect, new Map())
}

const renderSearch = results =>
  results.map((names, key) => {
    const date = localeFormatDate(dateFromKey(key))
    return `${date}: ${formatNames(names)}`
  }).toArray()

const vds = (arg = getArg(process.argv)) => {
  debug('%s', arg)
  if (!arg) {
    return renderDate()
  }
  const dateArg = new Date(arg).toJSON()
  if (dateArg) {
    return renderDate(dateArg)
  }
  const results = searchNames(arg)
  if (results.size) {
    return renderSearch(results)
  }
  return ['?¿?¿?']
}

module.exports = vds
