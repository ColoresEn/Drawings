const mongoose = require('mongoose');
const Default = require('./default');
const db = Default.URI; 

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true 
        });
        console.log('MongoDB drawings connected.');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
