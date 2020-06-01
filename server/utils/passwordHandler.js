const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.encryptPassword=(argPassword)=>{
   return bcrypt.hash(argPassword, saltRounds)
    .then((response)=>{
        return response;
    })
    .catch(err=>{
        return err;
    })
}

exports.validatePassowrd=(argPassword,argHashedPassword)=>{
   return bcrypt.compare(argPassword, argHashedPassword)
    .then(res=> {
        return res;
    })
    .catch(err=>{
        return err;
    })
}