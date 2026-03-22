import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    iconName: {
        type: String, // e.g., 'Code2', 'MonitorSmartphone' for lucide-react dynamic rendering
        required: true,
        default: 'Layers'
    },
    description: {
        type: String,
        required: true
    },
    features: [{
        type: String
    }]
}, {
    timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
