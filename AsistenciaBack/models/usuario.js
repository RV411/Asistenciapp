const mongoose=require('mongoose');

const usuarioSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    place:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required:true
    },
    attendance:{
        type:Number,
        default:0
    },
    status:{
        type:Boolean,
        require:false,
    },
    email:{
        type:String,
        default:'',
    },
    phone1:{
        type:String,
        require:true,
    },
    phone2:{
        type:String,
        default:'',
    },
    fingerPrint:[{
        type:String
    }],
    isAdmin:{
        type:Boolean,
        default:false
    },
    dateCreated:{
        type:Date,
        default:Date.now
    },
    passwordHash: {
        type: String,
        required: true,
    }
    });


usuarioSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

usuarioSchema.set('toJSON',{
    vistuals:true,
})

exports.Usuario=mongoose.model('Usuario',usuarioSchema);
exports.usuarioSchema = usuarioSchema;
