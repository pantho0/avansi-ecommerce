const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req,res)=>{
    res.send("Avansi Server is on operation")
})

app.listen(port, ()=>{
    console.log("Avansi Server is running on port", port);
})