# Spotlight Dashboard

## Project Context
Personal "About Me" dashboard for a team spotlight presentation. This is a one-time presentation tool - prioritize visual polish and simplicity over over-engineering.

**Audience:** Coworkers viewing on a shared screen
**Goal:** Interactive, engaging way to share personal facts with the team

---

## Tech Stack (Strict)
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS only
- **Icons:** Lucide React
- **Deployment:** Vercel
- **No backend/database** - fully static

---

## Project Structure
```
aboutme/
├── app/
│   ├── layout.tsx       # Root layout with dark theme
│   ├── page.tsx         # Renders SpotlightDashboard
│   └── globals.css      # Tailwind imports only
├── components/
│   └── SpotlightDashboard.tsx   # Main component
├── public/
│   └── images/          # All photos go here
├── package.json
├── tailwind.config.ts
└── next.config.js
```

---

## Coding Standards

### TypeScript
- Use strict mode
- Colocate types with components (no separate type files)
- Prefer `type` for object shapes, `interface` for extendable contracts
- Always type component props explicitly

### Components
- Functional components with hooks only
- Destructure props in function signatures
- Keep components under 200 lines; extract subcomponents if larger
- Use named exports: `export function Component()` not `export default`

### Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- CSS classes: Tailwind only, no custom class names

### State Management
- `useState` for simple state
- `useReducer` for complex state with multiple actions
- No external state libraries

### Style
- Prefer early returns over nested conditionals
- No commented-out code
- Self-documenting code over comments

---

## Do NOT
- Add backend routes, API calls, or database connections
- Install additional UI libraries (no shadcn, MUI, Chakra, etc.)
- Create separate CSS/SCSS files - Tailwind utility classes only
- Add authentication or user management
- Over-engineer - this is a simple presentation tool
- Add unnecessary abstraction layers or utility functions
- Create config files for things that don't need configuration

---

## Feature Requirements

### 1. Dashboard Grid
- 8 interactive tiles in a grid layout
- Dark theme: `bg-gray-950` background
- Gradient colored tiles with hover animations
- Responsive: 2 columns mobile, 4 columns desktop

### 2. Two Truths and a Lie (Each Card)
Each card contains:
```typescript
type CardContent = {
  headline: string;
  statements: [
    { text: string; isLie: boolean },
    { text: string; isLie: boolean },
    { text: string; isLie: boolean }
  ];
  photoSrc: string;
}
```

**Modal interaction flow:**
1. Click tile to open modal
2. Show 3 statements as clickable buttons
3. User guesses which is the lie
4. Click reveals: green = truth, red = lie
5. Show photo and additional context after reveal

### 3. Voting Feature (Optional)
- Click tile to increment vote counter
- "Reveal Winner" button highlights most-voted tile
- Winner tile auto-opens its modal

### 4. Image Handling
- Store images in `/public/images/`
- Reference as `/images/filename.jpg`
- Use Next.js `<Image>` component with proper width/height
- Acceptable formats: jpg, png, webp

---

## Styling Guidelines
- Background: `bg-gray-950`
- Text: `text-white` primary, `text-gray-400` secondary
- Tiles: gradient backgrounds with `rounded-xl`
- Animations: `transition-all duration-300` for hover effects
- Shadows: `shadow-lg` on cards, `shadow-2xl` on modals

---

## Quality Checks
Before considering work complete:
1. Run `npm run build` - must pass with no errors
2. Test at 375px width (mobile)
3. Test at 1920px width (desktop)
4. Verify all modals open/close correctly
5. Verify voting increments work
6. Check all images load

---

## Setup Commands
```bash
npx create-next-app@latest spotlight --typescript --tailwind --app --no-src-dir --no-eslint
cd spotlight
npm install lucide-react
```

---

## Deployment
```bash
npm run build
vercel --prod
```

Or connect GitHub repo to Vercel for automatic deploys on push.

---

## Content Checklist
User must customize:
- [ ] Add personal photos to `/public/images/`
- [ ] Write 2 truths + 1 lie for each category
- [ ] Update card titles and headlines
- [ ] Adjust gradient colors if desired
