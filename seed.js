import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';
import Blog from './models/Blog.js';
import Project from './models/Project.js';

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    await Service.deleteMany({});
    await Service.insertMany([
      { title: 'Web Development', iconName: 'Code', description: 'Custom, blazing-fast websites tailored to your needs.', features: [] },
      { title: 'UI/UX Design', iconName: 'Monitor', description: 'Beautifully crafted interfaces that prioritize user experience.', features: [] },
      { title: 'Responsive Design', iconName: 'Smartphone', description: 'Pixel-perfect designs across all devices and screen sizes.', features: [] },
      { title: 'Website Redesign', iconName: 'Layers', description: 'Modernize your outdated platform for better conversions.', features: [] },
      { title: 'Landing Pages', iconName: 'MousePointerClick', description: 'High-converting pages designed to capture leads instantly.', features: [] },
      { title: 'Maintenance & Support', iconName: 'Wrench', description: 'Ongoing technical support to keep your site running smoothly.', features: [] }
    ]);

    await Blog.deleteMany({});
    await Blog.insertMany([
      { title: 'Top 10 Web Design Trends in 2025', slug: 'top-10-trends', category: 'Tech Trends', readTime: '5 min read', featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', excerpt: 'Explore the futuristic design patterns shaping the web this year, from deep 3D interfaces to advanced micro-interactions.', content: 'Welcome to the future of design.' },
      { title: 'Why Every Business Needs a Website', slug: 'why-business-needs-website', category: 'Web Development', readTime: '4 min read', featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', excerpt: 'In the digital age, a website is your most valuable asset. Learn why ignoring web presence is a costly mistake.', content: 'Digital presence is mandatory.' }
    ]);

    await Project.deleteMany({});
    await Project.insertMany([
      { title: 'E-Commerce Platform', slug: 'e-commerce-platform', category: 'Web Development', thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80', description: 'A massive scalable commerce platform.', challenge: 'Handling high traffic', solution: 'Microservices architecture', technologies: ['React', 'Node.js'] },
      { title: 'SaaS Dashboard UI', slug: 'saas-dashboard', category: 'UI/UX Design', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', description: 'Sleek dashboard for metrics.', challenge: 'Data visualization', solution: 'Custom charts', technologies: ['Figma'] }
    ]);

    console.log('Seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
