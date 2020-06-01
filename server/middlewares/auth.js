let jwt = require('jsonwebtoken');
const Configuration = require('../utils/envhandler');
const responseHandler = require('../utils/responseHandler');


exports.generateToken = (req, customerId, departmentId, opts) => {
    opts = opts || {};
    let expiresDefault = '1h';

    let token = jwt.sign({
        auth: customerId,
        department: departmentId,
        agent: req.headers['user-agent']
    }, Configuration.secretKey, { expiresIn: opts.expires || expiresDefault });

    return token;
}

exports.authorizeToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            let tokenData = jwt.verify(token, Configuration.secretKey)
            req.userId = tokenData.auth;
            req.departmentId = tokenData.department;
            next();
        } else {
            responseHandler.errorResponse(req, res, 'Unauthorized', null, 401);
        }
    } catch (error) {
        responseHandler.errorResponse(req, res, 'Unauthorized', null, 401);
    }

}
