const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "I love learning about MVC",
        post_id: 5,
        user_id: 1
    },
    {
        comment_text: "Javacscript is great!",
        post_id: 4,
        user_id: 4
    },
    {
        comment_text: "Cookies are very interesting",
        post_id: 4,
        user_id: 1

    },
    {
        comment_text: "I love making web applications",
        post_id: 5,
        user_id: 3

    },
    {
        comment_text: "This app is great.",
        post_id: 2,
        user_id: 3

    },
    {
        comment_text: "Cookies are very interesting",
        post_id: 4,
        user_id: 3

    },
    {
        comment_text: "I love these features!",
        post_id: 3,
        user_id: 5

    },
    {
        comment_text: "Very interesting!",
        post_id: 1,
        user_id: 2

    },
]
const seedComments = () => Comment.bulkCreate(commentData);
module.exports = seedComments;