const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
    },
    company: {
      type: String,
      required: [true, 'Company & Title is required'],
      trim: true,
      maxlength: [150, 'Company cannot exceed 150 characters'],
    },
    message: {
      type: String,
      required: [true, 'Testimonial message is required'],
      trim: true,
      maxlength: [2000, 'Testimonial message cannot exceed 2000 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1 star'],
      max: [5, 'Rating cannot exceed 5 stars'],
    },
    photoUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: {
        values: ['PENDING', 'APPROVED', 'REJECTED'],
        message: '{VALUE} is not a valid status',
      },
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

// Index for status queries & date sorting
testimonialSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
