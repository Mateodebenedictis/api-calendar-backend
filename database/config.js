const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        });
        console.log('DB is connected');
    } catch (error) {
        console.log(error.reason);
        console.log(error);
        throw new Error('Error connecting to MongoDB');
    }
};


module.exports = {
    dbConnection
};