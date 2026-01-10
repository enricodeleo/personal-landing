# Brand Manual

## Brand Core
- Name: Enrico Deleo
- Positioning: Fractional CTO and AI Solutions Architect
- Value proposition: pragmatic AI and cloud strategy that accelerates business, products, and time-to-market
- Audience: founders, startup teams, C-level stakeholders, and companies needing senior tech leadership without a full-time hire
- Primary services: fractional CTO leadership, AI/LLM integrations, tech coaching and workshops
- Differentiators: data-driven, ROI-focused, senior execution with startup and corporate experience
- Key messages (verbatim):
  - "Fractional CTO & AI Solutions Architect"
  - "AI pragmatica che accelera business e prodotti"

## Voice and Tone
- Confident and pragmatic, focused on outcomes and ROI
- Technical but accessible, mixing strategy and implementation details
- Direct calls to action with scarcity framing (limited slots per quarter)
- Italian-first language with professional, consultative tone

## Visual Identity
- Logo: monochrome SVG used as inline SVG, fills with current text color; placed prominently at the top of pages
- Photography: profile image (`static/enricodeleo.jpg`) and social/OG image (`static/fb-image.jpg`)
- Iconography: single-color SVG icons, hover states use each network brand color
- Accent element: divider shape SVG in footer

# Design Guidelines

## Layout and Structure
- Single-column, content-first layout centered on the page
- Readability: `max-w-prose` for text blocks, `leading-relaxed` for body copy
- Consistent horizontal padding: `px-5` on mobile, `md:px-12` on larger screens
- Top branding: logo area uses generous padding (`p-12`) to create visual breathing room

## Typography
- Typeface: default Tailwind sans stack (no custom font declared)
- Hierarchy:
  - H1: `text-2xl md:text-3xl`, `font-extrabold`, `leading-tight`
  - H2: `text-lg md:text-xl`, `font-extrabold`
  - H3: `text-lg`, `font-bold`
  - Body: base to `text-lg` with emphasis via `strong` and `em`
- Emphasis: italics for key statements, bold for service highlights

## Color Palette
### Core neutrals (custom hex)
- Dark background: `#0F172A`
- Dark surface: `#111827`
- Dark text: `#F8FAFC`, `#CBD5E1`, `#94A3B8`
- Dark logo tint: `#E5E7EB`
- Light surface: `#F5F5F5`
- Body text (light): `#3c4858`
- Form border / placeholder: `#c0ccda`

### Utility accents (Tailwind tokens)
- Callout border: `amber-600`
- Link emphasis: `amber-700`, `amber-800`, `amber-400`, `amber-300`
- Focus states: `blue-500` ring and border
- Success states: `green-50`, `green-600`, `green-400`
- Error states: `red-500`, `red-600`
- Base UI neutrals: `gray-*`, `slate-*`

### Social hover colors
- LinkedIn: `#0077b5`
- Facebook: `#1877f2`
- GitHub: `#333`
- Behance: `#1769ff`
- Instagram: `#e1306c`
- Twitch: `#9146ff`
- YouTube: `#ff0000`

## Components and Patterns
- Logo header: clickable, centered, inline SVG with `fill-current`
- Newsletter card:
  - Rounded container (`rounded-[15px]`) with light surface
  - Input with border, focus ring, and dropdown suggestions
  - Inline validation with shake, success panel with checkmark animation
- Callout block: left border in amber with inset padding
- Cookie banner: fixed bottom bar with glassy backdrop blur and neutral buttons
- Preferences dialog: modal overlay with scale/opacity transitions and toggle switch
- Footer: social icon row, navigation links, and theme toggle button

## Motion and Interaction
- Banner and modal transitions: opacity, scale, slide for entry/exit
- Newsletter feedback: shake on error, fade-in on success, animated checkmark
- Cookie preferences shortcut: slide-in button with hover lift

## Accessibility and UX
- Skip-to-content link for keyboard navigation
- `aria-*` labeling on interactive elements
- Form validation uses `aria-invalid` and `role="alert"`
- Focus rings and keyboard navigation for dropdown suggestions

# System Used

## Frontend Stack
- Framework: Nuxt 4 with Vue 3 (SFC, `<script setup>`)
- Styling: Tailwind CSS 4 via `@tailwindcss/vite`
- Theming: custom `@theme` CSS variables and a `dark` variant; color mode managed via `useColorMode`

## Tooling and Modules
- PWA: `@vite-pwa/nuxt` with static preset and manifest
- Performance: `@nuxtjs/critters` for critical CSS optimization
- UX utilities: `@vueuse/nuxt`
- Scripts: `@nuxt/scripts` for GA4 and external chat widget injection

## Asset Strategy
- Inline SVG icons (logo + social) with `fill: currentColor`
- Static assets served from `static/` for profile and OG images
