const mongoose=require('mongoose');

const placeSchema=mongoose.Schema({
    nameChurch: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    cp :{
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
});

placeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

placeSchema.set('toJSON', {
    virtuals: true,
});

exports.Place = mongoose.model('Place', placeSchema);
exports.placeSchema = placeSchema;