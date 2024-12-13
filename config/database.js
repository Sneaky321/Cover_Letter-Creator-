const mongoose = require('mongoose')
require('dotenv').config();

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourDatabaseName';
const connectDB = async()=>{
    try{
        await mongoose.connect(MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MOngoDB connected succesfully`);
    }
    catch(error){
        console.error(`Error Connecting to MongoDb: ${error.message}`);
        process.exit(1);
    }
};
module.exports = connectDB;