const moment = require('moment')
const { Map, List } = require('immutable')
const Fuse = require('fuse.js')

const { log } = console
const formatNames = arr => `**${arr.join(', ')}**`
const formatNamesAlt = arr => `${arr.join(', ')}`
const localeFormatDate = date => date.locale('lv').format('Do MMMM')
const dateFromKey = isoMonDay => moment(`0000-${isoMonDay}`)
const getArg = (args = process.argv) => args.includes('--') ? args.slice(args.lastIndexOf('--') + 1).join(' ') : null

const data = (() => {
  const getItem = (name) => new Map(require(`../data/${name}.json`))
  const vd = getItem('vd')
  const ext = getItem('vd-ext')
  return {
    vd,
    ext,
    all() {
      return vd
      .map((names, dateKey) => names.concat(ext.get(dateKey)))
      .map((names, dateKey) => new List(names.map(name => ({ name, dateKey }))))
      .toList()
      .flatten()
      .toArray()
    }
  }
})()

const getVds = date => {
  const key = date.format('MM-DD')
  return {
    vd: data.vd.get(key),
    ext: data.ext.get(key),
  }
}

const renderDate = (dateSource = new Date()) => {
  const date = moment(dateSource)
  const vds = getVds(date)
  log(`🎉 ${localeFormatDate(date)}:  ${formatNames(vds.vd)}`)
  log(`🤓 ${formatNamesAlt(vds.ext)}`)
}

const searchNames = text => {
  const f = new Fuse(data.all(), {
    keys: ['name'],
    threshold: 0.2,
  })
  const collect = (results, {name, dateKey}) => results.set(dateKey, (results.get(dateKey) || []).concat(name))
  return f.search(text)
  .reduce(collect, new Map())
}

const renderSearch = results => {
  results.forEach((names, key) => {
    const date = localeFormatDate(dateFromKey(key))
    log(`${date}: ${formatNames(names)}`)
  })
}

const run = (arg = getArg(process.argv)) => {
  const dateArg = new Date(arg).toJSON()
  if (arg) {
    if (dateArg) {
      renderDate(dateArg)
      return
    }
    const results = searchNames(arg)
    if (results.size) {
      renderSearch(results)
      return
    }
    log('?¿?¿?')
    return
  }
  renderDate()
}

module.exports = run
