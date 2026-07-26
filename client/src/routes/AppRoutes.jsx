import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';

import SubmitTestimonialPage from '../pages/SubmitTestimonialPage';
import PublicWallPage from '../pages/PublicWallPage';
import ModerationDashboardPage from '../pages/ModerationDashboardPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<PublicWallPage />} />
        <Route path="/submit" element={<SubmitTestimonialPage />} />
        <Route path="/wall" element={<PublicWallPage />} />
      </Route>

      {/* Moderation Dashboard */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<ModerationDashboardPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
