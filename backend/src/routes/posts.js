const { Router }= require('express');
const router = Router();
const  { getPosts, getPost, createPost, updatePost, likePost, deletePost } = require('../controllers/posts.js');

router.route('/')
.get(getPosts)
.post( createPost);

router.route('/:id')
.get(getPost)
.patch(updatePost)
.delete( deletePost);
router.route('/:id/likePost')
.patch(likePost);

module.exports = router; 