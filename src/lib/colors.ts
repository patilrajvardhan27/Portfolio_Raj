/**
 * Centralized Color Theme System
 * All colors used across the application are defined here
 * Never hardcode colors in components - always reference this file
 */

export const colors = {
  // Background colors
  background: {
    primary: "hsl(var(--background))",
    secondary: "hsl(var(--secondary))",
    muted: "hsl(var(--muted))",
    card: "hsl(var(--card))",
  },

  // Foreground/Text colors
  foreground: {
    primary: "hsl(var(--foreground))",
    secondary: "hsl(var(--secondary-foreground))",
    muted: "hsl(var(--muted-foreground))",
    accent: "hsl(var(--accent-foreground))",
  },

  // Accent colors
  accent: {
    primary: "hsl(var(--accent))",
    secondary: "hsl(var(--primary))",
    foreground: "hsl(var(--accent-foreground))",
  },

  // Border and divider colors
  border: {
    DEFAULT: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
  },

  // State colors
  state: {
    destructive: "hsl(var(--destructive))",
    destructiveForeground: "hsl(var(--destructive-foreground))",
  },

  // Brand colors (orange theme)
  brand: {
    DEFAULT: "hsl(var(--brand))",
    foreground: "hsl(var(--brand-foreground))",
  },
} as const;

export type ColorPath = keyof typeof colors;

/**
 * Helper function to get color CSS variables
 */
export function getColor(path: string): string {
  const keys = path.split(".");
  let value: any = colors;

  for (const key of keys) {
    value = value[key];
    if (!value) return "";
  }

  return value;
}
