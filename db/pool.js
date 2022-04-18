const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fiuni_scheduler',
  password: 'password',
  port: 5432,
})
module.exports = pool;