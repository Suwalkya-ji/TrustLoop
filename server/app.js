const express = require('express');
const cors = require('cors');
const testimonialRoutes = require('./routes/testimonialRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Enable CORS for frontend integration
app.use(cors());

// Parse incoming JSON and urlencoded payloads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Testimonial Platform API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// Testimonial API routes
app.use('/api/testimonials', testimonialRoutes);

// Handle unknown API routes (404)
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot find route ${req.originalUrl} on this server.`,
  });
});

// Global Centralized Error Handler
app.use(errorHandler);

module.exports = app;
