
const errorResponse = (req, res, message, err, statusCode = 500) => {
    let response = {
        statusCode: statusCode,
        message: message,
        error: err
    };
    return res.status(statusCode).json(response);
}


const successResponse = (req, res, message, data, statusCode = 200) => {
    let response = {
        statusCode: statusCode,
        message: message,
        data: data
    };
    return res.status(statusCode).json(response);
}

module.exports = {
    errorResponse: errorResponse,
    successResponse: successResponse
};
