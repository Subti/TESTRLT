// To access .env variables using Dotenv
import dotenv from 'dotenv';
dotenv.config();
// To connect to ElephantSQL using Express
import express from 'express';
// To pool database connection using Node-Postgres
import pkg from 'pg';
const { Pool } = pkg;

// Database connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Initialize express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Test SQL query, access via http://localhost:3000/api/data once express has run
app.get('/api/data', (req, res) => {
  pool.query('SELECT * FROM Users')
      .then(results => {
          console.log(results.rows); // Log the results to the server console
          res.status(200).json(results.rows);
      })
      .catch(error => {
          console.error('Error executing query', error.stack);
          res.status(500).send('Server Error');
      });
});


// Start the express server on port 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
