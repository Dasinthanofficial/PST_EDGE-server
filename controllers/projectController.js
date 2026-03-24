import mongoose from 'mongoose';
import Project from '../models/Project.js';

const parseTechnologies = (technologies) => {
  if (Array.isArray(technologies)) {
    return technologies.map((tech) => String(tech).trim()).filter(Boolean);
  }

  if (typeof technologies === 'string') {
    return technologies
      .split(',')
      .map((tech) => tech.trim())
      .filter(Boolean);
  }

  return [];
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error in getProjects:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single project by slug
// @route   GET /api/projects/slug/:slug
// @access  Public
export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });

    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    console.error('Error in getProjectBySlug:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req, res) => {
  try {
    const title = req.body.title?.trim();
    const slug = req.body.slug?.trim().toLowerCase();
    const category = req.body.category?.trim();
    const description = req.body.description?.trim();
    const challenge = req.body.challenge?.trim();
    const solution = req.body.solution?.trim();
    const technologies = req.body.technologies;
    const liveDemo = req.body.liveDemo?.trim() || '';
    const githubLink = req.body.githubLink?.trim() || '';
    const testimonialQuote = req.body.testimonialQuote?.trim() || '';
    const testimonialAuthor = req.body.testimonialAuthor?.trim() || '';

    const thumbnail = req.file?.path || req.body.thumbnail || '';
    const techArray = parseTechnologies(technologies);

    if (!title || !slug || !category || !thumbnail || !description || !challenge || !solution || techArray.length === 0) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const project = new Project({
      title,
      slug,
      category,
      thumbnail,
      description,
      challenge,
      solution,
      technologies: techArray,
      liveDemo,
      githubLink,
      testimonial:
        testimonialQuote || testimonialAuthor
          ? {
              quote: testimonialQuote,
              author: testimonialAuthor
            }
          : undefined
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    console.error('Error in createProject:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: 'A project with this slug already exists. Please choose a different slug.'
      });
    }

    res.status(400).json({ message: error.message || 'Failed to create project' });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const {
      title,
      slug,
      category,
      description,
      challenge,
      solution,
      technologies,
      liveDemo,
      githubLink,
      testimonialQuote,
      testimonialAuthor
    } = req.body;

    if (title !== undefined) project.title = title.trim();
    if (slug !== undefined) project.slug = slug.trim().toLowerCase();
    if (category !== undefined) project.category = category.trim();
    if (description !== undefined) project.description = description.trim();
    if (challenge !== undefined) project.challenge = challenge.trim();
    if (solution !== undefined) project.solution = solution.trim();
    if (liveDemo !== undefined) project.liveDemo = liveDemo.trim();
    if (githubLink !== undefined) project.githubLink = githubLink.trim();

    if (technologies !== undefined) {
      project.technologies = parseTechnologies(technologies);
    }

    if (testimonialQuote !== undefined || testimonialAuthor !== undefined) {
      const quote = testimonialQuote !== undefined
        ? testimonialQuote.trim()
        : (project.testimonial?.quote || '');

      const author = testimonialAuthor !== undefined
        ? testimonialAuthor.trim()
        : (project.testimonial?.author || '');

      project.testimonial = quote || author ? { quote, author } : undefined;
    }

    if (req.file) {
      project.thumbnail = req.file.path;
    } else if (req.body.thumbnail) {
      project.thumbnail = req.body.thumbnail;
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    console.error('Error in updateProject:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: 'A project with this slug already exists. Please choose a different slug.'
      });
    }

    res.status(400).json({ message: error.message || 'Failed to update project' });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await Project.findById(req.params.id);

    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    console.error('Error in deleteProject:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};