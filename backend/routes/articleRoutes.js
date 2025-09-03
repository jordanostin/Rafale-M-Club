import express from 'express';
import {

    createArticle,
    updateArticle,
    deleteArticle,
    togglePublishedArticle,
    getPublishedArticles,
    getArticleById

} from '../controllers/articleController.js';
import {auth} from '../middleware/auth.js';


const router = express.Router();


// Que pour les admins

router.post('/', auth.verifyToken, auth.isAdmin, createArticle);
router.put('/:id', auth.verifyToken, auth.isAdmin, updateArticle);
router.delete(':id', auth.verifyToken, auth.isAdmin, deleteArticle);
router.patch('/:id/publish', auth.verifyToken, auth.isAdmin, togglePublishedArticle)

// Pour les visiteurs

router.get('/', getPublishedArticles);
router.get('/', getArticleById);

export default router;