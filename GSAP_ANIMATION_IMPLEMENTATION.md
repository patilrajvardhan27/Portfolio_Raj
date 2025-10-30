# GSAP Animation Implementation - Projects Section

## Overview

The projects section has been successfully implemented using **GSAP (GreenSock Animation Platform)** with the **ScrollTrigger** plugin, matching the reference implementation from `codegrid-split-card-scroll-animation`.

## Animation Stages

### Stage 1: Header Fade In (10% - 25% Scroll Progress)
- **Effect**: Header text fades in from bottom
- **Transform**: `translateY(40px)` → `translateY(0px)`
- **Opacity**: `0` → `1`
- **Timing**: Smooth interpolation using `gsap.utils.mapRange`

### Stage 2: Container Width Shrink (0% - 25% Scroll Progress)
- **Effect**: Cards container narrows
- **Width**: `75%` → `60%`
- **Purpose**: Creates space for upcoming card separation

### Stage 3: Gap Animation (35% Scroll Progress)
- **Effect**: Cards separate horizontally
- **Gap**: `0px` → `20px`
- **Border Radius**: Cards get individual rounded corners
  - First card: `20px 0 0 20px`
  - Middle card: `0px`
  - Last card: `0 20px 20px 0`
- **Duration**: `0.5s` with `power3.out` easing

### Stage 4: Card Flip (70% Scroll Progress)
- **Effect**: 3D card flip with tilt
- **Rotation**: All cards rotate `rotateY(180deg)`
- **Stagger**: `0.1s` between cards for sequential effect
- **Outer Cards Tilt**:
  - First card: `rotateZ(-15deg)`, `translateY(30px)`
  - Last card: `rotateZ(15deg)`, `translateY(30px)`
- **Duration**: `0.75s` with `power3.inOut` easing

## Technical Implementation

### ScrollTrigger Configuration
```typescript
ScrollTrigger.create({
  trigger: section,
  start: "top top",              // Start when section top hits viewport top
  end: `+=${window.innerHeight * 4}px`,  // 4x viewport height scroll distance
  scrub: 1,                      // Smooth scrubbing with 1s lag
  pin: true,                     // Pin section during scroll
  pinSpacing: true,              // Maintain spacing after pin
  onUpdate: (self) => {
    // Animation logic based on self.progress (0 to 1)
  }
});
```

### 3D Card Structure
Each card has two faces:

**Front Face** (Image):
```typescript
<div style={{ backfaceVisibility: "hidden" }}>
  {/* Background image with gradient overlay */}
</div>
```

**Back Face** (Content):
```typescript
<div style={{
  backfaceVisibility: "hidden",
  transform: "rotateY(180deg)"
}}>
  {/* Card content (title, description, icon) */}
</div>
```

### State Management
- `isFlipped`: Boolean state to show/hide CTA button
- `isGapAnimationCompleted`: Flag to prevent animation retriggering
- `isFlipAnimationCompleted`: Flag to prevent flip retriggering

### Cleanup
```typescript
useEffect(() => {
  const ctx = gsap.context(() => { /* animations */ }, section);
  return () => ctx.revert(); // Clean up on unmount
}, []);
```

## Card Content

### 1. Going Zero to One (Light Gray Card)
- **Icon**: ↗
- **Number**: 01
- **Background**: `from-gray-100 to-gray-200`
- **Text Color**: Dark (`text-gray-900`)

### 2. Scaling from One to N (Red Accent Card)
- **Icon**: ○○○
- **Number**: 02
- **Background**: `from-red-500 to-red-600`
- **Text Color**: White

### 3. Need Quick Solutions (Dark Card)
- **Icon**: ⚡
- **Number**: 03
- **Background**: `from-gray-800 to-gray-900`
- **Text Color**: White

## Background Image
- **File**: `/public/project_sec_bg.jpg`
- **Split**: Image divided into 3 equal parts
  - Card 1: `backgroundPosition: "0% 50%"`
  - Card 2: `backgroundPosition: "33.33% 50%"`
  - Card 3: `backgroundPosition: "66.66% 50%"`
- **Size**: `backgroundSize: "300% 100%"`
- **Opacity**: 30% with gradient overlay

## CTA Button
- **Appearance**: Fades in after flip animation completes
- **Animation**: Framer Motion with opacity transition
- **Timing**: `0.5s` delay after flip
- **Hover Effects**: Scale (1.05x) and icon movement

## Performance Features

### GPU Acceleration
- Uses `transform` properties (not `left/top`)
- `transformStyle: "preserve-3d"` for 3D context
- Hardware compositing automatically applied

### Optimization
- GSAP context for proper cleanup
- Single ScrollTrigger instance
- Efficient `gsap.set()` for immediate updates
- Conditional animations (flags prevent re-triggering)

## Browser Compatibility
- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (WebKit optimized)
- **Mobile**: Touch-scroll responsive

## File Locations
- **Component**: `/src/components/sections/projects-animated.tsx`
- **Background**: `/public/project_sec_bg.jpg`
- **Dependencies**: `gsap`, `gsap/ScrollTrigger`, `framer-motion`

## Scroll Timeline
```
0%        10%       25%       35%       50%       70%       100%
│          │         │         │         │         │         │
│          └─────────┘         │         │         │         │
│          Header Fade         │         │         │         │
│                              │         │         │         │
└──────────────────────────────┘         │         │         │
      Container Width Shrink             │         │         │
                                         │         │         │
                                         └─────────┘         │
                                         Gap Animation       │
                                                             │
                                                             └──────────
                                                             Card Flip
```

## Testing
1. Open http://localhost:3000
2. Scroll to projects section
3. Verify each animation stage:
   - Header fades in smoothly
   - Container width shrinks
   - Cards separate with gap
   - Cards flip to reveal content
   - CTA button appears

## Customization

### Change Scroll Speed
```typescript
end: `+=${window.innerHeight * 6}px`, // Slower (6x viewport)
end: `+=${window.innerHeight * 2}px`, // Faster (2x viewport)
```

### Adjust Animation Timing
```typescript
// Earlier gap animation (25% instead of 35%)
if (progress >= 0.25 && !isGapAnimationCompleted)

// Later flip animation (80% instead of 70%)
if (progress >= 0.8 && !isFlipAnimationCompleted)
```

### Modify Rotation Angles
```typescript
// More dramatic tilt (20deg instead of 15deg)
rotationZ: (i: number) => [-20, 20][i]

// Subtle tilt (10deg instead of 15deg)
rotationZ: (i: number) => [-10, 10][i]
```

## Status
✅ Implementation complete
✅ TypeScript compilation successful
✅ Dev server running at http://localhost:3000
✅ No errors or warnings

---

**Built with GSAP ScrollTrigger for professional scroll-driven animations**
