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


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.bgGreen.white))
