# Codelab Landing Page Design System

## Typography Hierarchy

### Font Families
- **Primary (Headings)**: Montserrat - Bold/Black weight for all headings
- **Secondary (Body)**: Nunito - Regular/Medium for body text
- **Code/Mono**: System mono font for code snippets

## Text Styles & Usage

### 1. Hero Title (H1)
- **Component**: Main hero headline
- **Font**: Montserrat Black
- **Size**: Mobile: 24px → Desktop: 60px
- **Color**: Black (#000000)
- **Example**: "Build Using Material UI"
- **CSS**: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black`

### 2. Hero Subtitle/Tagline
- **Component**: Text below hero title
- **Font**: Montserrat Black
- **Size**: Mobile: 20px → Desktop: 48px
- **Color**: Black (#000000)
- **Example**: "Without Template Limitations"
- **CSS**: `text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black`

### 3. Hero Description
- **Component**: Supporting text under headlines
- **Font**: Nunito Regular
- **Size**: Mobile: 14px → Desktop: 18px
- **Color**: Dark Gray (#4A5568)
- **Example**: "Nest components to construct the DOM tree..."
- **CSS**: `text-sm sm:text-base lg:text-lg text-slate-600`

### 4. Section Title (H2)
- **Component**: Major section headers
- **Font**: Montserrat Black
- **Size**: Mobile: 20px → Desktop: 48px
- **Color**: 
  - Default: White (#FFFFFF) on dark backgrounds
  - Accent: Purple (#7C3AED) on light backgrounds
- **Examples**: 
  - "Loved by startups" (white)
  - "Build with best practices" (purple)
  - "Control Your Data Pipeline" (purple)
- **CSS**: `text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white/text-violet-600`

### 5. Section Subtitle
- **Component**: Descriptive text under section titles
- **Font**: Nunito Regular
- **Size**: Mobile: 14px → Desktop: 18px
- **Color**: Slate Gray (#64748B)
- **Example**: "Re-use your knowledge of coding..."
- **CSS**: `text-sm sm:text-base md:text-lg text-slate-600`

### 6. Card Title (H3/H4)
- **Component**: Feature card headers
- **Font**: Montserrat Bold
- **Size**: Mobile: 16px → Desktop: 24px
- **Color**: Black (#000000)
- **Examples**: "Build With UI Frameworks", "Component Nesting"
- **CSS**: `text-base sm:text-lg md:text-xl lg:text-2xl font-bold`

### 7. Card Description
- **Component**: Feature card body text
- **Font**: Nunito Regular
- **Size**: Mobile: 14px → Desktop: 16px
- **Color**: Slate Gray (#64748B)
- **Example**: "We integrate with existing UI Frameworks..."
- **CSS**: `text-sm sm:text-base text-slate-600`

### 8. Testimonial Quote
- **Component**: Customer testimonial text
- **Font**: Nunito Regular Italic
- **Size**: Mobile: 14px → Desktop: 16px
- **Color**: Light Gray on dark (#CBD5E0)
- **CSS**: `text-sm sm:text-base text-slate-300 italic`

### 9. Testimonial Attribution
- **Component**: Name and role
- **Font**: Nunito Medium
- **Size**: 14px
- **Color**: 
  - Name: Light Gray (#E2E8F0)
  - Role: Medium Gray (#94A3B8)
- **CSS**: `text-sm text-neutral-300` / `text-sm text-slate-400`

### 10. Button Text
- **Component**: CTA buttons
- **Font**: Nunito Bold
- **Size**: Mobile: 16px → Desktop: 24px
- **Color**: Context-dependent
- **Examples**: 
  - Primary: White text on blue background
  - Ghost: White text on transparent
- **CSS**: `text-base sm:text-lg lg:text-xl xl:text-2xl font-bold`

### 11. Navigation Links
- **Component**: Header navigation
- **Font**: Nunito Medium
- **Size**: 16px
- **Color**: Black (#000000)
- **CSS**: `text-base font-medium`

### 12. Footer Text
- **Component**: Footer links and info
- **Font**: Nunito Regular
- **Size**: 14px
- **Color**: Light Gray (#9CA3AF)
- **CSS**: `text-sm text-gray-400`

### 13. Badge/Label
- **Component**: Integration labels, tags
- **Font**: Nunito Regular
- **Size**: 12px → 14px
- **Color**: Medium Gray (#6B7280)
- **CSS**: `text-xs sm:text-sm text-gray-600`

### 14. Data Pipeline Numbers
- **Component**: Large step numbers (1, 2, 3)
- **Font**: Montserrat Black
- **Size**: 48px → 64px
- **Color**: Light Purple (#EDE9FE)
- **CSS**: `text-5xl lg:text-6xl font-black text-violet-100`

## Color Palette

### Primary Colors
- **Purple/Violet**: #7C3AED (violet-600)
- **Purple Dark**: #6D28D9 (violet-700)
- **Purple Light**: #DDD6FE (violet-200)

### Secondary Colors
- **Yellow/Gold**: #FCD34D (yellow-400)
- **Blue**: #3B82F6 (blue-500)

### Neutral Colors
- **Black**: #000000
- **White**: #FFFFFF
- **Slate-600**: #475569 (body text)
- **Slate-400**: #94A3B8 (secondary text)
- **Slate-300**: #CBD5E0 (light text on dark)

### Background Colors
- **Dark Blue**: #1E293B (dark sections)
- **Purple**: #7C3AED (CTA sections)
- **White**: #FFFFFF (default)
- **Light Gray**: #F8FAFC (alternate sections)

## Spacing System
- Base unit: 4px
- Common spacings: 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px

## Component Patterns

### Cards
- White background with shadow
- Rounded corners (8px)
- Padding: 16px mobile → 32px desktop

### Buttons
- Rounded: Full or Large (rounded-full or rounded-lg)
- Padding: px-8 py-6 → px-16 py-14
- Transition effects on hover

### Sections
- Full width containers
- Alternating backgrounds
- Generous vertical padding

## Responsive Breakpoints
- Mobile: < 640px
- Small: 640px (sm)
- Medium: 768px (md)
- Large: 1024px (lg)
- XL: 1280px (xl)
- 2XL: 1536px (2xl)

## Summary
You need approximately **14 distinct text styles** to cover all use cases in your landing page. The key is maintaining consistency in:
1. Font family usage (Montserrat for headings, Nunito for body)
2. Color application (purple for accents, slate grays for body text)
3. Size progression (clear hierarchy from hero to footer)
4. Weight variation (Black/Bold for emphasis, Regular for reading)

## Implementation Guide

### Recommended Approach: CVA + tailwind-merge

This approach provides type safety, prevents style conflicts, and creates a maintainable design system.

### 1. Install Dependencies

```bash
pnpm add class-variance-authority tailwind-merge clsx
```

### 2. Create Utility Function

```typescript
// libs/frontend/shared/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 3. Typography System Implementation

```typescript
// libs/frontend/shared/design-system/typography.ts
import { cva, type VariantProps } from 'class-variance-authority'

export const headingVariants = cva(
  // Base styles for all headings
  'font-display font-black',
  {
    variants: {
      level: {
        hero: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
        heroSub: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
        h1: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
        h2: 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl',
        h3: 'text-base sm:text-lg md:text-xl lg:text-2xl',
        h4: 'text-base sm:text-lg md:text-xl',
        h5: 'text-sm sm:text-base md:text-lg',
        h6: 'text-sm sm:text-base',
      },
      color: {
        default: 'text-black',
        white: 'text-white',
        primary: 'text-violet-600',
        muted: 'text-slate-600',
      },
    },
    defaultVariants: {
      level: 'h2',
      color: 'default',
    },
  }
)

export const textVariants = cva(
  // Base styles for body text
  'font-body',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-sm sm:text-base',
        md: 'text-sm sm:text-base md:text-lg',
        lg: 'text-base sm:text-lg md:text-xl',
        xl: 'text-lg sm:text-xl md:text-2xl',
      },
      weight: {
        regular: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      color: {
        default: 'text-black',
        white: 'text-white',
        muted: 'text-slate-600',
        light: 'text-slate-400',
        lighter: 'text-slate-300',
        neutral: 'text-neutral-300',
      },
      italic: {
        true: 'italic',
        false: '',
      },
    },
    defaultVariants: {
      size: 'base',
      weight: 'regular',
      color: 'default',
      italic: false,
    },
  }
)

// Type exports
export type HeadingVariants = VariantProps<typeof headingVariants>
export type TextVariants = VariantProps<typeof textVariants>
```

### 4. Typography Components

```tsx
// libs/frontend/shared/design-system/components/Typography.tsx
import { cn } from '@codelab/shared-utils'
import { headingVariants, textVariants, type HeadingVariants, type TextVariants } from '../typography'

// Heading Component
interface HeadingProps extends HeadingVariants {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  children: React.ReactNode
}

export const Heading = ({ 
  as: Component = 'h2', 
  level, 
  color, 
  className, 
  children 
}: HeadingProps) => {
  return (
    <Component className={cn(headingVariants({ level, color }), className)}>
      {children}
    </Component>
  )
}

// Text Component
interface TextProps extends TextVariants {
  as?: 'p' | 'span' | 'div'
  className?: string
  children: React.ReactNode
}

export const Text = ({ 
  as: Component = 'p', 
  size, 
  weight, 
  color, 
  italic,
  className, 
  children 
}: TextProps) => {
  return (
    <Component className={cn(textVariants({ size, weight, color, italic }), className)}>
      {children}
    </Component>
  )
}
```

### 5. Specific Use Case Components

```tsx
// libs/frontend/shared/design-system/components/LandingTypography.tsx

// Hero Title
export const HeroTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <Heading level="hero" color="default" className={className}>
    {children}
  </Heading>
)

// Section Title
export const SectionTitle = ({ 
  children, 
  variant = 'default',
  className 
}: { 
  children: React.ReactNode
  variant?: 'default' | 'light' | 'accent'
  className?: string 
}) => {
  const colorMap = {
    default: 'default' as const,
    light: 'white' as const,
    accent: 'primary' as const,
  }
  
  return (
    <Heading level="h2" color={colorMap[variant]} className={className}>
      {children}
    </Heading>
  )
}

// Card Title
export const CardTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <Heading level="h3" color="default" className={cn('font-bold', className)}>
    {children}
  </Heading>
)

// Body Text
export const BodyText = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <Text size="base" color="muted" className={className}>
    {children}
  </Text>
)

// Description Text
export const Description = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <Text size="md" color="muted" className={className}>
    {children}
  </Text>
)

// Testimonial Quote
export const TestimonialQuote = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <Text size="base" color="lighter" italic className={className}>
    "{children}"
  </Text>
)
```

### 6. Button System

```tsx
// libs/frontend/shared/design-system/components/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@codelab/shared-utils'

const buttonVariants = cva(
  'font-body font-bold transition-all inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        ghost: 'bg-transparent hover:bg-white/10',
        outline: 'border-2 bg-transparent',
      },
      size: {
        sm: 'px-6 py-4 text-base sm:px-8 sm:py-5 sm:text-lg',
        md: 'px-8 py-6 text-lg sm:px-10 sm:py-7 sm:text-xl',
        lg: 'px-10 py-8 text-xl sm:px-12 sm:py-10 sm:text-2xl',
        xl: 'px-12 py-10 text-xl sm:px-16 sm:py-12 sm:text-2xl lg:px-20 lg:py-14 lg:text-3xl xl:px-24 xl:py-16 xl:text-4xl',
      },
      rounded: {
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
      colorScheme: {
        default: '',
        white: 'border-white text-white hover:bg-white hover:text-violet-700',
        violet: 'border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white',
      },
    },
    compoundVariants: [
      {
        variant: 'ghost',
        colorScheme: 'white',
        className: 'border-2 border-white text-white hover:!bg-white hover:!text-violet-700',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'lg',
      colorScheme: 'default',
    },
  }
)

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export const Button = ({ 
  variant, 
  size, 
  rounded, 
  colorScheme,
  className, 
  children,
  onClick 
}: ButtonProps) => {
  return (
    <button 
      className={cn(buttonVariants({ variant, size, rounded, colorScheme }), className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### 7. Usage Examples

```tsx
// In your components
import { HeroTitle, SectionTitle, BodyText, Button } from '@codelab/shared-design-system'

export const HeroSection = () => (
  <section>
    <HeroTitle>
      Build Using <span className="text-yellow-400">Material UI</span>
    </HeroTitle>
    
    <BodyText className="mt-4">
      Nest components to construct the DOM tree as you would in code.
    </BodyText>
    
    <Button variant="primary" size="lg" rounded="full">
      Get Started
    </Button>
  </section>
)

export const FeatureSection = () => (
  <section>
    <SectionTitle variant="accent">
      Build with best practices: re-use & compose
    </SectionTitle>
    
    <Description>
      Re-use your knowledge of coding and apply them as you would with code.
    </Description>
  </section>
)
```

### Benefits of This Approach

1. **Type Safety**: Full TypeScript support with autocompletion
2. **Consistency**: Enforces design system rules
3. **Maintainability**: Centralized style definitions
4. **Flexibility**: Can override with className when needed
5. **Performance**: No runtime style generation
6. **Conflict Resolution**: tailwind-merge handles class conflicts properly
7. **Scalability**: Easy to add new variants and combinations

### File Structure

```
libs/frontend/shared/
├── design-system/
│   ├── typography.ts         // CVA variant definitions
│   ├── components/
│   │   ├── Typography.tsx     // Base typography components
│   │   ├── LandingTypography.tsx  // Specific use cases
│   │   ├── Button.tsx        // Button component
│   │   └── index.ts          // Barrel export
│   └── index.ts              // Main export
└── utils/
    └── cn.ts                 // Utility function
```