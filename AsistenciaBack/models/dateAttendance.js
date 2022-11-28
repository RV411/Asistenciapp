
const mongoose=require('mongoose');

const dateAttendanceSchema=mongoose.Schema({
    dateAttendance:{
        type:Date,
        default:Date.now
    },
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required:true
    }    
});

placeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

placeSchema.set('toJSON', {
    virtuals: true,
});

exports.DateAttendance = mongoose.model('DateAttendance', dateAttendanceSchema);
exports.dateAttendanceSchema = dateAttendanceSchema;