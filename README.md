# Portfolio Website

A modern, professional portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features a stunning ASCII noise background effect and smooth animations throughout.

## Features

- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Smooth Animations**: Powered by Framer Motion for fluid, professional animations
- **ASCII Background Effect**: Custom WebGL-based animated background
- **Fully Responsive**: Mobile-first design that works on all devices
- **Centralized Color System**: All colors managed through a single source of truth
- **Professional Components**: Built with shadcn/ui component library
- **Smooth Navigation**: Scroll-based navigation with smooth transitions
- **Dark Mode Ready**: Pre-configured dark theme

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx      # Navigation header
│   │   │   └── footer.tsx      # Footer component
│   │   ├── sections/
│   │   │   ├── hero.tsx        # Hero section
│   │   │   ├── about.tsx       # About section
│   │   │   ├── projects.tsx    # Projects section
│   │   │   └── contact.tsx     # Contact section
│   │   └── ui/
│   │       ├── ascii-background.tsx  # WebGL background
│   │       └── button.tsx      # Button component
│   ├── lib/
│   │   ├── colors.ts           # Centralized color system
│   │   └── utils.ts            # Utility functions
│   └── styles/
│       └── globals.css         # Global styles
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Colors

All colors are managed centrally in `src/lib/colors.ts`. To change the theme:

1. Edit the CSS variables in `src/styles/globals.css`
2. Update the color references in `src/lib/colors.ts`
3. Never hardcode colors in components - always use the color system

### Content

Update the following sections with your information:

1. **Hero Section** (`src/components/sections/hero.tsx`):
   - Your name
   - Title/role
   - Social media links

2. **About Section** (`src/components/sections/about.tsx`):
   - Skills and expertise

3. **Projects Section** (`src/components/sections/projects.tsx`):
   - Project details
   - Images
   - Technologies
   - Links

4. **Contact Section** (`src/components/sections/contact.tsx`):
   - Contact information
   - Email
   - Phone
   - Location

### Background Effect

The ASCII background can be customized in `src/app/page.tsx` by modifying the props passed to `AsciiNoiseEffect`:

```tsx
<AsciiNoiseEffect
  noiseStrength={0.14}
  noiseScale={0.008}
  speed={0.13}
  cell={16}
  bw={false}
  charset={1}
  // ... other props
/>
```

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 15**: React framework for production
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **shadcn/ui**: High-quality component library
- **Lucide React**: Icon library
- **WebGL**: For background effects

## Code Quality

This project follows professional development practices:

- **TypeScript**: Strict type checking
- **ESLint**: Code linting
- **Component Organization**: Clear separation of concerns
- **Centralized Theming**: Single source of truth for colors
- **Responsive Design**: Mobile-first approach
- **Performance Optimized**: Fast load times and smooth animations

## License

Copyright (c) 0xBalance - https://0xbalance.xyz (ASCII Background Component)

## Deployment

This project can be deployed to:

- **Vercel** (Recommended)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting platform

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

## Support

For issues or questions, please open an issue on GitHub.

## Author

Your Name - [Your Website](https://yourwebsite.com)

---

Built with ❤️ using Next.js and Tailwind CSS
