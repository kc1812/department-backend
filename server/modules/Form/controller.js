const formModel = require('./model');
const responseHandler = require('../../utils/responseHandler');
const rejected = "REJECTED";
const approved = "APPROVED";
const pending = "PENDING";

exports.getFormDetails = async (req, res) => {
    try {
        const formId = req.params.id;
        const formDBAResponse = await formModel.findById(formId).populate('createdBy', { password: 0 }).populate('assignedTo', { password: 0 }).populate('assignedDepartment', { password: 0 }).sort({createdAt: -1}).exec()
        responseHandler.successResponse(req, res, "", formDBAResponse, 200);
    }
    catch (err) {
        console.log(err);
        responseHandler.errorResponse(req, res, "Internal server error", err, 500);
    }
}


exports.updateForm = async (req, res) => {
    try {
        const formId = req.params.id;
        const formPayLoad = req.body;
        delete formPayLoad._id
        const formDBAResponse = await formModel.update({ "_id": formId }, { $set: formPayLoad }).exec()
        responseHandler.successResponse(req, res, "Form updated successfully", formDBAResponse, 200);
    }
    catch (err) {
        console.log(err);
        responseHandler.errorResponse(req, res, "Internal server error", err, 500);
    }
}


exports.createForm = async (req, res) => {
    try {
        const form = req.body;
        delete form._id;
        delete form.createdAt;
        delete form.updatedAt;
        const formDBAResponse = await new formModel(form).save();
        responseHandler.successResponse(req, res, "Form created successfully", formDBAResponse, 201);
    }
    catch (err) {
        console.log(err);
        responseHandler.errorResponse(req, res, "Internal server error", err, 500);
    }
}

exports.getAllRequestedDetails = async (req, res) => {
    try {
        // console.log(req);
        const userId = req.userId;
        const formDBAResponse = await formModel.find({ createdBy: userId }).populate('createdBy', { password: 0 }).populate('assignedTo', { password: 0 }).populate('assignedDepartment', { password: 0 }).sort({createdAt: -1}).exec();
        responseHandler.successResponse(req, res, "", formDBAResponse, 200);
    }
    catch (err) {
        console.log(err);
        responseHandler.errorResponse(req, res, "Internal server error", err, 500);
    }
}

exports.getAllAssignedDetails = async (req, res) => {
    try {
        // console.log(req);
        const userId = req.userId;
        const formDBAResponse = await formModel.find({ assignedTo: userId }).populate('createdBy', { password: 0 }).populate('assignedTo', { password: 0 }).populate('assignedDepartment', { password: 0 }).sort({createdAt: -1}).exec();
        responseHandler.successResponse(req, res, "", formDBAResponse, 200);
    }
    catch (err) {
        console.log(err);
        responseHandler.errorResponse(req, res, "Internal server error", err, 500);
    }
}


exports.getAllDepartmentFormsDetails = async (req, res) => {
    try {
        const departmentId = req.departmentId;
        const formDBAResponse = await formModel.find({ assignedDepartment: departmentId }).populate('createdBy', { password: 0 }).populate('assignedTo', { password: 0 }).populate('assignedDepartment', { password: 0 }).sort({createdAt: -1}).exec();
        responseHandler.successResponse(req, res, "", formDBAResponse, 200);
    }
    catch (err) {
        console.log(err);
        responseHandler.errorResponse(req, res, "Internal server error", err, 500);
    }
}


// exports.getAllPendingFormsDetails = async (req, res) => {
//     try {
//         const formDBAResponse = await formModel.find({ status: pending }).exec();
//         responseHandler.successResponse(req, res, "", formDBAResponse, 200);
//     }
//     catch (err) {
//         console.log(err);
//         responseHandler.errorResponse(req, res, "Internal server error", err, 500);
//     }
// }


// exports.getAllRejectedFormsDetails = async (req, res) => {
//     try {
//         const formDBAResponse = await formModel.find({ status: rejected }).exec();
//         responseHandler.successResponse(req, res, "", formDBAResponse, 200);
//     }
//     catch (err) {
//         console.log(err);
//         responseHandler.errorResponse(req, res, "Internal server error", err, 500);
//     }
// }


exports.removeForm = async (req, res) => {
    try {
        const formId = req.params.id;
        const deleteResponse = await formModel.deleteOne({ _id: formId })
        responseHandler.successResponse(req, res, "Form deleted successfully", deleteResponse, 200);
    }
    catch (err) {
        console.log(err);
        responseHandler.errorResponse(req, res, "Internal server error", err, 500);
    }
}