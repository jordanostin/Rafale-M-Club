import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { use } from 'react';
import { isAbsolute } from 'path';


// S'enregistrer

export const register = (req, res) => {

    const {lastName, firstName, nickName, email, password } = req.body;

    const nameRegex = /^[a-zA-Z0-9\- ]+$/;

    if(!nameRegex.test(lastName) || !nameRegex.test(firstName)){

        return res.status(400).json({message: 'The name cannot contain special characters.'})

    };

    const user = new User({

        lastName,
        firstName,
        nickName,
        email,
        password,
        isAdmin: email == 'jordan.ostin@outlook.fr',
        createdAt: Date.now(),

    });

    const token = user.createJWT();

    user.save()
    .then(() =>{
        
        res.status(201).json({

            user:{

                lastName: user.lastName,
                firstName: user.firstName,
                nickName: user.nickName,
                email: user.email,
                id: user._id,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt

            },

            token

        });

    })
    .catch((err) => {

        return res.status(400).json({message: 'Error server', err});

    })
};