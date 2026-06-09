const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Map user routing subsystem
app.use(cors({
    origin: 'https://educase-react-task-frontend.onrender.com', // Allow requests from your React development server
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Application router runtime online on port ${PORT}`));
