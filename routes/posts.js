import express from 'express'
import { getPostsBySearch,commentPost,getPosts,getPost, createPosts, updatePost,likePost, deletePost } from '../controllers/posts.js';

import auth from '../middleware/auth.js';

const postRouter = express.Router();


postRouter.get("/",getPosts);
postRouter.get("/search",getPostsBySearch);
postRouter.get('/:id',getPost);
postRouter.post("/",auth,createPosts);
postRouter.patch('/:id',auth, updatePost)
postRouter.delete('/:id',auth, deletePost)
postRouter.patch('/:id/likePost',auth, likePost);
postRouter.post('/:id/commentPost',auth, commentPost);

export default postRouter;