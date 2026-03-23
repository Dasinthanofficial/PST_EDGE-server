import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Project.deleteMany({});
    await Project.insertMany([
      { 
        title: 'E-Commerce Platform', 
        slug: 'e-commerce-platform', 
        category: 'Web Development', 
        thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80', 
        description: 'A massively scalable commerce platform built for high volume sales.', 
        challenge: 'Handling high traffic without downtime.', 
        solution: 'Implemented a custom Microservices architecture utilizing Next.js.', 
        technologies: ['React', 'Node.js', 'Tailwind CSS'] 
      },
      { 
        title: 'SaaS Dashboard UI', 
        slug: 'saas-dashboard', 
        category: 'UI/UX Design', 
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', 
        description: 'Sleek, data-rich dashboard for enterprise metrics.', 
        challenge: 'Data visualization was too cluttered.', 
        solution: 'Built custom, minimalist charts prioritizing readability.', 
        technologies: ['Figma', 'React', 'D3.js'] 
      }
    ]);

    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();