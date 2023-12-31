const { Post } = require('../models');

const postData = [
    {
        title: "Tech blog is now live!",
        post_text: "this tech blog is now live and fully functional.",
        user_id: 3
    },
    {
        title: "Quantum computing",
        post_text: "quantum computing is now the future of computer science",
        user_id: 1
    },
    {
        title: "Slick carousel",
        post_text: "utilize this tool to give a refined look to your webpage",
        user_id: 2
    },
    {
        title: "EZ Stream web app",
        post_text: "use this app to find all your favorite shows and movies",
        user_id: 5
    },
    {
        title: "Coding bootcamp",
        post_text: "join a coding bootcamp to break into the world of web development",
        user_id: 4
    },
]
const seedPosts = () => Post.bulkCreate(postData);
module.exports = seedPosts;