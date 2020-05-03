const express = require('express');
const dotenv = require('dotenv');

const app = express();
const logger = require('./middleware/logger');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Router files
const bootcamps = require('./routes/bootcamps');

// Dev logging middleware
if (process.env.NODE_ENV === 'develpoment') {
  app.use(logger);
}

// Mount routers
app.use('/api/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
