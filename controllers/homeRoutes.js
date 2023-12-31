const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req,res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at'
        ],
        order: [[ 'created_at', 'DESC' ]],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attribute: ['username']
                }
            }
        ]
    })
    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
        id: req.params.id
    },
    attributes: [
        'id',
        'post_text',
        'title',
        'created_at',
    ],
    include: [
        {
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    ]    
})
    .then(postData => {
        if (!postData) {
            res.status(404).json({ massage: "No post found with ID"});
            return;
        }
        const post = postData.get({ plain: true });
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if( req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;
