const express = require('express');
const mysql = require('mysql');
const app = express();

// MySQL connection configuration using o2switch environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'dije1636_imad-coiffeur',
  password: process.env.DB_PASSWORD || 'password@password.password',
  database: process.env.DB_NAME || 'dije1636_loft-barbe-db',
  port: process.env.DB_PORT || 3306
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware to serve static files
app.use(express.static('public'));

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API route to test database connection
app.get('/api/test-db', (req, res) => {
  db.query('SELECT 1', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database connection failed' });
    } else {
      res.json({ message: 'Database connected successfully' });
    }
  });
});

// Export the app for Passenger
module.exports = app;

// For Passenger, don't call listen() - Passenger handles this
if (typeof(PhusionPassenger) !== 'undefined') {
  PhusionPassenger.configure({ autoInstall: false });
  app.listen('passenger');
} else {
  // For local development
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
