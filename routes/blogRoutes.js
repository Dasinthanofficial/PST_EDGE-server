import express from 'express';
import { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getBlogs)
  .post(protect, upload.single('featuredImage'), createBlog);

router.route('/:slug').get(getBlogBySlug);

router.route('/:id')
  .put(protect, upload.single('featuredImage'), updateBlog)
  .delete(protect, deleteBlog);

export default router;
