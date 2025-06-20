const { rollbackMigrations } = require('./db')

try {
  rollbackMigrations()
} catch (error) {
  console.log(error)
}
