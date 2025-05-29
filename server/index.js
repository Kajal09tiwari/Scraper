const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const scraperRoutes = require('./routes/scraperRoutes');

const app = express();
connectDB();

app.use(cors());
app.use('/api', scraperRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
