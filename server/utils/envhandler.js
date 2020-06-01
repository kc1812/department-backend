const devConfig = require('../../config/development');
const prodConfig = require('../../config/production');

let config = {};
if (process.env.NODE_ENV === 'development') {
    config =  {
        PORT: process.env.PORT || devConfig.port,
        dbDetails: devConfig.dbDetails,
        secretKey: devConfig.secretKey
    };
} else if (process.env.NODE_ENV === 'production') {
    config = {
        PORT: process.env.PORT || prodConfig.port,
        dbDetails: prodConfig.dbDetails,
        secretKey: prodConfig.secretKey
    };
} else {
    config =  {
        PORT: process.env.PORT || devConfig.port,
        dbDetails: devConfig.dbDetails,
        secretKey: devConfig.secretKey
    };
}

module.exports = config;