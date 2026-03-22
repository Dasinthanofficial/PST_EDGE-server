import express from 'express';
import { getProjects, getProjectBySlug, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, upload.single('thumbnail'), createProject);

router.route('/:slug').get(getProjectBySlug);

router.route('/:id')
  .put(protect, upload.single('thumbnail'), updateProject)
  .delete(protect, deleteProject);

export default router;
