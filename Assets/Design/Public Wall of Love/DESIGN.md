---
name: TrustLoop Design System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002113'
  on-tertiary-container: '#009668'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  max-width: 1280px
---

## Brand & Style

The design system is built to evoke a sense of **veracity, momentum, and professional clarity**. As a platform for B2B testimonials, the UI must balance the authority of a financial tool with the approachability of a social platform. 

The chosen style is **Modern Corporate with Tactile Precision**. It utilizes a "Soft-SaaS" aesthetic: high-functional density paired with generous whitespace and subtle depth. The interface avoids unnecessary decoration, ensuring that the testimonials—the core data—remain the focal point. The emotional goal is to make users feel that their reputation is in safe, organized hands.

## Colors

The color palette is anchored by **Deep Slate (Primary)** to establish a foundation of trust and authority. **Electric Blue (Secondary)** is used for interactive elements and primary actions to drive user flow. **Success Green (Tertiary)** is a high-visibility accent reserved strictly for positive statuses and "Approved" states.

- **Primary:** #0F172A (Text, dark mode surfaces, headers)
- **Secondary:** #2563EB (CTAs, links, active states)
- **Success:** #10B981 (Approvals, positive trends, star ratings)
- **Neutral:** #64748B (Secondary text, icons, borders)
- **Surface:** #F8FAFC (Backgrounds, subtle card offsets)

## Typography

This design system uses a dual-font approach. **Geist** is employed for headings and UI labels to provide a technical, precise feel. **Inter** is used for body copy and testimonial content, ensuring maximum legibility across different densities and screen sizes.

Hierarchies are strictly enforced through weight and letter spacing. "Display" and "Headline" levels use tighter tracking to maintain a modern, "tucked" appearance, while "Labels" use slightly increased tracking for clarity at small sizes.

## Layout & Spacing

The layout follows a **8pt linear grid system**. All margins, paddings, and element heights are multiples of 8px (or 4px for micro-adjustments).

- **Desktop:** A 12-column fluid grid with a max-width of 1280px. Gutters are fixed at 24px to maintain breathing room between data-heavy cards.
- **Tablet:** 8-column grid with 20px gutters.
- **Mobile:** Single column with 16px side margins. 

Containers use a "tiered padding" logic: internal card padding is always 24px (md), while outer section margins are 64px (xl) to create a premium, un-cluttered feel.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layering**. Instead of heavy borders, the design system uses depth to separate the canvas from the content.

- **Level 0 (Canvas):** #F8FAFC. The base background.
- **Level 1 (Cards/Surface):** White (#FFFFFF) with a subtle 1px border (#E2E8F0) and a "Soft-Lift" shadow (0px 1px 3px rgba(15, 23, 42, 0.05)).
- **Level 2 (Dropdowns/Modals):** White with a "Deep-Focus" shadow (0px 10px 15px -3px rgba(15, 23, 42, 0.1)).

Hover states on interactive cards should transition from Level 1 to Level 2 elevation with a 200ms ease-in-out curve.

## Shapes

The shape language is consistently **Rounded**, using an 8px base radius to soften the "enterprise" feel.

- **Standard (8px):** Buttons, Input fields, Testimonial cards.
- **Large (16px):** Modals, large empty-state containers.
- **Full (Pill):** Status badges, star rating backgrounds, and tags.

Buttons use the standard 8px radius rather than a pill shape to maintain a more structured, professional B2B appearance.

## Components

### Buttons
- **Primary:** Solid #2563EB with white text. 8px radius. High contrast.
- **Secondary:** Ghost style. #F1F5F9 background with #0F172A text.
- **Tertiary/Outline:** 1px border (#E2E8F0) with #64748B text.

### Testimonial Cards
Features a 24px internal padding. The "Star Rating" is placed at the top-left, followed by the quote in `body-lg`. The footer contains a horizontal layout for the avatar (32px circle), name, and company logo.

### Status Badges
Pill-shaped with a low-opacity background tint of the status color:
- **Approved:** Background: 10% #10B981 | Text: #059669.
- **Pending:** Background: 10% #F59E0B | Text: #D97706.
- **Rejected:** Background: 10% #EF4444 | Text: #DC2626.

### Input Fields
1px border (#E2E8F0). On focus, the border changes to #2563EB with a 3px soft blue outer glow (halo).

### Empty States
Use "flat-line" illustrations with #64748B strokes and #F1F5F9 fills. Keep descriptions centered and concise using `headline-md`.