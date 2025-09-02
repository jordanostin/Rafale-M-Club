import Article from '../models/articleSchema.js';


// récupérer tous les articles publiés

export const getPublishedArticles = async (req, res) => {

    try{

        const articles = await Article.find({published: true})
            .populate('author', 'lastName', 'firstName', 'nickName')
            .populate('coverImage')
            .sort({ createdAt: -1});
        
        res.status(200).json(articles);

    } catch(err) {

        res.status(500).json({message: 'Error server', err});

    }

};

// récupérer un article précis

export const getArticleById = async (req, res) => {

    try {

        const article = await Article.findOne({_id: req.params.id, published: true})
            .populate('author', 'lastName', 'firstName', 'nickName')
            .populate('media');

        if (!article){

            return res.status(404).json({message: 'Article not found'});

        }

        res.status(200).json(article);

    } catch(err) {

        return res.status(500).json({message: 'Error server', err});

    };   

};