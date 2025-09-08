import User from '../models/userSchema.js';



// Activer un compte en attente

export const activeUser = async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(

            req.params.id,
            {isActive: true},
            {new: true},

        ).select('-password');

        if(!user) {

            return res.status(404).json({message: 'User not found'});

        }

        res.json({message: 'User activated', user});

    } catch(err) {

        return res.status(500).json({message: 'Error server'})

    };

}



// Désactiver un compte

export const desactivateUser = async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(

            req.params.id,
            {isActive: false},
            {new: true},

        ).select('-password');

        if(!user) {

            return res.status(404).json({message: 'User not found'});

        }

        res.json({message: 'User desactivated', user});

    } catch(err) {

        return res.status(500).json({message: 'Error server'})

    };

};

// Liste des admins

export const getAllUsers = async (req, res) => {

    try{

        const users = await User.find().select('-password');

        res.json(users);

    } catch(err) {

        return res.status(500).json({message: 'Error server', err});

    };

};



// Voir l'utilisateur par l'ID

export const getUsersById = async (req, res) => {

    try {

        const user = await User.findById(req.params.id).select('-password');

        if (!user) {

            return res.status(404).json({message: 'User not found'});

        };

        res.json(user);

    } catch(err) {

        return res.status(500).json({message: 'Error server', err})

    };

};



// Mettre à jour l'utilisateur

export const updateUser = async (req, res) => {

    try {

        const updates = req.body;

        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true}).select('-password');

        res.json(user);


    } catch(err) {

        return res.status(500).json({message: 'Error server', err});

    };

};



// Supprimer un admin

export const deleteUser = async (req, res) => {

    try {

        await User.findByIdAndDelete(req.params.id);

        res.json({message: 'User delete'});

    } catch(err) {

        return res.status(500).json({message: 'Error server', err});

    };

};