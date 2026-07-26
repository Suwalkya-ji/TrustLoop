import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getApprovedTestimonials, submitTestimonial } from '../services/testimonialService';

export default function PublicWallPage() {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Bottom form state
  const [quickForm, setQuickForm] = useState({
    name: '',
    company: '',
    email: '',
    rating: 5,
    message: '',
  });
  const [submittingQuick, setSubmittingQuick] = useState(false);
  const [quickSuccess, setQuickSuccess] = useState(false);

  const fetchApproved = async () => {
    setLoading(true);
    try {
      const res = await getApprovedTestimonials();
      setTestimonials(res.data || []);
    } catch (err) {
      console.error('Failed to fetch approved testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApproved();
  }, []);

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    if (!quickForm.name || !quickForm.company || !quickForm.message) return;
    setSubmittingQuick(true);
    try {
      await submitTestimonial({
        name: quickForm.name,
        company: quickForm.company,
        email: quickForm.email || `${quickForm.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
        rating: quickForm.rating,
        message: quickForm.message,
      });
      setQuickSuccess(true);
      setQuickForm({ name: '', company: '', email: '', rating: 5, message: '' });
      setTimeout(() => setQuickSuccess(false), 4000);
    } catch (err) {
      alert('Error submitting testimonial. Please try again.');
    } finally {
      setSubmittingQuick(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'TL';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface">
      {/* Hero Section with Immersive Background */}
      <section className="relative w-full py-xl px-md overflow-hidden bg-surface-container-low">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0051d5', stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: '#565e74', stopOpacity: 0 }} />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="400" fill="url(#grad1)" />
            <circle cx="800" cy="700" r="300" fill="url(#grad1)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-max-width mx-auto flex flex-col items-center text-center">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary mb-sm bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
            Wall of Love
          </span>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-md max-w-2xl leading-tight">
            Kind words from the <span className="text-secondary italic">visionaries</span> building with us.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg max-w-xl">
            Real feedback from real teams. Discover how TrustLoop is helping companies capture and leverage their most valuable asset: reputation.
          </p>

          <div className="flex flex-wrap gap-md justify-center">
            <Link
              to="/submit"
              className="px-xl py-md bg-secondary text-on-secondary font-label-md text-label-md rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-xs"
            >
              <span>Submit your own</span>
              <span className="material-symbols-outlined text-[18px]">add_comment</span>
            </Link>
            <Link
              to="/dashboard"
              className="px-xl py-md bg-surface-container-highest text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-variant transition-all border border-outline-variant/30 flex items-center gap-xs"
            >
              <span>Moderation Dashboard</span>
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="max-w-max-width mx-auto w-full px-md -mt-8 relative z-20">
        <div className="bg-surface-container-lowest shadow-md rounded-xl p-md flex flex-wrap justify-around items-center gap-md border border-outline-variant/30">
          <div className="flex flex-col items-center">
            <span className="font-headline-lg text-headline-lg text-on-surface">4.9</span>
            <div className="flex text-secondary mb-xs">
              {[1, 2, 3, 4].map((s) => (
                <span key={s} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              ))}
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                star_half
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Average Rating</span>
          </div>

          <div className="w-px h-12 bg-outline-variant hidden md:block" />

          <div className="flex flex-col items-center">
            <span className="font-headline-lg text-headline-lg text-on-surface">500+</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-xs">Happy Clients</span>
          </div>

          <div className="w-px h-12 bg-outline-variant hidden md:block" />

          <div className="flex flex-col items-center">
            <span className="font-headline-lg text-headline-lg text-on-surface">12k</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-xs">Reviews Managed</span>
          </div>
        </div>
      </div>

      {/* Masonry-style Grid */}
      <section className="max-w-max-width mx-auto px-md py-xl w-full">
        {loading ? (
          <div className="py-xl text-center font-label-md text-on-surface-variant flex items-center justify-center gap-md">
            <span className="material-symbols-outlined animate-spin text-[28px] text-secondary">progress_activity</span>
            Loading Wall of Love...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="p-xl text-center bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-sm max-w-lg mx-auto">
            <span className="material-symbols-outlined text-[64px] text-outline-variant mb-sm">sentiment_satisfied</span>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">No approved testimonials yet!</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md">
              Be the very first to share your story or approve submitted testimonials in the moderation dashboard.
            </p>
            <Link
              to="/submit"
              className="inline-flex items-center gap-xs px-lg py-md bg-secondary text-on-secondary font-label-md text-label-md rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Submit First Testimonial
            </Link>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-gutter space-y-gutter">
            {testimonials.map((item, index) => (
              <div
                key={item._id || index}
                className={`break-inside-avoid p-md rounded-xl shadow-sm hover:shadow-md transition-all border border-outline-variant/20 ${
                  index % 5 === 4
                    ? 'bg-secondary text-on-secondary shadow-lg relative overflow-hidden'
                    : 'bg-surface-container-lowest'
                }`}
              >
                {index % 5 === 4 && (
                  <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined text-[120px]">format_quote</span>
                  </div>
                )}

                <div className="flex justify-between items-start mb-md">
                  <div className={`flex ${index % 5 === 4 ? 'text-white' : 'text-secondary'}`}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className="material-symbols-outlined text-md"
                        style={{
                          fontVariationSettings: `'FILL' ${s <= (item.rating || 5) ? 1 : 0}`,
                        }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className={`font-label-sm text-label-sm ${index % 5 === 4 ? 'text-white/70' : 'text-outline-variant'}`}>
                    Verified
                  </span>
                </div>

                <p
                  className={`font-body-lg text-body-lg mb-xl leading-relaxed ${
                    index % 5 === 4 ? 'text-white font-bold' : 'text-on-surface'
                  }`}
                >
                  "{item.message}"
                </p>

                <div
                  className={`flex items-center gap-sm pt-md border-t ${
                    index % 5 === 4 ? 'border-white/20' : 'border-surface-container'
                  }`}
                >
                  {item.photoUrl ? (
                    <img
                      src={item.photoUrl}
                      alt={item.name}
                      className={`w-10 h-10 rounded-full object-cover shadow-xs ${
                        index % 5 === 4 ? 'border-2 border-white/30' : 'border border-outline-variant/30'
                      }`}
                    />
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        index % 5 === 4 ? 'bg-white/20 text-white' : 'bg-secondary-fixed text-on-secondary-fixed'
                      }`}
                    >
                      {getInitials(item.name)}
                    </div>
                  )}

                  <div>
                    <h4 className={`font-label-md text-label-md ${index % 5 === 4 ? 'text-white' : 'text-on-surface'}`}>
                      {item.name}
                    </h4>
                    <p
                      className={`font-label-sm text-label-sm ${
                        index % 5 === 4 ? 'text-white/80' : 'text-on-surface-variant'
                      }`}
                    >
                      {item.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA / Submission */}
      <section className="w-full py-xl px-md bg-surface-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-md">Are you a happy customer?</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl">
            We’d love to hear your story. Your feedback helps us build a better platform for everyone.
          </p>

          <div className="bg-surface-container-lowest p-xl rounded-xl shadow-md text-left border border-outline-variant/20">
            {quickSuccess ? (
              <div className="p-lg bg-on-tertiary-container/10 text-on-tertiary-container rounded-xl text-center flex flex-col items-center gap-sm">
                <span className="material-symbols-outlined text-[48px]">check_circle</span>
                <h3 className="font-headline-md text-headline-md">Thank you! ✨</h3>
                <p className="font-body-md text-body-md">Your testimonial has been submitted for moderation review.</p>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="space-y-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <label className="font-label-md text-label-md text-on-surface">
                      Full Name <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={quickForm.name}
                      onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                      className="w-full px-md py-sm bg-surface rounded-lg border border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-xs">
                    <label className="font-label-md text-label-md text-on-surface">
                      Company & Title <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Acme Inc."
                      value={quickForm.company}
                      onChange={(e) => setQuickForm({ ...quickForm, company: e.target.value })}
                      className="w-full px-md py-sm bg-surface rounded-lg border border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-xs">
                  <label className="font-label-md text-label-md text-on-surface">How would you rate us?</label>
                  <div className="flex gap-xs text-outline-variant">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setQuickForm({ ...quickForm, rating: val })}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <span
                          className={`material-symbols-outlined text-[24px] ${
                            val <= quickForm.rating ? 'text-secondary' : 'text-outline-variant'
                          }`}
                          style={{
                            fontVariationSettings: `'FILL' ${val <= quickForm.rating ? 1 : 0}`,
                          }}
                        >
                          star
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-xs">
                  <label className="font-label-md text-label-md text-on-surface">
                    Your Testimonial <span className="text-error">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share your experience..."
                    value={quickForm.message}
                    onChange={(e) => setQuickForm({ ...quickForm, message: e.target.value })}
                    className="w-full px-md py-sm bg-surface rounded-lg border border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingQuick}
                  className="w-full py-md bg-secondary text-on-secondary font-label-md text-label-md rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {submittingQuick ? 'Submitting...' : 'Post to Wall of Love'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
