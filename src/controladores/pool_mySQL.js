import mysql from 'mysql2/promise';

// Crear un pool de conexiones en lugar de una sola conexión
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tp_nodejs',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function getConnection() {
  try {
    return await pool.getConnection();
  } catch (error) {
    console.error('Error getting connection from pool:', error);
    throw error;
  }
}

// Función para ejecutar queries directamente
async function query(sql, params) {
  try {
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
  finally {
    if (connection) connection.release(); // Liberar la conexión de vuelta al pool
  }
}

export { pool, getConnection, query };
export default pool; // Exportar el pool por defecto