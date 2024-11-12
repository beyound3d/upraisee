const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Create a route '/data' that sends a JSON response
app.get('/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
