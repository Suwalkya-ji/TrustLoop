import React, { useState } from 'react';
import { submitTestimonial } from '../services/testimonialService';

export default function SubmitTestimonialPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    photoUrl: '',
  });

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [photoPreview, setPhotoPreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('File size must be under 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target.result);
        setFormData((prev) => ({ ...prev, photoUrl: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (e) => {
    e.stopPropagation();
    setPhotoPreview('');
    setFormData((prev) => ({ ...prev, photoUrl: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (rating === 0) {
      setErrorMsg('Please select a star rating (1 to 5 stars).');
      return;
    }

    setSubmitting(true);

    try {
      await submitTestimonial({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
        rating,
        photoUrl: formData.photoUrl,
      });

      // Show success toast
      setShowToast(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        photoUrl: '',
      });
      setRating(0);
      setHoverRating(0);
      setPhotoPreview('');

      // Auto hide toast after 5s
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to submit testimonial. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const currentActiveRating = hoverRating || rating;

  const getRatingLabel = () => {
    if (currentActiveRating === 0) return 'Select a rating';
    const labels = ['Needs Improvement', 'Fair', 'Good', 'Very Good!', 'Excellent!'];
    return `${currentActiveRating} Star${currentActiveRating > 1 ? 's' : ''} - ${labels[currentActiveRating - 1]}`;
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface relative">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-secondary-fixed/30 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[30%] h-[50%] rounded-full bg-tertiary-fixed/20 blur-[100px]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-margin-mobile md:px-lg py-xl">
        {/* Form Header Section */}
        <div className="max-w-2xl w-full text-center mb-xl">
          <div className="inline-flex items-center gap-xs px-sm py-1 rounded-full bg-secondary-container text-on-secondary-container mb-md shadow-xs">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Public Wall Contribution</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-sm">Share your experience with us</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto">
            Your feedback helps us grow and helps others make informed decisions. Join our wall of love.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="max-w-3xl w-full mb-md p-md bg-error-container text-on-error-container rounded-xl flex items-center justify-between shadow-md">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined">error</span>
              <span className="font-label-md text-label-md">{errorMsg}</span>
            </div>
            <button onClick={() => setErrorMsg('')} className="p-1 hover:bg-error/10 rounded-full">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}

        {/* Submission Card */}
        <div className="max-w-3xl w-full bg-surface-container-lowest shadow-xl rounded-xl p-md md:p-xl flex flex-col gap-lg border border-outline-variant/20">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Personal Info */}
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1" htmlFor="name">
                Full Name <span className="text-error">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Jane Doe"
                className="w-full h-12 px-md rounded-lg bg-surface-container-low border border-transparent focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none transition-all placeholder:text-outline-variant text-on-surface"
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1" htmlFor="email">
                Email Address <span className="text-error">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="jane@company.com"
                className="w-full h-12 px-md rounded-lg bg-surface-container-low border border-transparent focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none transition-all placeholder:text-outline-variant text-on-surface"
              />
            </div>

            <div className="flex flex-col gap-xs md:col-span-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1" htmlFor="company">
                Company & Title <span className="text-error">*</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                value={formData.company}
                onChange={handleInputChange}
                placeholder="CEO at TechFlow"
                className="w-full h-12 px-md rounded-lg bg-surface-container-low border border-transparent focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none transition-all placeholder:text-outline-variant text-on-surface"
              />
            </div>

            {/* Star Rating */}
            <div className="flex flex-col gap-xs md:col-span-2 py-sm">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1">
                Overall Rating <span className="text-error">*</span>
              </label>
              <div className="flex items-center gap-xs">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRating(val)}
                    onMouseEnter={() => setHoverRating(val)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                  >
                    <span
                      className={`material-symbols-outlined text-[32px] transition-colors ${
                        val <= currentActiveRating ? 'text-on-tertiary-container' : 'text-outline-variant'
                      }`}
                      style={{
                        fontVariationSettings: `'FILL' ${val <= currentActiveRating ? 1 : 0}`,
                      }}
                    >
                      star
                    </span>
                  </button>
                ))}
                <span
                  className={`ml-sm font-label-md text-label-md transition-colors ${
                    currentActiveRating > 0 ? 'text-secondary font-semibold' : 'text-on-surface-variant'
                  }`}
                >
                  {getRatingLabel()}
                </span>
              </div>
            </div>

            {/* Testimonial Text */}
            <div className="flex flex-col gap-xs md:col-span-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1" htmlFor="message">
                Your Story <span className="text-error">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us how we helped you achieve your goals..."
                className="w-full p-md rounded-lg bg-surface-container-low border border-transparent focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none transition-all placeholder:text-outline-variant resize-none text-on-surface"
              />
            </div>

            {/* Photo Upload */}
            <div className="md:col-span-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1 mb-xs block">
                Profile Photo (Optional)
              </label>
              <div className="relative group cursor-pointer border-2 border-dashed border-outline-variant hover:border-secondary/40 rounded-xl p-xl flex flex-col items-center justify-center transition-colors bg-surface-container-lowest overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />

                {!photoPreview ? (
                  <div className="flex flex-col items-center gap-sm">
                    <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">add_a_photo</span>
                    </div>
                    <div className="text-center">
                      <p className="font-label-md text-label-md text-on-surface">Click or drag to upload</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative group/preview z-20">
                    <img
                      src={photoPreview}
                      alt="Uploaded preview"
                      className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-secondary"
                    />
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-error text-on-error flex items-center justify-center shadow-lg hover:bg-error/90 transition-colors z-30"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-md">
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-14 bg-secondary text-on-secondary rounded-lg font-headline-md text-headline-md shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{submitting ? 'Submitting...' : 'Submit Testimonial'}</span>
                <span className="material-symbols-outlined">{submitting ? 'hourglass_empty' : 'send'}</span>
              </button>
              <p className="text-center font-label-sm text-label-sm text-on-surface-variant mt-md">
                By submitting, you agree to our <a href="#" className="underline hover:text-secondary">Terms of Service</a>.
              </p>
            </div>
          </form>
        </div>

        {/* Success Toast */}
        <div
          className={`fixed bottom-lg left-1/2 -translate-x-1/2 bg-on-surface text-surface px-xl py-md rounded-full shadow-2xl flex items-center gap-md transition-all duration-500 z-50 ${
            showToast ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <span className="material-symbols-outlined text-tertiary-fixed text-[24px]">check_circle</span>
          <span className="font-label-md text-label-md">Thank you! Your testimonial has been submitted for review.</span>
        </div>
      </div>
    </div>
  );
}
