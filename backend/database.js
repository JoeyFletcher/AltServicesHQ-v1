const { Pool } = require('pg');

const pool = new Pool({
  user: 'JosephFletcher',  // Replace with your superuser name
  host: 'localhost',
  database: 'AltServicesHQ',
  password: 'Frank92697!',  // Replace with your superuser password
  port: 5432,  // Default PostgreSQL port. Change if different.
});

module.exports = pool;
