const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const Task = require('./models/taskModel');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', taskRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync()  // Sync models with DB, creates tables if not exist
  .then(() => {
    console.log('Database connected and synced.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to DB:', err);
  });
