const express = require('express');
const connectDB = require('./config/salesforce');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173'
  }));

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.send('Hello, Guayerd Backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
