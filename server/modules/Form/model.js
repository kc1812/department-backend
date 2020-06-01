let mongoose = require('../../utils/dbhandler');
let Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

let formSchema = new Schema({
    message: { type: String, required: true },
    status: { type: String, default: 'PENDING' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Form', formSchema);