import express from 'express';
import {auth} from '../middleware/auth.js';
import { 
    activeUser,
    desactivateUser,
    getAllUsers,
    getUsersById,
    updateUser,
    deleteUser 
} from '../controllers/userController.js';


const router = express.Router();

router.get('/', auth.verifyToken, auth.isAdmin, getAllUsers);
router.get('/:id', auth.verifyToken, auth.isAdmin, getUsersById);

router.put('/:id', auth.verifyToken, auth.isAdmin, updateUser);

router.delete('/:id', auth.verifyToken, auth.isAdmin, deleteUser);

router.patch('/:id/activate', auth.verifyToken, auth.isAdmin, activeUser);
router.patch('/:id/desactivate', auth.verifyToken, auth.isAdmin, desactivateUser);

export default router;