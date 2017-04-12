const { main } = require('./vds')

const { log } = console

if (require.main === module) {
  log(main().join('\n'))
}

module.exports = main
