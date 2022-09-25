const { Pool } = require('pg');
var fs = require('fs');
var pool;
module.exports = {
  getPool: function () {
    if (pool) return pool;
    pool = new Pool({
      max: 20,
      ssl :{
        ca: fs.readFileSync('./cert/root.crt')
      },
      options: '--cluster='+process.env.PGCLUSTER,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      timezone: 'utc'
    })
    return pool;
  }
};

