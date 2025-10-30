# Project Section Animation Guide

## Overview

The projects section features a sophisticated **4-stage animation sequence** that transitions from a single image into interactive 3D cards.

## Animation Sequence

### Stage 1: Single Image (0.8s)
- **Duration**: 800ms
- **Layout**: Single card (middle card only)
- **Effect**: Shows only the "Scaling from One to N" card
- **Grid**: `grid-cols-1` with no gap

### Stage 2: Horizontal Split (0.8s)
- **Duration**: 800ms after Stage 1
- **Layout**: Three cards appear side by side
- **Effect**: Cards split horizontally into a row
- **Grid**: `grid-cols-3` with 24px gap
- **Transform**: No rotation, flat layout

### Stage 3: Vertical Rotation (0.8s)
- **Duration**: 800ms after Stage 2
- **Layout**: Cards rotate in 3D space
- **Effect**: Each card rotates on Y-axis:
  - Left card: -45deg
  - Middle card: 0deg
  - Right card: 45deg
- **Perspective**: 2000px for depth
- **Layout**: Flexbox centered

### Stage 4: Final Cards (Permanent)
- **Duration**: Starts after Stage 3
- **Layout**: Flat responsive grid
- **Effect**: Cards settle into final position
- **Interactive**: 3D tilt on mouse movement
- **Grid**: `md:grid-cols-3` responsive

## Interactive Features (Stage 4)

Once the animation sequence completes, users can interact with cards:

### Mouse Tracking
- **Movement Range**: ±7.5 degrees on both X and Y axes
- **Physics**: Spring animation (stiffness: 300, damping: 30)
- **Effect**: Cards tilt toward mouse cursor

### Hover Effects
- **Scale**: 1.05x on hover
- **Shine**: Gradient overlay appears (30% opacity)
- **Duration**: 300ms transition

### 3D Transform
- **rotateX**: Based on vertical mouse position
- **rotateY**: Based on horizontal mouse position
- **Transform Origin**: Center of card
- **Preserve 3D**: Applied to maintain depth

## Technical Implementation

### State Management
```typescript
type ViewState = "single" | "horizontal" | "vertical" | "cards";
const [viewState, setViewState] = useState<ViewState>("single");
```

### Animation Trigger
```typescript
onViewportEnter={() => setInView(true)}
viewport={{ once: true, margin: "-100px" }}
```

Animation starts when section enters viewport with -100px margin.

### Sequence Control
```typescript
useEffect(() => {
  if (!inView) return;

  const sequence = async () => {
    setViewState("single");
    await new Promise((resolve) => setTimeout(resolve, 800));

    setViewState("horizontal");
    await new Promise((resolve) => setTimeout(resolve, 800));

    setViewState("vertical");
    await new Promise((resolve) => setTimeout(resolve, 800));

    setViewState("cards");
  };

  sequence();
}, [inView]);
```

## Customization

### Timing Adjustments

Change animation duration in the sequence:
```typescript
// Faster (400ms each stage)
await new Promise((resolve) => setTimeout(resolve, 400));

// Slower (1200ms each stage)
await new Promise((resolve) => setTimeout(resolve, 1200));
```

### Rotation Angles

Modify vertical stage rotation in `getTransform()`:
```typescript
if (viewState === "vertical") {
  return {
    scale: 1,
    rotateY: `${(index - 1) * 60}deg`, // Changed from 45 to 60
    rotateX: 0,
  };
}
```

### Mouse Sensitivity

Adjust tilt range in transform definitions:
```typescript
// More sensitive (±15 degrees)
const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

// Less sensitive (±3 degrees)
const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);
```

### Spring Physics

Modify spring behavior:
```typescript
// Snappier (higher stiffness, lower damping)
const mouseXSpring = useSpring(x, { stiffness: 500, damping: 20 });
const mouseYSpring = useSpring(y, { stiffness: 500, damping: 20 });

// Smoother (lower stiffness, higher damping)
const mouseXSpring = useSpring(x, { stiffness: 150, damping: 50 });
const mouseYSpring = useSpring(y, { stiffness: 150, damping: 50 });
```

## Performance Notes

- **GPU Acceleration**: Uses `transform` and `transformStyle: "preserve-3d"`
- **RequestAnimationFrame**: Framer Motion optimizes internally
- **Viewport Detection**: Animation only triggers once when in view
- **Conditional Rendering**: Single stage only renders one card
- **Hardware Compositing**: `will-change` applied automatically

## Browser Support

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (may need -webkit- prefixes)
- **Mobile**: Touch-optimized, no hover effects

## Debugging

### View Current State
Add this to see current animation state:
```typescript
console.log('Current view state:', viewState);
```

### Disable Animation
Skip directly to final state:
```typescript
// In useEffect, comment out the sequence and just set:
setViewState("cards");
```

### Slow Motion
Multiply all timeouts by a factor:
```typescript
await new Promise((resolve) => setTimeout(resolve, 800 * 3)); // 3x slower
```

## Accessibility

- **Reduced Motion**: Respect user preferences:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  setViewState("cards"); // Skip animation
}
```

- **Keyboard Navigation**: Cards are focusable and accessible
- **Screen Readers**: Content remains readable throughout animation

## Total Animation Time

- **Stage 1**: 800ms
- **Stage 2**: 800ms
- **Stage 3**: 800ms
- **Transition to Stage 4**: ~500ms
- **Total**: ~2.9 seconds from viewport enter to interactive state

---

**File Location**: `src/components/sections/projects-animated.tsx`

**Last Updated**: 2025-10-30
