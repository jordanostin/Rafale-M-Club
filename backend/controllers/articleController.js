import Article from '../models/articleSchema.js';


// créer un article

export const createArticle = async (req, res) =>{

    try{

        const {title, content, coverImage, media} = req.body;

        const newArticle = new Article({

            title,
            content,
            author: req.user._id,
            coverImage,
            media

        });

        const savedArticle = await newArticle.save();

        res.status(201).json(savedArticle);

    } catch(err) {

        return res.status(500).json({message: 'Error server', err});

    };

};

// mettre à jour un article

export const updateArticle = async (req, res) =>{

    try{

        const updatedArticle = await Article.findByOneAndUpdate(

            req.params.id,
            req.body,
            {new: true}

        );

        if (!updatedArticle) {

            return res.status(404).json({message: 'Article not found'})

        };

        res.status(200).json(updatedArticle);

    } catch(err) {

        return res.status(500).json({message: 'Error server', err})

    };

};

// supprimer un article

export const deleteArticle = async (req, res) =>{

    try{

        const deletedArticle = await Article.findByOneAndDelete(

            req.params.id

        );

        if(!deletedArticle){

            return res.status(404).json({message: 'Article not found'});

        };

        res.status(200).json({message: 'Article deleted'});

    } catch(err) {

        return res.status(500).json({message: 'Error server', err})

    };

};

// publier/dépublier un article

export const togglePublishedArticle = async (req, res) => {

    try {

        const article = await Article.findById(

            req.params.id
        );

        if(!article){

            return res.status(404).json({message: 'Article not found'});

        };

        article.published = !article.published;

        await article.save();

        res.status(200).json({message: `Article ${article.published ? "publié" : "dépublié"}`, article});

    } catch(err) {

        return res.status(500).json({message: 'Error server', err});

    };

};

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

