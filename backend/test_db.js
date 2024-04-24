// test_db.js
const pool = require('./database');

pool.query('SELECT NOW()', (err, res) => {
  if (err) throw err;
  console.log(res.rows); // This should log the current date and time
  pool.end();  // closes the database connection
});