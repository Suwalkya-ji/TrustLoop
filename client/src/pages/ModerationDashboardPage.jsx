import React, { useState, useEffect } from 'react';
import { getAllTestimonials, approveTestimonial, rejectTestimonial } from '../services/testimonialService';

export default function ModerationDashboardPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchTestimonials = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await getAllTestimonials(filter, searchQuery);
      setTestimonials(res.data || []);
    } catch (err) {
      setErrorMsg('Failed to load testimonials for moderation dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [filter, searchQuery]);

  const handleApprove = async (id) => {
    setActionLoadingId(id);
    try {
      await approveTestimonial(id);
      setTestimonials((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: 'APPROVED' } : t))
      );
    } catch (err) {
      alert('Failed to approve testimonial.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (id) => {
    setActionLoadingId(id);
    try {
      await rejectTestimonial(id);
      setTestimonials((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: 'REJECTED' } : t))
      );
    } catch (err) {
      alert('Failed to reject testimonial.');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Metrics calculation
  const totalSubmissions = testimonials.length;
  const pendingCount = testimonials.filter((t) => t.status === 'PENDING').length;
  const avgRating =
    totalSubmissions > 0
      ? (testimonials.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalSubmissions).toFixed(1)
      : '5.0';

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
    <div className="flex flex-col w-full min-h-screen">
      {/* Header / Key Metrics Section */}
      <section className="px-sm md:px-lg lg:px-xl py-md lg:py-lg">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-md lg:gap-lg">
          <div className="flex flex-col gap-xs">
            <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">
              Business Intelligence
            </span>
            <h2 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface">Moderation Queue</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm md:gap-md w-full lg:w-auto">
            {/* Metric 1 */}
            <div className="bg-surface-container-low p-sm md:p-md rounded-xl flex flex-col gap-xs min-w-[160px] shadow-sm border border-outline-variant/20">
              <div className="flex justify-between items-center">
                <span className="material-symbols-outlined text-secondary">analytics</span>
                <span className="text-label-sm font-label-sm text-on-tertiary-container bg-tertiary-fixed px-2 py-0.5 rounded-full">
                  +12%
                </span>
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant">Total Submissions</span>
              <span className="font-display-lg text-headline-lg text-on-surface">{totalSubmissions}</span>
            </div>

            {/* Metric 2 */}
            <div className="bg-surface-container-low p-sm md:p-md rounded-xl flex flex-col gap-xs min-w-[160px] shadow-sm border border-outline-variant/20">
              <div className="flex justify-between items-center">
                <span className="material-symbols-outlined text-error">pending_actions</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant">Pending Review</span>
              <span className="font-display-lg text-headline-lg text-on-surface">{pendingCount}</span>
            </div>

            {/* Metric 3 */}
            <div className="bg-surface-container-low p-sm md:p-md rounded-xl flex flex-col gap-xs min-w-[160px] shadow-sm border border-outline-variant/20">
              <div className="flex justify-between items-center">
                <span className="material-symbols-outlined text-on-tertiary-container">star</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant">Average Rating</span>
              <div className="flex items-center gap-xs">
                <span className="font-display-lg text-headline-lg text-on-surface">{avgRating}</span>
                <span className="text-label-sm font-label-sm text-outline">/ 5.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Actions Bar */}
      <section className="px-sm md:px-lg lg:px-xl mb-md">
        <div className="bg-surface-container-highest/30 p-2 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-md border border-outline-variant/20">
          <div className="overflow-x-auto max-w-full pb-1 sm:pb-0">
            <div className="flex items-center p-1 bg-surface-container-low rounded-lg shadow-inner min-w-max">
              {['all', 'pending', 'approved', 'rejected'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-md py-sm font-label-md text-label-md rounded-md capitalize transition-all ${
                    filter === tab
                      ? 'bg-secondary text-on-secondary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-sm w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-body-md">
                search
              </span>
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-md py-sm bg-surface-container-lowest border border-outline-variant/30 rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-secondary/20 transition-all outline-none w-full sm:w-64 shadow-sm"
              />
            </div>
            <button
              onClick={fetchTestimonials}
              className="flex items-center gap-xs px-md py-sm font-label-md text-label-md bg-primary text-on-primary rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              <span className="hidden xs:inline">Refresh</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="px-sm md:px-lg lg:px-xl pb-xl">
        <div className="bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden border border-outline-variant/20">
          {loading ? (
            <div className="p-xl text-center font-label-md text-on-surface-variant flex items-center justify-center gap-md">
              <span className="material-symbols-outlined animate-spin text-[28px] text-secondary">progress_activity</span>
              Loading moderation queue...
            </div>
          ) : testimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-xl px-md bg-surface-container-lowest text-center">
              <div className="relative mb-md">
                <div className="absolute inset-0 bg-secondary/10 blur-3xl rounded-full" />
                <span className="material-symbols-outlined text-[80px] text-outline/30 relative">inbox_customize</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Clear as day!</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-sm">
                No testimonials matching your filter right now. Great job keeping the loop moving.
              </p>
              <button
                onClick={() => {
                  setFilter('all');
                  setSearchQuery('');
                }}
                className="mt-lg px-md py-sm bg-secondary text-on-secondary rounded-lg font-label-md text-label-md hover:shadow-lg transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              {/* Desktop / Tablet Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low/50 border-b border-surface-container">
                      <th className="px-md py-lg font-label-sm text-label-sm text-outline uppercase tracking-wider">Date</th>
                      <th className="px-md py-lg font-label-sm text-label-sm text-outline uppercase tracking-wider">Customer</th>
                      <th className="px-md py-lg font-label-sm text-label-sm text-outline uppercase tracking-wider">Rating</th>
                      <th className="px-md py-lg font-label-sm text-label-sm text-outline uppercase tracking-wider">Excerpt</th>
                      <th className="px-md py-lg font-label-sm text-label-sm text-outline uppercase tracking-wider">Status</th>
                      <th className="px-md py-lg font-label-sm text-label-sm text-outline uppercase tracking-wider text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container">
                    {testimonials.map((item) => (
                      <tr key={item._id} className="hover:bg-surface-container-lowest/80 transition-colors group">
                        <td className="px-md py-md font-body-md text-body-md text-on-surface-variant whitespace-nowrap">
                          {formatDate(item.createdAt)}
                        </td>

                        <td className="px-md py-md">
                          <div className="flex items-center gap-sm">
                            {item.photoUrl ? (
                              <img
                                src={item.photoUrl}
                                alt={item.name}
                                className="w-10 h-10 rounded-full object-cover shadow-xs border border-outline-variant/30"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-label-md font-semibold">
                                {getInitials(item.name)}
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className="font-label-md text-label-md text-on-surface font-semibold">{item.name}</span>
                              <span className="text-label-sm text-outline">{item.company}</span>
                              <span className="text-[11px] text-outline-variant">{item.email}</span>
                            </div>
                          </div>
                        </td>

                        <td className="px-md py-md whitespace-nowrap">
                          <div className="flex gap-0.5 text-secondary">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <span
                                key={s}
                                className="material-symbols-outlined text-[18px]"
                                style={{
                                  fontVariationSettings: `'FILL' ${s <= item.rating ? 1 : 0}`,
                                }}
                              >
                                star
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="px-md py-md max-w-xs">
                          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 italic">
                            "{item.message}"
                          </p>
                        </td>

                        <td className="px-md py-md whitespace-nowrap">
                          {item.status === 'APPROVED' && (
                            <span className="px-3 py-1 rounded-full font-label-sm text-label-sm bg-on-tertiary-container/10 text-on-tertiary-container font-semibold">
                              Approved
                            </span>
                          )}
                          {item.status === 'PENDING' && (
                            <span className="px-3 py-1 rounded-full font-label-sm text-label-sm bg-secondary-container/20 text-secondary font-semibold">
                              Pending
                            </span>
                          )}
                          {item.status === 'REJECTED' && (
                            <span className="px-3 py-1 rounded-full font-label-sm text-label-sm bg-error-container/40 text-error font-semibold">
                              Rejected
                            </span>
                          )}
                        </td>

                        <td className="px-md py-md text-right whitespace-nowrap">
                          {item.status === 'PENDING' ? (
                            <div className="flex items-center justify-end gap-sm">
                              <button
                                onClick={() => handleApprove(item._id)}
                                disabled={actionLoadingId === item._id}
                                className="bg-on-tertiary-container text-on-tertiary px-4 py-1.5 rounded-lg font-label-md text-label-md shadow-md hover:brightness-110 transition-all disabled:opacity-50"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(item._id)}
                                disabled={actionLoadingId === item._id}
                                className="border border-error text-error px-4 py-1.5 rounded-lg font-label-md text-label-md hover:bg-error/5 transition-all disabled:opacity-50"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-xs">
                              {item.status === 'REJECTED' && (
                                <button
                                  onClick={() => handleApprove(item._id)}
                                  className="text-secondary hover:underline font-label-sm text-label-sm"
                                >
                                  Re-Approve
                                </button>
                              )}
                              {item.status === 'APPROVED' && (
                                <button
                                  onClick={() => handleReject(item._id)}
                                  className="text-error hover:underline font-label-sm text-label-sm"
                                >
                                  Reject
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Responsive Card Stack View (< md) */}
              <div className="block md:hidden divide-y divide-surface-container">
                {testimonials.map((item) => (
                  <div key={item._id} className="p-md flex flex-col gap-sm hover:bg-surface-container-lowest/50 transition-colors">
                    <div className="flex items-start justify-between gap-sm">
                      <div className="flex items-center gap-sm">
                        {item.photoUrl ? (
                          <img
                            src={item.photoUrl}
                            alt={item.name}
                            className="w-10 h-10 rounded-full object-cover shadow-xs border border-outline-variant/30"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-label-md font-semibold">
                            {getInitials(item.name)}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">{item.name}</span>
                          <span className="text-label-sm text-outline text-[12px]">{item.company}</span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div>
                        {item.status === 'APPROVED' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-label-sm bg-on-tertiary-container/10 text-on-tertiary-container font-semibold">
                            Approved
                          </span>
                        )}
                        {item.status === 'PENDING' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-label-sm bg-secondary-container/20 text-secondary font-semibold">
                            Pending
                          </span>
                        )}
                        {item.status === 'REJECTED' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-label-sm bg-error-container/40 text-error font-semibold">
                            Rejected
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-sm text-label-sm text-outline-variant text-[12px]">
                      <div className="flex gap-0.5 text-secondary">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span
                            key={s}
                            className="material-symbols-outlined text-[16px]"
                            style={{
                              fontVariationSettings: `'FILL' ${s <= item.rating ? 1 : 0}`,
                            }}
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <span>{formatDate(item.createdAt)}</span>
                    </div>

                    <p className="font-body-md text-body-md text-on-surface-variant italic">
                      "{item.message}"
                    </p>

                    {/* Action Buttons */}
                    <div className="pt-xs flex items-center justify-end gap-sm">
                      {item.status === 'PENDING' ? (
                        <div className="grid grid-cols-2 gap-sm w-full">
                          <button
                            onClick={() => handleApprove(item._id)}
                            disabled={actionLoadingId === item._id}
                            className="w-full bg-on-tertiary-container text-on-tertiary py-2 rounded-lg font-label-md text-label-md text-center shadow-sm hover:brightness-110 transition-all disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(item._id)}
                            disabled={actionLoadingId === item._id}
                            className="w-full border border-error text-error py-2 rounded-lg font-label-md text-label-md text-center hover:bg-error/5 transition-all disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end w-full">
                          {item.status === 'REJECTED' && (
                            <button
                              onClick={() => handleApprove(item._id)}
                              className="text-secondary hover:underline font-label-sm text-label-sm font-semibold"
                            >
                              Re-Approve
                            </button>
                          )}
                          {item.status === 'APPROVED' && (
                            <button
                              onClick={() => handleReject(item._id)}
                              className="text-error hover:underline font-label-sm text-label-sm font-semibold"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          <div className="px-md py-md bg-surface-container-low/30 flex items-center justify-between border-t border-surface-container">
            <span className="font-label-sm md:font-label-md text-label-sm md:text-label-md text-on-surface-variant">
              Showing 1 to {testimonials.length} of {testimonials.length} results
            </span>
            <div className="flex items-center gap-xs">
              <button className="p-2 hover:bg-surface-container-high rounded-md text-outline disabled:opacity-30" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="px-3 py-1 rounded-md bg-secondary text-on-secondary font-label-md text-label-md">1</button>
              <button className="p-2 hover:bg-surface-container-high rounded-md text-on-surface" disabled>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
