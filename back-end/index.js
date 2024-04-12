const express = require('express');
const app = express();
const route = require('./routes/route');
const cors = require('cors');
app.use(cors());
app.use('/api/v1', route);
require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`APP IS RUNNING AT ${PORT}`)
})
