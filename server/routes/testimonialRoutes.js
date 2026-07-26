const express = require('express');
const router = express.Router();
const {
  createTestimonial,
  getAllTestimonials,
  getApprovedTestimonials,
  approveTestimonial,
  rejectTestimonial,
} = require('../controllers/testimonialController');

// GET approved testimonials for public wall
router.get('/approved', getApprovedTestimonials);

// POST submit testimonial & GET all testimonials
router.route('/')
  .post(createTestimonial)
  .get(getAllTestimonials);

// PATCH approve/reject status
router.patch('/:id/approve', approveTestimonial);
router.patch('/:id/reject', rejectTestimonial);

module.exports = router;
