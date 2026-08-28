const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'quickorder_user',
  password: process.env.DB_PASSWORD || 'quickorder_pass',
  database: process.env.DB_NAME || 'quickorder_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function waitForDb(retries = 15, delayMs = 3000) {
  for (let i = 1; i <= retries; i++) {
    try {
      const conn = await pool.getConnection();
      conn.release();
      console.log('Conexión a la base de datos establecida.');
      return;
    } catch (err) {
      console.log(`Esperando a la base de datos... intento ${i}/${retries}`);
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  throw new Error('No se pudo conectar a la base de datos tras varios intentos.');
}

module.exports = { pool, waitForDb };
