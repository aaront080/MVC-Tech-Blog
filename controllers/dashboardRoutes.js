const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_on'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']   
            }
        ]
    })
    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', {posts, loggedin: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
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
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No post found with ID'});
            return;
        }
        const post = dataPost.get({ plain: true });
        res.render('edit-post', {post, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edituser', withAuth, (req,res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.session.user_id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with ID'});
            return;
        }
        const user = userData.get({ plain: true });
        res.render('edit-user', {user, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;