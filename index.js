const express = require('express');
const connectDB = require('./config/salesforce');
const app = express();
const PORT = process.env.PORT || 5000;

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
