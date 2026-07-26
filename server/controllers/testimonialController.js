const testimonialService = require('../services/testimonialService');
const asyncWrapper = require('../middleware/asyncWrapper');
const { sendSuccess } = require('../utils/responseHelper');

/**
 * @desc    Submit a new testimonial
 * @route   POST /api/testimonials
 * @access  Public
 */
const createTestimonial = asyncWrapper(async (req, res) => {
  const testimonial = await testimonialService.createTestimonial(req.body);
  return sendSuccess(res, 201, 'Thank you! Your testimonial has been submitted for review.', testimonial);
});

/**
 * @desc    Get all testimonials (for Moderation Dashboard)
 * @route   GET /api/testimonials
 * @access  Private / Moderation
 */
const getAllTestimonials = asyncWrapper(async (req, res) => {
  const testimonials = await testimonialService.getAllTestimonials(req.query);
  return sendSuccess(res, 200, 'Testimonials fetched successfully', testimonials);
});

/**
 * @desc    Get only APPROVED testimonials (for Public Wall)
 * @route   GET /api/testimonials/approved
 * @access  Public
 */
const getApprovedTestimonials = asyncWrapper(async (req, res) => {
  const testimonials = await testimonialService.getApprovedTestimonials();
  return sendSuccess(res, 200, 'Approved testimonials fetched successfully', testimonials);
});

/**
 * @desc    Approve a testimonial
 * @route   PATCH /api/testimonials/:id/approve
 * @access  Private / Moderation
 */
const approveTestimonial = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const testimonial = await testimonialService.approveTestimonial(id);
  return sendSuccess(res, 200, 'Testimonial approved successfully', testimonial);
});

/**
 * @desc    Reject a testimonial
 * @route   PATCH /api/testimonials/:id/reject
 * @access  Private / Moderation
 */
const rejectTestimonial = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const testimonial = await testimonialService.rejectTestimonial(id);
  return sendSuccess(res, 200, 'Testimonial rejected successfully', testimonial);
});

module.exports = {
  createTestimonial,
  getAllTestimonials,
  getApprovedTestimonials,
  approveTestimonial,
  rejectTestimonial,
};
