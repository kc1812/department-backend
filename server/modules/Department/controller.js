const departmentModel = require('./model');
const responseHandler = require('../../utils/responseHandler');

exports.getDepartmentDetails = (req, res) => {
    const departmentId = req.params.id;
    return departmentModel.findById(departmentId)
        .then(departmentResponse => {
            // console.log(departmentResponse);
            responseHandler.successResponse(req, res, "", departmentResponse, 200);
        })
        .catch(err => {
            console.log(err);
            responseHandler.errorResponse(req, res, "Internal server error", err, 500);
        })
}


exports.updateDepartment = (req, res) => {
    const departmentId = req.params.id;
    const departmentPayload = req.body;
    delete departmentPayload._id;
    return departmentModel.update({ "_id": departmentId }, {$set: departmentPayload})
        .then(departmentResponse => {
            // console.log(departmentResponse);
            responseHandler.successResponse(req, res, "Successfully Updated", departmentResponse, 200);
        })
        .catch(err => {
            console.log(err);
            responseHandler.errorResponse(req, res, "Internal server error", err, 500);
        })
}


exports.createDepartment = (req, res) => {
    const department = req.body;
    delete department._id;
    delete department.createdAt;
    delete department.updatedAt;
    return departmentModel.create(department)
        .then(departmentResponse => {
            // console.log(departmentResponse);
            responseHandler.successResponse(req, res, "Successfully Created", departmentResponse, 201);
        })
        .catch(err => {
            console.log(err);
            responseHandler.errorResponse(req, res, "Internal server error", err, 500);
        })
}

exports.getAllDepartmentDetails = (req, res) => {
    return departmentModel.find()
        .then(departmentResponse => {
            // console.log(departmentResponse);
            responseHandler.successResponse(req, res, "", departmentResponse, 200);
        })
        .catch(err => {
            console.log(err);
            responseHandler.errorResponse(req, res, "Internal server error", err, 500);
        })
}


exports.removeDepartment = (req, res) => {
    const departmentId = req.params.id;
    departmentModel.deleteOne({ _id: departmentId })
        .then(deleteResponse => {
            responseHandler.successResponse(req, res, "Successfully Deleted", departmentResponse, 200);
        })
        .catch(err => {
            console.log(err);
            responseHandler.errorResponse(req, res, "Internal server error", err, 500);
        })
}