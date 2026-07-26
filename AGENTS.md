# AGENTS.md

## Project Overview

This is a full-stack **Testimonial Platform** built as an SDE-1 take-home assignment.

The project stack:
- **Frontend**: React 19, Vite, React Router DOM (v7), Axios, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas using Mongoose ODM

The platform allows customers to submit testimonials, lets business admins moderate them (approve or reject) in a dashboard, and displays approved testimonials on a public Wall of Love page.

The visual layout, colors, fonts, and component styles match the exported Stitch design files inside `Assets/Design/`. All feature requirements follow `Assets/Testimonial_Platform_PRD.pdf`.

---

## How AI Should Work

When working on this codebase, follow these guidelines:

- **Read existing code first**: Always inspect current files, imports, and utility helpers before making changes.
- **Prioritize the Core Flow**: Always complete the required P0 workflow first: Submit Testimonial → Dashboard → Approve/Reject → Public Wall. Do not start optional features until this workflow is working end to end.
- **Stick to the PRD**: Build what is requested. Do not add unrequested features like complex auth or external plugins unless asked.
- **Follow the Stitch design**: Do not redesign pages, change color schemes, or substitute UI layouts.
- **Reuse components**: Check `client/src/components/`, `client/src/layouts/`, and `server/utils/` before writing new helpers from scratch.
- **Keep changes focused**: Modify only the necessary files for a given task. Avoid changing unrelated code.
- **Write simple, clean code**: Prefer clear, readable code over clever abstractions.

---

## Frontend Guidelines

- Use functional React components with standard hooks (`useState`, `useEffect`).
- Organize code cleanly under `client/src/components/`, `client/src/pages/`, `client/src/layouts/`, `client/src/routes/`, and `client/src/services/`.
- Use **React Router DOM** for client-side navigation (`/submit`, `/wall`, `/dashboard`).
- Use **Axios** (configured in `client/src/api/axios.js`) for all backend API calls.
- Always implement loading indicators, empty states, and user-friendly error messages.
- Match Stitch styling by using design system tokens configured in `client/tailwind.config.js` (`Geist` for headings, `Inter` for body copy, custom surface colors).

---

## Backend Guidelines

- Maintain clear separation of concerns across `server/routes/`, `server/controllers/`, `server/services/`, and `server/models/`.
- Use **Mongoose** models for database queries and schema validation (`server/models/Testimonial.js`).
- Validate incoming request fields (`name`, `email`, `company`, `message`, `rating`).
- Use HTTP helper functions in `server/utils/responseHelper.js` (`sendSuccess`, `sendError`) for consistent JSON responses:
  ```json
  {
    "success": true,
    "message": "Operation successful",
    "data": { ... }
  }
  ```
- Return correct HTTP status codes (`201` Created, `200` OK, `400` Bad Request, `404` Not Found, `500` Server Error).

---

## Working Style

- **Incremental Progress**: Make small, incremental changes instead of large rewrites.
- **Inspect Before Editing**: Read the existing implementation and helper functions before modifying code.
- **Explain Design Intent**: Explain important implementation decisions when introducing new patterns.
- **Seek Clarification**: Ask for clarification instead of making assumptions when requirements are unclear.
- **KISS Principle**: Prefer simple, maintainable solutions over unnecessary complexity.
- **Self-Review**: Review generated code for correctness, readability, and missing edge cases before considering a task complete.
- **Review Before Accepting**: Treat AI-generated code as a first draft. Review every change, understand how it works, and make improvements before considering the task complete.

---

## Before Finishing a Task

Double-check your work against these items:

1. **PRD Compliance**: Does the feature behave as specified in the PRD?
2. **Design Fidelity**: Does it match the Stitch layout and styling?
3. **No Regressions**: Do existing routes (`/submit`, `/wall`, `/dashboard`) continue to work properly?
4. **Code Quality**: Is the code clean, easy to read, and free of console noise?
5. **Clean Workspace**: Are there any leftover debug files, unused imports, or temporary scripts?

---

## Things to Avoid

- **No UI Redesigns**: Do not alter layouts, spacing, or color palettes specified by Stitch.
- **No Feature Creep**: Stick strictly to the take-home prompt and PRD requirements.
- **No Duplicate Code**: Extract shared UI elements or service calls into reusable components and utility modules.
- **No Unused Files**: Delete scratch scripts or temporary files after debugging.
- **No Hardcoded Secrets**: Keep environment configuration inside `.env` files.
- **No Unnecessary Dependencies**: Avoid adding npm packages if standard tools or existing dependencies can solve the problem.
