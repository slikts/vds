const moment = require('moment')

const makeGet = name => date => require(`./data/${name}.json`)[date]
const getVd = makeGet('vd')
const getVdExt = makeGet('vd-ext')
const get = date => getVd(date).concat(getVdExt(date))
const today = moment().format('DD-MM')
const format = arr => arr.join(', ')
const { log } = console
const logDate = fn => console.log(format(fn(today)))

log(moment().locale('lv').format('Do MMMM'))
logDate(getVd)
logDate(getVdExt)
