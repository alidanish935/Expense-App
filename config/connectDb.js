const mongoose = require('mongoose');
const colors = require("colors");
const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected and Server Running On ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log('error while coonecting mongodb',error)
    }

}
module.exports = connectDb