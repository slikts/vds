const moment = require('moment')
const test = require('tape')
const { main, getVds, searchNames } = require('../src/vds')

test('main empty arg', (t) => {
  const res = main()
  t.equal(res.length, 2)
  t.end()
})

test('main date param', (t) => {
  const res = main('10-12')
  t.equal(res.length, 2)
  t.end()
})

test('main name search', (t) => {
  const res = main('Barbara')
  t.equal(res.length, 2)
  t.ok(res[0].includes('Barbara'))
  t.end()
})

test('getVds', (t) => {
  const vds = getVds(moment())
  t.equal(String(Object.keys(vds)), String(['vd', 'ext']))
  t.end()
})

test('searchNames', (t) => {
  const name = 'Barbara'
  const results = searchNames(name)
  t.ok(results.get('12-04').includes(name))
  t.end()
})

