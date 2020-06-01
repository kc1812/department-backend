let mongoose = require('mongoose');
const Configuration = require('./envhandler');

const uri = `mongodb+srv://${Configuration.dbDetails.userName}:${Configuration.dbDetails.password}@department-1dxmt.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(error => {
        console.log('Connection Error : ', error);
    });

// handle errors after initial connection was established
mongoose.connection.on('error', err => {
    console.log('Connection Error : ', err);
});

module.exports = mongoose;