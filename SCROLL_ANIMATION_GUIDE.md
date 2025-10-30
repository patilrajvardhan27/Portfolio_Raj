# Scroll-Driven Animation Guide

## Overview

The projects section now features a **scroll-driven animation** that smoothly transitions through 4 stages as you scroll. The animation is controlled by your scroll position, making it fluid and responsive.

## How It Works

### Scroll Tracking
```typescript
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "end start"],
});
```

- **Target**: The section container
- **Offset**: Animation starts when section bottom enters viewport, ends when section top leaves
- **Progress**: Returns 0 to 1 value based on scroll position

### Smooth Scrolling
```typescript
const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
});
```

Spring physics smooth out the scroll progress for buttery animations.

## Animation Stages (Based on Scroll Progress)

### Stage 1: Single Image (0% - 25%)
**Scroll Position**: Section just entering viewport

- Shows only the middle card ("Scaling from One to N")
- Full width layout
- Other cards hidden (opacity: 0)

```typescript
cardOpacity: index === 1 ? [1, 1, 1] : [0, 0, 1]
```

### Stage 2: Horizontal Split (25% - 50%)
**Scroll Position**: Quarter way through section

- All three cards appear
- Cards split horizontally
- Gap increases from 0px to 24px
- Cards scale down slightly (0.95) then back up
- Content fades in (opacity 0 → 0.5)

```typescript
gridTemplateColumns: ["1fr", "1fr", "1fr 1fr 1fr"]
containerGap: ["0px", "24px"]
```

### Stage 3: Vertical Rotation (50% - 75%)
**Scroll Position**: Halfway through section

- Cards rotate in 3D space on Y-axis
- Left card: -45deg
- Center card: 0deg
- Right card: +45deg
- Creates "flip/fan" effect
- Content opacity increases (0.5 → 0.8)

```typescript
combinedRotationY:
  progress < 0.5: "0deg"
  0.5 - 0.75: interpolate to target rotation
```

### Stage 4: Final Cards (75% - 100%)
**Scroll Position**: Three-quarters through section

- Cards flatten back to 0deg rotation
- Full content opacity (1.0)
- Interactive features activate at 95%+
- Mouse tracking enabled
- 3D tilt on hover
- CTA button fades in

```typescript
interactiveRotation: progress >= 0.95 ? active : disabled
```

## Section Height

```typescript
className="min-h-[200vh]"
```

The section is 200vh (twice viewport height) to give enough scroll distance for smooth animation progression.

## Sticky Container

```typescript
className="sticky top-20"
```

The cards container sticks to the viewport while you scroll, creating the animation effect.

## Interactive Features (After 95% Progress)

### Mouse Tracking
- Only activates when `scrollProgress >= 0.95`
- Tracks mouse position relative to each card
- Converts to rotation values (-7.5° to +7.5°)

### Spring Physics
```typescript
stiffness: 300
damping: 30
```
Smooth, natural card tilt movements.

### Hover Effects
- Scale: 1.05x (only when interactive)
- Shine overlay: 30% opacity
- Transition: 300ms

## Scroll Progress Timeline

```
0%    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  100%
│         │           │           │           │
Single   Split    Rotate     Flatten    Interactive
Image   (25%)     (50%)      (75%)       (95%)
```

## Key CSS Properties

### 3D Transforms
```css
transform-style: preserve-3d;
perspective: 2000px;
```

### GPU Acceleration
- Uses `transform` (not `left/top`)
- Hardware compositing
- Smooth 60fps animations

## Customization

### Scroll Speed
Adjust section height for faster/slower animation:
```typescript
// Faster (less scroll distance)
className="min-h-[150vh]"

// Slower (more scroll distance)
className="min-h-[300vh]"
```

### Animation Timing
Change when stages occur by modifying progress ranges:
```typescript
// Earlier split (at 20% instead of 25%)
[0, 0.20, 0.5]

// Later rotation (at 60% instead of 50%)
[0.60, 0.85]
```

### Rotation Angles
```typescript
// More dramatic rotation (60deg instead of 45deg)
`${(index - 1) * 60}deg`

// Subtle rotation (30deg)
`${(index - 1) * 30}deg`
```

### Spring Physics
```typescript
// Snappier
stiffness: 150, damping: 20

// More fluid
stiffness: 80, damping: 40
```

## Performance

### Optimizations
- Uses Framer Motion's optimized scroll detection
- Spring animations run on GPU
- `will-change` applied automatically
- Minimal repaints/reflows

### Monitoring
To see current scroll progress:
```typescript
useEffect(() => {
  return smoothProgress.onChange((latest) => {
    console.log('Scroll progress:', latest);
  });
}, [smoothProgress]);
```

## Browser Support

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (may need -webkit- prefixes)
- **Mobile**: Touch-scroll optimized

## Accessibility

### Reduced Motion
Respects `prefers-reduced-motion`:
```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
```

### Keyboard Navigation
- Cards remain focusable
- Content readable at all scroll positions
- No critical info hidden by animation

## Debugging Tips

### See Progress Value
```typescript
<div className="fixed top-4 left-4 bg-black text-white p-2 z-50">
  Progress: {Math.round(smoothProgress.get() * 100)}%
</div>
```

### Disable Smoothing
For testing exact progress values:
```typescript
// Use raw progress instead of smoothProgress
const progress = scrollYProgress;
```

### Jump to Stage
Scroll to specific progress for testing:
```typescript
// 50% progress (rotation stage)
window.scrollTo({
  top: sectionTop + (sectionHeight * 0.5)
});
```

## Common Issues

### Animation Not Starting
- Check section has `min-h-[200vh]`
- Verify `ref={containerRef}` is set
- Ensure sufficient scroll distance

### Jumpy Animation
- Increase spring `damping` value
- Check for layout shifts
- Verify `transform-style: preserve-3d`

### Cards Not Interactive
- Verify scroll progress reaches 95%+
- Check `handleMouseMove` conditions
- Ensure section height allows full scroll

## File Location
`src/components/sections/projects-animated.tsx`

## Total Scroll Distance
With `min-h-[200vh]`:
- On 1080px viewport: ~2160px scroll distance
- Gives ~21.6px per 1% progress
- Smooth, gradual transitions

---

**Key Benefit**: The animation flows naturally with your scroll speed - scroll fast and it animates fast, scroll slow and it animates slowly. No fixed timings!
