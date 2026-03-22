import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Stats = mongoose.model('Stats', statsSchema);
export default Stats;
