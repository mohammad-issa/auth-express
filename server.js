const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errors');

const app = express();

// Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();

// Body parser
app.use(express.json());

const logger = require('./middleware/logger');

// Router files
const packages = require('./routes/packages');

// Dev logging middleware
if (process.env.NODE_ENV === 'develpoment') {
  app.use(logger);
}

// Mount routers
app.use('/api/packages', packages);

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
