const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errors');
const cookieParser = require('cookie-parser')

const app = express();

// Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();

// Body parser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Cookie-parser
app.use(cookieParser());

// Router files
const packages = require('./routes/packages');
const auth = require('./routes/auth');

// Dev logging middleware
if (process.env.NODE_ENV === 'develpoment') {
  app.use(logger);
}

// Mount routers
app.use('/api/packages', packages);
app.use('/api/auth', auth);

// Errors middelwaer
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promies rejection
process.on('unhandledRejection', (err, promies) => {
  console.log(`Error: ${err.message}`);
  // Close the server
  server.close(() => process.exit(1));
});
