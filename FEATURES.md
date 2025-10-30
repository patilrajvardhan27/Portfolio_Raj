# Portfolio Website Features

## Implemented Features

### 1. **Combined Landing + Animated Projects Section** ✨
The portfolio now features a unified experience combining the landing page with a stunning 3D animated cards section inspired by the "Redo" design style.

#### Features:
- **Integrated Hero Section**: Landing page content appears first, then smoothly fades out on scroll
- **3D Card Flip Animation**: Cards respond to scroll with realistic 3D rotation
- **Project Cards with Cover Images**: Each card shows a unique cover image before flipping
- **Three Journey Stages**:
  1. **Messit** (Campus utility app - Light gray card)
  2. **Gradbro** (University recommendations - Brand color card)
  3. **MDairy** (Dairy management - Dark card)

#### Technical Implementation:
- **GSAP ScrollTrigger**: Advanced scroll-based animations with timeline control
- **Framer Motion**: Smooth hero section animations and card interactions
- **Multi-stage Timeline**:
  1. Hero content fades out (0% - 15%)
  2. Journey header fades in (18% - 30%)
  3. Container width shrinks (15% - 30%)
  4. Cards separate with gap and border radius (42%)
  5. Cards flip to reveal content (75%)
- **3D Transforms**: Card flips with realistic perspective and rotation
- **Cover Images**: Full-bleed images on card fronts
- **Color-coded Backs**: Each card has unique background and text colors
- **Pinned Scroll**: Section stays fixed while animations play through

#### Location:
`src/components/sections/projects-animated.tsx`

### 2. **Centralized Color System**
All colors are managed through a single source of truth.

#### Implementation:
- CSS Variables in `src/styles/globals.css`
- TypeScript color library in `src/lib/colors.ts`
- No hardcoded colors anywhere in the codebase
- Dark mode support built-in

### 3. **Professional Component Architecture**
- **Header**: Sticky navigation with blur effect on scroll
- **Projects**: Combined landing page + 3D animated journey cards with scroll-triggered transitions
- **About**: Skill cards with hover animations (optional)
- **Contact**: Contact form with information cards (optional)
- **Footer**: Professional footer with links

### 4. **Animation System**
All sections feature smooth, professional animations:
- Scroll-based reveals
- Fade-in effects
- Slide-in transitions
- 3D transforms
- Hover interactions
- Spring physics

### 5. **ASCII Background Effect**
Custom WebGL-based animated background featuring:
- Real-time noise generation
- ASCII character rendering
- Configurable parameters
- Performance optimized

## Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Graphics**: WebGL (for background)

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── projects-animated.tsx  ⭐ NEW
│   │   └── contact.tsx
│   └── ui/
│       ├── ascii-background.tsx
│       └── button.tsx
├── lib/
│   ├── colors.ts
│   └── utils.ts
└── styles/
    └── globals.css
```

## Running the Application

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

The application is currently running at:
- Local: http://localhost:3000
- Network: http://10.0.0.136:3000

## Customization Guide

### Updating Project Cards

Edit `src/components/sections/projects-animated.tsx`:

```typescript
const projectCards: ProjectCard[] = [
  {
    id: "your-id",
    title: "Your Title",
    description: "Your description",
    icon: "🚀", // Any emoji or symbol
  },
  // Add more cards...
];
```

### Changing Colors

Edit the card colors in the `getCardColor` function:

```typescript
const getCardColor = (id: string) => {
  switch (id) {
    case "your-id":
      return "from-blue-500 to-blue-600";
    // ...
  }
};
```

### Background Image

Replace `/public/project_sec_bg.jpg` with your own image.
The image is automatically split into three segments for the three cards.

## Performance Optimizations

- Image optimization through Next.js
- Lazy loading of sections
- Viewport-based animation triggers
- Optimized re-renders with React memoization
- Hardware-accelerated CSS transforms

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Responsive and touch-optimized

## Future Enhancements

Potential additions:
- [ ] Add more project cards
- [ ] Implement actual project filtering
- [ ] Add case study pages for each project
- [ ] Integrate contact form with backend
- [ ] Add blog section
- [ ] Implement dark/light mode toggle
- [ ] Add loading animations
- [ ] Implement page transitions

## Credits

- ASCII Background Component: Copyright (c) 0xBalance - https://0xbalance.xyz
- Design Inspiration: "Redo" agency website
- Built with modern web technologies and best practices

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
