# Copilot Instructions for AI Coding Agents

## Project Overview
- **Stack:** React (JSX), Vite, Tailwind CSS, ESLint
- **Structure:**
  - `src/Pages/` — Main page components (e.g., `CadastroVoluntario.jsx`)
  - `src/Components/` — Shared UI components (e.g., `Header.jsx`, `Footer.jsx`)
  - `src/assets/` — Static images
  - `public/` — Public assets
  - `index.html`, `main.jsx` — App entry points

## Key Patterns & Conventions
- **Component Organization:**
  - Pages in `src/Pages/` are composed using reusable components from `src/Components/`.
  - Use functional components and React hooks (`useState`, etc.).
  - Form state is managed locally with `useState` and passed to child components as props.
- **Styling:**
  - Tailwind CSS utility classes are used for all styling.
  - No CSS-in-JS or styled-components.
- **Forms:**
  - Form validation is handled in the page component (see `validateForm` in `CadastroVoluntario.jsx`).
  - Use controlled components for all inputs.
  - Custom input groups (e.g., `CheckboxGroup`, `RadioGroup`) are defined as local components.
- **Patterns:**
  - Use `pattern` and `required` props for input validation where possible.
  - Show validation errors above the form.
  - Use descriptive placeholder text and labels for accessibility.

## Developer Workflows
- **Start Dev Server:**
  - `npm install` (first time)
  - `npm run dev` (start Vite dev server)
- **Build for Production:**
  - `npm run build`
- **Lint:**
  - `npm run lint`
- **No test suite is currently present.**

## Integration & External Dependencies
- **No backend/API integration is present.**
- All data is managed client-side.
- Images are imported from `src/assets/` and referenced in components.

## Project-Specific Notes
- **Do not introduce TypeScript unless requested.**
- **Do not add new dependencies without user approval.**
- **Preserve Tailwind utility-first style.**
- **Keep forms accessible and validation user-friendly.**

## Example: Adding a New Page
1. Create a new file in `src/Pages/` (e.g., `NovaPagina.jsx`).
2. Use functional component style and Tailwind classes.
3. Import and use shared components as needed.
4. Add navigation if required in `Header.jsx`.

---
For questions about project structure or conventions, review `CadastroVoluntario.jsx` and `README.md` for reference patterns.
