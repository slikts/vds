const vds = require('./src/vds')

const { log } = console

if (require.main === module) {
  log(vds().join('\n'))
}

module.exports = vds
