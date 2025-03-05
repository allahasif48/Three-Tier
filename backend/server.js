require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Create a connection to the MySQL database using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Endpoint to handle user input and store it in the database
app.post('/api', (req, res) => {
  const { userInput } = req.body;
  db.query('INSERT INTO user_inputs (input) VALUES (?)', [userInput], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: `You entered: ${userInput}` });
  });
});

// Endpoint to get all stored user inputs
app.get('/api', (req, res) => {
  db.query('SELECT * FROM user_inputs', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ inputs: results });
  });
});

// Start the backend server
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});

