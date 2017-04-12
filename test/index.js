const test = require('tape')
const vds = require('../dist/vds')

test('empty arg', (t) => {
  const res = vds()
  t.equal(res.length, 2)
  t.end()
})

test('date param', (t) => {
  const res = vds('10-12')
  t.equal(res.length, 2)
  t.end()
})

test('name search', (t) => {
  const res = vds('Barbara')
  t.equal(res.length, 2)
  t.ok(res[0].includes('Barbara'))
  t.end()
})
