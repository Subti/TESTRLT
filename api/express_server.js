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
app.post('/api/leaderboard', async (req, res) => {
  try {
    const data  = req.body;
    const queryValues = data;


    const queryText = 'INSERT INTO Scores(score,user_id) VALUES($1,$2) RETURNING *';
    const dbResponse = await pool.query(queryText,queryValues);
    res.status(201).json({ message: `Here's the top scores!`, scores: dbResponse.rows[0] });

    
  } catch (error) {
    console.error('Error in Post Leaderboard', error.message);
    
  }
})
app.get('/api/leaderboard', async (req, res) => {
  try {
    const queryText = 'SELECT Users.username, Scores.score FROM Users Join Scores ON Users.id = Scores.user_id ORDER BY score DESC LIMIT 5';
    // const queryText ='SELECT * FROM Scores'
    const dbResponse = await pool.query(queryText);
    res.status(201).json({ message: `Here's the top scores!`, scores: dbResponse.rows });

    
  } catch (error) {
    console.error('Error in leaderboard', error.message);
    
  }
})

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Query to find the user by username
    const queryText = 'SELECT * FROM Users WHERE username = $1';
    const queryValues = [username];
    const dbResponse = await pool.query(queryText, queryValues);
    // If data is received and contains at least one key
    if (dbResponse.rows.length > 0) {
      const user = dbResponse.rows[0];
      
      // If password matches
      if (password === user.password) {
        res.status(200).json({ message: 'Login successful', userId: user.id});
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  }
  catch (error) {
    console.error('Error in login', error.message);
    if (!res.headersSent) {
      res.status(500).send('Server error during login');
    }
  }
});


// Start the express server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
