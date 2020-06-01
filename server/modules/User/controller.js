const userModel = require('./model');
const passwordUtil = require('../../utils/passwordHandler');
const responseHandler = require('../../utils/responseHandler');

exports.getUserDetails = (req, res) => {
    const userId = req.params.id;
    return userModel.findOne({ _id: userId }, { password: 0 }).populate('department').exec()
        .then(userResponse => {
            // console.log(userResponse);
            responseHandler.successResponse(req, res, "", userResponse, 200);
        })
        .catch(err => {
            console.log(err);
            responseHandler.errorResponse(req, res, "Internal server error", err, 500);
        })
}


exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const userPayload = req.body;
    delete userPayload._id;
    delete userPayload.emailId;
    return userModel.update({ "_id": userId }, {$set: userPayload})
        .then(userResponse => {
            // console.log(userResponse);
            responseHandler.successResponse(req, res, "User updated successfully", userResponse, 200);
        })
        .catch(err => {
            console.log(err);
            responseHandler.errorResponse(req, res, "Internal server error", err, 500);
        })
}


exports.createUser = (req, res) => {
    const user = req.body;
    delete user._id;
    return userModel.findOne({ 'emailId': user.emailId })
        .then(uniqueEmailRespose => {
            if (uniqueEmailRespose) {
                responseHandler.errorResponse(req, res, "Email Id already in use", null, 409);
            } else {
                return passwordUtil.encryptPassword(user.password)
                    .then(response => {
                        user.password = response;
                    })
                    .then(() => {
                        return userModel.create(user)
                    })
                    .then(userResponse => {
                        console.log(userResponse);
                        responseHandler.successResponse(req, res, "User created successfully", userResponse, 201);
                    })
            }
        })
        .catch(err => {
            console.log(err);
            responseHandler.errorResponse(req, res, "Internal server error", err, 500);
        })
}

exports.getAllUserDetails = async (req, res) => {
    return userModel.find({}, { password: 0 })
        // .populate('department')
        .exec()
        .then(userResponse => {
            // console.log(userResponse);
            responseHandler.successResponse(req, res, "", userResponse, 200);
        })
        .catch(err => {
            console.log(err);
            responseHandler.errorResponse(req, res, "Internal server error", err, 500);
        })
}


exports.removeUser = (req, res) => {
    const userId = req.params.id;
    userModel.deleteOne({ _id: userId })
        .then(deleteResponse => {
            responseHandler.successResponse(req, res, "User deleted successfully", deleteResponse, 200);
        })
        .catch(err => {
            console.log(err);
            responseHandler.errorResponse(req, res, "Internal server error", err, 500);
        })
}