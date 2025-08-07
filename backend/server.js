const express = require('express')
const cors = require('cors')
const color= require('colors')
const path = require('path');
require('dotenv').config();


const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/github', require('./routes/githubRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));



// Serve frontend (React build files)
const __dirnameGlobal = path.resolve(); // Needed to avoid issues in modules
app.use(express.static(path.join(__dirnameGlobal, '../frontend/dist')));

// React routing fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirnameGlobal, '../frontend/dist/index.html'));
});


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.bgCyan.green))
