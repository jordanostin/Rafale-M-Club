import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


// S'enregistrer

export const register = async (req, res) => {

    const {lastName, firstName, nickName, email, password} = req.body;

    const nameRegex = /^[a-zA-Z0-9\- ]+$/;

    if(!nameRegex.test(lastName) || !nameRegex.test(firstName)){

        return res.status(400).json({message: 'The name cannot contain special characters.'})

    };

    try {

        const existingUser = await User.findOne({ email });

        if(existingUser) {

            return res.status(400).json({message : 'Email already exist'});

        };

        const adminExist = await User.findOne({isAdmin : true});
        
        const isAdmin = !adminExist;

        const isActive = isAdmin ? true : false;

        const user = new User({

            lastName,
            firstName,
            nickName,
            email,
            password,
            isAdmin,
            isActive,
            createdAt: Date.now(),

        });

        await user.save()

        const token = user.createJWT();

        res.status(201).json({

            user:{

                lastName: user.lastName,
                firstName: user.firstName,
                nickName: user.nickName,
                email: user.email,
                id: user._id,
                isAdmin: user.isAdmin,
                isActive: user.isActive,
                createdAt: user.createdAt

            },

            message: isActive 
                ? 'Admin account created and automatically approved' 
                : 'Account created. Waiting for admin approval before login'

        });



    } catch(err) {

        return res.status(500).json({message : 'Server Error', err})

    }
        
};


// Login

export const login = async (req, res) =>{

    try{

        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){

            return res.status(400).json({message: 'User not found'});

        };


        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){

            return res.status(400).json({message: 'Invalid credentials'});

        }

        if(!user.isActive){

            return res.status(403).json({message: 'Account not yet approved by admin'});

        }


        const token = jwt.sign(

            {

                _id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,

            },
            process.env.JWT_SECRET,
            { expiresIn: '1d'} // expire en 1 jour
            
        );


        const safeUser = {

            id: user._id,
            lastName: user.lastName,
            firstName: user.firstName,
            nickName: user.nickName,
            email: user.email,
            isAdmin: user.isAdmin

        }

        res.status(200).json({user: safeUser, token});

    } catch(err) {

        console.error(err);
        res.status(500).json({message: 'Error server', err: err.message});

    }

};