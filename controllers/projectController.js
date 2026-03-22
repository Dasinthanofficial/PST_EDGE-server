import Project from '../models/Project.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single project by slug
// @route   GET /api/projects/:slug
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
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req, res) => {
  try {
    const { title, slug, category, description, challenge, solution, technologies, liveDemo, githubLink, testimonialQuote, testimonialAuthor } = req.body;
    let thumbnail = '';
    
    if (req.file) {
      thumbnail = `/uploads/${req.file.filename}`;
    }

    const techArray = Array.isArray(technologies) ? technologies : technologies?.split(',').map(t => t.trim()) || [];

    const project = new Project({
      title,
      slug,
      category,
      thumbnail: thumbnail || req.body.thumbnail,
      description,
      challenge,
      solution,
      technologies: techArray,
      liveDemo,
      githubLink,
      testimonial: {
        quote: testimonialQuote,
        author: testimonialAuthor
      }
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req, res) => {
  try {
    const { title, slug, category, description, challenge, solution, technologies, liveDemo, githubLink, testimonialQuote, testimonialAuthor } = req.body;
    
    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = title || project.title;
      project.slug = slug || project.slug;
      project.category = category || project.category;
      project.description = description || project.description;
      project.challenge = challenge || project.challenge;
      project.solution = solution || project.solution;
      project.liveDemo = liveDemo || project.liveDemo;
      project.githubLink = githubLink || project.githubLink;
      
      if (technologies) {
         project.technologies = Array.isArray(technologies) ? technologies : technologies.split(',').map(t => t.trim());
      }

      if (testimonialQuote || testimonialAuthor) {
          project.testimonial = {
              quote: testimonialQuote || project.testimonial?.quote,
              author: testimonialAuthor || project.testimonial?.author
          };
      }

      if (req.file) {
        project.thumbnail = `/uploads/${req.file.filename}`;
      } else if (req.body.thumbnail) {
        project.thumbnail = req.body.thumbnail;
      }

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
