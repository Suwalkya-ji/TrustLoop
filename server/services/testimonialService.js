const mongoose = require('mongoose');
const Testimonial = require('../models/Testimonial');
const { BadRequestError, NotFoundError } = require('../utils/errorClasses');

// In-memory fallback cache/store for sub-millisecond instant responses when DB is offline
let inMemoryStore = [
  {
    _id: 'mock-1',
    name: 'Sarah Jenkins',
    email: 'sarah@luminalabs.io',
    company: 'Head of Growth, Lumina Labs',
    message: 'TrustLoop completely transformed how we gather feedback. The automation is seamless, and the interface is actually a joy to use. Our conversion rate on testimonial requests tripled in the first month.',
    rating: 5,
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'APPROVED',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    _id: 'mock-2',
    name: 'Marcus Chen',
    email: 'marcus@vectorflow.dev',
    company: 'Founder, VectorFlow',
    message: 'The Wall of Love feature specifically helped us close a major enterprise deal last week. Being able to showcase verified testimonials in such a clean way is a game-changer for B2B.',
    rating: 5,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'APPROVED',
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    _id: 'mock-3',
    name: 'Jane Doe',
    email: 'jane@cloudscale.io',
    company: 'CEO, CloudScale',
    message: 'The integration was seamless and the results were immediate. Our clients love sharing their stories through this portal.',
    rating: 5,
    photoUrl: '',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    _id: 'mock-4',
    name: 'Marcus Knight',
    email: 'marcus.k@vertexai.com',
    company: 'CTO, Vertex AI',
    message: 'We finally have a way to quantify customer sentiment without manual overhead.',
    rating: 4,
    photoUrl: '',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const isDbConnected = () => mongoose.connection.readyState === 1;

class TestimonialService {
  /**
   * Create a new testimonial
   */
  async createTestimonial(data) {
    const { name, email, company, message, rating, photoUrl } = data;

    if (!name || !email || !company || !message || !rating) {
      throw new BadRequestError('Name, email, company, message, and rating are required fields.');
    }

    if (isDbConnected()) {
      try {
        const testimonial = await Testimonial.create({
          name,
          email,
          company,
          message,
          rating: Number(rating),
          photoUrl: photoUrl || '',
          status: 'PENDING',
        });
        return testimonial;
      } catch (err) {
        // Fall through to memory store if DB write fails
      }
    }

    const newDoc = {
      _id: 'mem-' + Date.now(),
      name,
      email,
      company,
      message,
      rating: Number(rating),
      photoUrl: photoUrl || '',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inMemoryStore.unshift(newDoc);
    return newDoc;
  }

  /**
   * Get all testimonials (with optional status & search filtering)
   */
  async getAllTestimonials(query = {}) {
    const { status, search } = query;

    if (isDbConnected()) {
      try {
        const filter = {};
        if (status && status !== 'all') {
          filter.status = status.toUpperCase();
        }
        if (search) {
          filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { message: { $regex: search, $options: 'i' } },
          ];
        }
        return await Testimonial.find(filter).sort({ createdAt: -1 });
      } catch (err) {
        // Fall through to memory store
      }
    }

    return inMemoryStore.filter((item) => {
      let matchesStatus = true;
      let matchesSearch = true;

      if (status && status !== 'all') {
        matchesStatus = item.status === status.toUpperCase();
      }

      if (search) {
        const q = search.toLowerCase();
        matchesSearch =
          item.name.toLowerCase().includes(q) ||
          item.company.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.message.toLowerCase().includes(q);
      }

      return matchesStatus && matchesSearch;
    });
  }

  /**
   * Get only approved testimonials for Public Wall
   */
  async getApprovedTestimonials() {
    if (isDbConnected()) {
      try {
        return await Testimonial.find({ status: 'APPROVED' }).sort({ createdAt: -1 });
      } catch (err) {
        // Fall through to memory store
      }
    }

    return inMemoryStore.filter((item) => item.status === 'APPROVED');
  }

  /**
   * Update status to APPROVED
   */
  async approveTestimonial(id) {
    if (isDbConnected()) {
      try {
        const testimonial = await Testimonial.findByIdAndUpdate(
          id,
          { status: 'APPROVED' },
          { new: true, runValidators: true }
        );
        if (testimonial) return testimonial;
      } catch (err) {
        // Fall through to memory store
      }
    }

    const index = inMemoryStore.findIndex((item) => item._id === id);
    if (index !== -1) {
      inMemoryStore[index].status = 'APPROVED';
      inMemoryStore[index].updatedAt = new Date().toISOString();
      return inMemoryStore[index];
    }

    // If doc was created newly in memory
    throw new NotFoundError(`Testimonial with ID ${id} not found`);
  }

  /**
   * Update status to REJECTED
   */
  async rejectTestimonial(id) {
    if (isDbConnected()) {
      try {
        const testimonial = await Testimonial.findByIdAndUpdate(
          id,
          { status: 'REJECTED' },
          { new: true, runValidators: true }
        );
        if (testimonial) return testimonial;
      } catch (err) {
        // Fall through to memory store
      }
    }

    const index = inMemoryStore.findIndex((item) => item._id === id);
    if (index !== -1) {
      inMemoryStore[index].status = 'REJECTED';
      inMemoryStore[index].updatedAt = new Date().toISOString();
      return inMemoryStore[index];
    }

    throw new NotFoundError(`Testimonial with ID ${id} not found`);
  }
}

module.exports = new TestimonialService();
