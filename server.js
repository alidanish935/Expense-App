const express = require('express');
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const connectDb = require('./config/connectDb')
const Router=require('./routes/userRoute')
const transectionRoute = require('./routes/transectionRoutes')


const app = express()
dotenv.config();

connectDb();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

console.log('deleteTransection in server-----')

//routes
app.use('/users',Router)
app.use('/transections',transectionRoute)

// static files
app.use(express.static(path.join(__dirname,'./client/build')))

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });

const PORT = 8080 || process.env.PORT

app.listen(PORT,()=> console.log(`server is running on port ${PORT}`))