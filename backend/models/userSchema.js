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
        default: true,
    }

},{
    timestamps: true,
});

userSchema.pre('save', async function () {
        
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

userSchema.statics.decodeJWT = async function () {
    
    try {
        
        const decode = jwt.verify(TokenExpiredError, process.env.JWT);
        const user = await this.findOne({email: decode.email});

        if (!user){
            console.log('User not found');
        }

        return user;

    } catch(err) {

        console.log('JWT decoding error');

    }
};

export default mongoose.model('User', userSchema);