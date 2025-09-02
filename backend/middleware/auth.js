import jwt from 'jsonwebtoken';
import User from '../models/userSchema'

const verifyToken = (req, res, next) => {

    const header = req.header.authorization;
    const token = header && header.split(' ')[1];

    if(!token){

        return res.status(401).json({message: 'no token provide'});

    };

    jwt.verify(token, process.env.JWT, (err, decoded) => {

        if(err){

            return res.status(403).json({message: 'Unauthorized'});

        };

        req.userId = decoded._id;

        next();

    });

};

// Si les visiteurs doivent créer un compte pour commenter les articles et tout au moins on a déjà le isAdmin

const isAdmin = (req, res, next) => {

    User.findOne({_id: req.userId})

        then((user) =>{

            if(user.isAdmin){

                next();

            } else {

                return res.status(401).json({message: 'Unauthorized'});

            };

        })
        .catch((err) => res.status(401).json({message: 'Unauthorized'}))

};


export const auth = {
    verifyToken,
    isAdmin
}