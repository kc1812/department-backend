let mongoose = require('../../utils/dbhandler');
let Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

let userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    emailId: { type: String, unique: true, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);