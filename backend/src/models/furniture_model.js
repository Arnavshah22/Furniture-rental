import mongoose from 'mongoose';

const furnitureSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true, 
    enum: ['Living Room', 'Bedroom', 'Dining Room', 'Office', 'Outdoor'] 
  },
  dailyRate: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  availableQuantity: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  images: [{ 
    type: String, 
    required: true 
  }],
  dimensions: {
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  weight: { 
    type: Number, 
    required: true 
  },
  condition: { 
    type: String, 
    enum: ['New', 'Excellent', 'Good', 'Fair'], 
    default: 'Good' 
  }
}, { timestamps: true });

export default mongoose.model('Furniture', furnitureSchema);