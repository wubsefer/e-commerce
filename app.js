const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth')

//Initialization
const app = express();
dotenv.config();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

//Middlewares
app.use('/api/user', userRoute); 
app.use('/api/auth', authRoute); 



//MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB is connected.'))
.catch((err) => {
    console.log(err)
})

//Server Configuration
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`The server is connected on ${port} port`)
})