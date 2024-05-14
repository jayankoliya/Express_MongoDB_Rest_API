const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler')
const contactRoutes = require('./routes/ContactRoutes');
const userRoutes = require('./routes/userRoutes');
const connectionDB = require('./config/dbConnection');

connectionDB();

const app = express();

const port = process.env.PORT || 5000;

// Add body-parser middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
