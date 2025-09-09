import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({

    lastName: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
    },

    nickName: {
        type: String,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        match: /.+\@.+\..+/,
    },

    password: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    isActive:{
        type: Boolean,
        default: false,
    }

},{
    timestamps: true,
});


// Hash le mdp

userSchema.pre('save', async function (next) {

    if(!this.isModified('password')){

        return next();

    }
        
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();

});



// Compare le mdp

userSchema.methods.comparePassword = async function (candidatePassword) {

    return await bcrypt.compare(candidatePassword, this.password);

};


// Creation du JWT

userSchema.methods.createJWT = function () {
    
    return jwt.sign(

        {_id: this._id, email: this.email, isAdmin: this.isAdmin},
        process.env.JWT_SECRET,
        {expiresIn: '1d'} // expire en 1 jour

    );

};

export default mongoose.model('User', userSchema);