const bcrypt = require('bcryptjs')
const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Task = require('../models/task')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    age: {
        type:Number,
        validate(value){
            if(value < 0){
                throw new Error("Age must be +ve number")
            }
        },
        default: 0
        
    },
    Email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Wrong format of an E-mail")
            }
        },
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim:true,
        minlength:7,
        validate(value){
            if(validator.contains(value.toLowerCase(),'password') ){
                throw new Error("Wrong format of Password");
            }
        }  

    },tokens: [{
        token:{
            type:String,
            required: true
        }
    }]
},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})


userSchema.methods.generateAuthToken = async function () {
    const user = this;
    
    const token =jwt.sign({_id: user._id.toString()}, 'thisismyfirstAthapp',{expiresIn: '7 days'});
    
    user.tokens = user.tokens.concat({token})
    await user.save()
    
    return token;
} 

userSchema.methods.toJSON = function () {
    const user = this;
    
    const publicuser = user.toObject();

    delete publicuser.password
    delete publicuser.tokens


    return publicuser
}

userSchema.statics.findbyCredintials = async (email,password) =>{
    const user = await User.findOne({Email: email})

    if(!user){
        throw new error('unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new error('unable to login')
    }

    return user
}

//Hash password befrore saving itin database
userSchema.pre('save',async function (next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()

})

userSchema.pre('remove',async function (next) {
    const user = this;
    await Task.deleteMany({owner: user._id})
    next()

})


const User = mongoose.model('User',userSchema)

module.exports = User