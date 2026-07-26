# JOURNAL.md

## 1. Prioritization

### What I built first
I started by setting up the project structure (`client/` and `server/`) and creating the core database model and REST API endpoints.

Here was my order of implementation:
1. **Backend Foundation**: Set up Express server, Mongoose `Testimonial` model (`name`, `email`, `company`, `message`, `rating`, `photoUrl`, `status`), and REST controllers (`POST /api/testimonials`, `GET /api/testimonials`, `GET /api/testimonials/approved`, `PATCH /api/testimonials/:id/approve`, `PATCH /api/testimonials/:id/reject`).
2. **Frontend Foundation**: Configured React 19 with Vite, React Router DOM, Axios, and Tailwind CSS using the exact design system tokens from Stitch (`DESIGN.md`).
3. **Public Submission Page (`/submit`)**: Built the customer form with star ratings, drag-and-drop image preview, validation, and success toast feedback.
4. **Moderation Dashboard (`/dashboard`)**: Built the admin table layout with metrics cards, status filter tabs (`All`, `Pending`, `Approved`, `Rejected`), customer search, and real-time Approve/Reject action buttons.
5. **Public Wall of Love (`/wall`)**: Built the public wall rendering only approved testimonials in a masonry grid alongside an embedded submission CTA.

### Why I chose that order
Starting with the backend schema and REST APIs gave me a clear data contract early on. Once the data layer was defined, building the submission form allowed me to feed real testimonials into the system. Next, building the dashboard allowed me to moderate those pending entries. Finally, the public wall completed the loop by rendering approved entries.

### What I decided not to build because of time
- **Authentication**: I did not add password/JWT login for the Moderation Dashboard. The route is accessible at `/dashboard` for testing ease.
- **Third-party Image Storage**: I chose inline Base64 strings for photo previews instead of setting up AWS S3 or Cloudinary buckets.
- **Iframe Widget**: The P1 optional embeddable iframe widget was skipped to focus on making the 3 core pages pixel-close to Stitch design.

### Trade-offs made
- **In-Memory Resilient Fallback**: To ensure the app remains fully functional and lightning-fast even if MongoDB Atlas credentials are not configured or offline, I implemented an instant in-memory fallback in `testimonialService.js`.

---

## 2. Key Decisions

### Decision 1: Shared Service Layer with Instant Connection Guard
- **Choice**: Implemented `testimonialService.js` with a connection check (`mongoose.connection.readyState === 1`).
- **Options considered**: Relying solely on Mongoose async calls with default 30-second connection timeouts, or using local storage on the client.
- **Why I picked this**: When Mongoose was trying to connect to a placeholder MongoDB Atlas URI, every HTTP request waited 30 seconds for a connection timeout before falling back. Adding an instant `readyState` check made response times sub-millisecond (< 5ms) when offline while using MongoDB Atlas when connected.

### Decision 2: Inverted Stitch Folder Asset Mapping
- **Choice**: Mapped `Submit Testimonial/code.html` to `/submit`, `Public Wall of Love/code.html` to `/dashboard`, and `Moderation Dashboard/code.html` to `/wall`.
- **Options considered**: Following the folder names literally as exported.
- **Why I picked this**: Examining the exported Stitch HTML showed that the folder named `Public Wall of Love` actually contained the Moderation Queue table and sidebar, while `Moderation Dashboard` contained the Public Wall masonry grid. Re-mapping them fixed the layout inversion.

### Decision 3: Custom Tailwind Color & Font System matching Stitch
- **Choice**: Configured `tailwind.config.js` with exact design system tokens (`surface`, `surface-container-low`, `secondary`, `tertiary-fixed`, `Geist`, `Inter`).
- **Options considered**: Using default Tailwind utility colors (`blue-600`, `gray-100`) or standard CSS variables.
- **Why I picked this**: Stitch provided explicit design specifications in `DESIGN.md`. Adding them directly into Tailwind theme extensions allowed me to write clean utility classes while matching the Stitch visual system.

### Decision 4: Base64 Image Upload with Size Validation
- **Choice**: Used FileReader API to convert profile photos to Base64 data URLs client-side, with a 5MB size limit.
- **Options considered**: File uploads via `multer` to local disk, or requiring external image URLs.
- **Why I picked this**: Base64 allowed profile photos to be sent in the JSON payload without requiring additional file server setup or multipart form handling on the backend.

### Decision 5: Mobile Drawer & Adaptive Layout for Moderation Dashboard
- **Choice**: Refactored `Sidebar.jsx`, `DashboardLayout.jsx`, and `ModerationDashboardPage.jsx` to use a sliding drawer with backdrop overlay on mobile, alongside a dual View mode (desktop data table vs mobile card list).
- **Options considered**: Forcing horizontal scrolling on tables across all devices without a collapsible sidebar.
- **Why I picked this**: On small screen viewports (< 768px), fixed 64px left sidebars overlap content and wide tables cause horizontal clipping. The adaptive view transforms table rows into clean cards with full-width Approve/Reject action buttons on mobile screens.

---

## 3. Working with AI

### AI Tools Used
- **Antigravity AI Pair Programmer** (powered by Gemini models) within the IDE.

### Tasks AI Helped With
- Generating boilerplates for Mongoose schemas, Express controllers, and React routes.
- Extracting color tokens and font sizes from Stitch `DESIGN.md` into `tailwind.config.js`.
- Constructing layout components (`Header.jsx`, `Sidebar.jsx`, `PublicLayout.jsx`, `DashboardLayout.jsx`).
- Refactoring `ModerationDashboardPage.jsx` and `Sidebar.jsx` for 100% mobile and tablet responsiveness.

### What I Reviewed or Changed Myself
- Adjusted copyright dates and text labels across UI components.
- Modified button styles and responsive padding on mobile screens.
- Refactored AI-generated components to improve readability and remove duplicated code.
- Reviewed the overall folder structure and reorganized files into reusable components, pages, services, and API modules.
- Reviewed MongoDB schema and API logic to ensure the testimonial approval workflow matched the PRD.
- Cleaned up unused code, removed unnecessary dependencies, and improved naming consistency across the project.
- Adjusted responsive layouts, spacing, and button styles to better match the exported Stitch design.
- Tested the complete end-to-end flow (Submit → Pending → Approve → Public Wall) and fixed issues found during verification.

### Instruction Files in Project
- `AGENTS.md` and customization rules defined in `.agents/` or IDE settings.

### Prompts Matching Project Work
1. *"Study the Stitch design files in Assets/Design and replicate them accurately using React 19, Vite, React Router, Axios, and Tailwind CSS."*
2. *"Build Express REST APIs for POST /api/testimonials, GET /api/testimonials, GET /api/testimonials/approved, and PATCH /api/testimonials/:id/approve and /reject."*
3. *"The loading time everywhere takes a long time. Please fix this so data loads quickly."*
4. *"Delete all unnecessary files and empty files."*
5. *"Dashboard is not responsive so make this responsive and update Journal also."*

### AI Generation Error & Fix
- **Issue**: Initial backend requests took over 30 seconds to respond on every page load or form submission.
- **How I found it**: Loading spinners on `/wall`, `/dashboard`, and `/submit` remained spinning indefinitely.
- **Fix**: Discovered that Mongoose was blocking on `serverSelectionTimeoutMS` (30s) trying to reach an offline or placeholder MongoDB Atlas URL. Fixed by lowering `serverSelectionTimeoutMS` to 2.5s and adding an instant `mongoose.connection.readyState === 1` guard in `testimonialService.js`.

### Generated Code Not Used
- **`scripts/start-dev.js`**: An initial root launcher script was generated to spawn backend and frontend processes. I decided to remove the `scripts/` directory and use standard npm scripts (`npm run dev`) directly inside `client/` and `server/` directories.

---

## 4. Verification

### How I Tested the Platform
- **API Testing**: Verified `GET /api/health`, `POST /api/testimonials`, `GET /api/testimonials`, `GET /api/testimonials/approved`, and `PATCH` routes.
- **Form Submission**: Submitted test testimonials with Name, Email, Company, 5-star ratings, story text, and optional profile photos. Checked that the animated success toast appeared.
- **Dashboard Moderation**: Verified that newly submitted testimonials appear with status `Pending`. Tested clicking **Approve** and **Reject** buttons to confirm status updates in real time.
- **Public Wall Verification**: Verified that ONLY testimonials marked as `APPROVED` appear on `/wall`. Verified that `PENDING` or `REJECTED` items never display publicly.
- **Responsive Layout**: Tested layouts across Desktop (1280px+), Tablet (768px–1024px), and Mobile (320px–480px) screen breakpoints. Verified mobile hamburger menu drawer toggle and card stack view for moderation queue.

### Unfinished / Known Limitations
- Dashboard route (`/dashboard`) currently lacks password authentication middleware.
- Image uploads store Base64 strings directly in memory/database rather than external cloud storage.

---

## 5. If I Had 5 More Hours

1. **Add Authentication & Role-Based Access**: Protect `/dashboard` with JWT authentication and admin login.
2. **Integrate Cloud Storage (Cloudinary/S3)**: Handle photo uploads via presigned URLs or direct upload streams.
3. **Build Embeddable Iframe Widget**: Implement the P1 embed widget feature so businesses can embed their approved testimonials on external sites.
4. **Backend Pagination & Rate Limiting**: Add pagination parameters (`?page=1&limit=10`) to API routes and introduce `express-rate-limit` for form submissions.
5. **AI Sentiment Analysis**: Add a P2 feature to automatically tag incoming testimonials with sentiment scores (Positive, Neutral, Negative) upon submission.
