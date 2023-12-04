// To access .env variables using Dotenv
import dotenv from 'dotenv';
dotenv.config();
// To connect to ElephantSQL using Express
import express from 'express';
// Create new pool connection for ElephantSQL requests
import pool from '../database/db-config.js';
// Initialize express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Sends SQL query to the ElephantSQL database
app.post('/api/register', async (req, res) => {
  // console.log(req.body); // Used to verify information being sent to db
  try { // Set JSON data into individual variables
    const { username, email, password } = req.body;
    // Create new user and return all columns to verify data was inserted
    const queryText = 'INSERT INTO Users(username, email, password) VALUES($1, $2, $3) RETURNING *';
    const queryValues = [username, email, password];
    const dbResponse = await pool.query(queryText, queryValues);
    // Send success status code with the response from the database server
    res.status(201).json({ message: 'Registration successful', userId: dbResponse.rows[0] });
  }
  catch (error) {
    console.error('Error in registration', error.message);
    if (!res.headersSent) {
      return res.status(500).send('Server error during registration');
    }
  }
});
app.get('api/leaderboard', async (req, res) => {
  try {
    const queryText = 'SELECT username, score FROM Users ORDER BY score DESC LIMIT 5';
    const dbResponse = await pool.query(queryText);
    res.status(201).json({ message: `Here's the top scores!`, scores: dbResponse.rows[0] });

    
  } catch (error) {
    console.error('Error in registration', error.message);
    
  }
})

// Start the express server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
