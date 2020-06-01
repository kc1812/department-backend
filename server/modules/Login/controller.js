const userModel = require('../User/model');
const passwordUtil = require('../../utils/passwordHandler');
const auth = require('../../middlewares/auth');
const responseHandler = require('../../utils/responseHandler');

exports.loginUser = (req, res) => {
    const emailId = req.body.emailId;
    const password = req.body.password;
    let department = "";
    let userDetails = {};
    return userModel.findOne({ 'emailId': emailId })
        .then(userResponse => {
            // console.log(userResponse);
            department = userResponse.department;
            userDetails = {
                id: userResponse._id,
                firstName: userResponse.firstName,
                lastName: userResponse.lastName,
                emailId: userResponse.emailId,
                department: userResponse.department,
                token: '',
                expiresIn: ''
            };
            return passwordUtil.validatePassowrd(password, userResponse.password);
        })
        .then(passwordVerification => {
            if (passwordVerification) {
                userDetails.token = auth.generateToken(req, userDetails.id, department, { expiresIn: '1h'});
                userDetails.expiresIn = '3600';
                responseHandler.successResponse(req, res, "", userDetails, 200);
            } else {
                responseHandler.errorResponse(req, res, "Invalid Email Id or password", null, 401);
            }
        })
        .catch(err => {
            console.log(err);
            responseHandler.errorResponse(req, res, "Invalid EmailId or password", null, 401);
        })
}
