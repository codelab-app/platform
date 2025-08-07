import type { VariantProps } from 'class-variance-authority'
import type { ElementType, ReactNode } from 'react'

import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const textVariants = cva('', {
  variants: {
    variant: {
      // Hero sections
      'hero-title':
        'text-center text-2xl font-extrabold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
      'hero-subtitle':
        'text-sm font-light sm:text-base sm:leading-7 md:text-lg lg:text-xl xl:text-2xl',
      'hero-description': '',

      // Headings
      h1: 'text-xl !font-extrabold sm:text-3xl lg:text-4xl xl:!text-5xl',
      h2: '!text-lg font-black sm:!text-2xl md:!text-3xl lg:!text-4xl xl:!text-5xl',
      h3: '',
      h4: '',
      h5: '',
      h6: '',

      // Body text
      body: '',
      'body-large': '',
      'body-small': '',

      // Special text
      description: '',
      caption: '',
      lead: '',
      quote: '',

      // Card elements
      'card-title': '',
      'card-description': '',

      // Navigation
      'nav-link': '',

      // Footer
      footer: '',

      // Buttons (text only)
      'button-text': '',
      'button-large': '',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    color: {
      default: '',
      white: 'text-white',
      black: 'text-black',
      primary: 'text-violet-600',
      muted: 'text-slate-600',
      light: 'text-slate-400',
      lighter: 'text-slate-300',
      neutral: 'text-neutral-300',
      yellow: 'text-yellow-400',
    },
    italic: {
      true: 'italic',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'body',
    align: 'left',
    italic: false,
  },
})

interface TextProps extends VariantProps<typeof textVariants> {
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'p' | 'span'
  children: ReactNode
  className?: string
  onClick?(): void
}

export const CuiText = ({
  align,
  as,
  children,
  className,
  color,
  italic,
  onClick,
  variant = 'body',
  weight,
  ...props
}: TextProps) => {
  // Auto-select semantic HTML tag based on variant if not specified
  const Component =
    as ||
    ({
      // Hero
      'hero-title': 'h1',
      'hero-subtitle': 'p',
      'hero-description': 'p',
      // Headings
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      // Body
      body: 'p',
      'body-large': 'p',
      'body-small': 'p',
      // Special
      description: 'p',
      caption: 'span',
      lead: 'p',
      quote: 'p',
      // Card
      'card-title': 'h3',
      'card-description': 'p',
      // Navigation
      'nav-link': 'span',
      // Footer
      footer: 'p',
      // Button
      'button-text': 'span',
      'button-large': 'span',
    }[variant || 'body'] as ElementType)

  return (
    <Component
      className={twMerge(
        textVariants({ variant, align, weight, color, italic }),
        className,
      )}
      onClick={onClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Component>
  )
}
