const moment = require('moment')

const makeGet = name => date => require(`./data/${name}.json`)[date.format('DD-MM')]
const getVd = makeGet('vd')
const getVdExt = makeGet('vd-ext')
const get = date => getVd(date).concat(getVdExt(date))
const parseDate = text => new Date(text).toJSON()
const arg = process.argv[process.argv.length - 1]
const argDate = parseDate(arg)
const date = argDate ? moment(argDate) : moment()
const format = arr => arr.join(', ')
const { log } = console
const frmDate = date.locale('lv').format('Do MMMM')
const vds = format(getVd(date))
const vdsExt = format(getVdExt(date))

log(`🎉 ${frmDate}:  **${vds}**`)
log(`🤷️ ${vdsExt}`)
