const mongoose = require('mongoose');

const dbConnection = ()=>{

    try {
    mongoose.connect(process.env.CONNECTION_STRING,{ useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME }).then(() => {
    console.log('La conexión a la BD está lista...');
    });
    } catch (error) {
        console.error(error);  
    }
}

module.exports = {
    dbConnection
}