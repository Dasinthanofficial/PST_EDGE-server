import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Stats from './models/Stats.js';

dotenv.config();

const seedStats = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    await Stats.deleteMany({});
    await Stats.insertMany([
      { label: 'Completed Projects', value: '1', order: 1 },
      { label: 'Happy Clients', value: '1', order: 2 },
      { label: 'Years Experience', value: '5+', order: 3 },
      { label: 'Tech Experts', value: '10+', order: 4 }
    ]);

    console.log('Stats seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding stats:', error);
    process.exit(1);
  }
};

seedStats();
