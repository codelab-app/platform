import type { CSSProperties, ReactNode } from 'react'

import clsx from 'clsx'
import React from 'react'

export interface SpaceProps {
  align?: 'baseline' | 'center' | 'end' | 'start'
  children?: ReactNode
  className?: string
  direction?: 'horizontal' | 'vertical'
  size?: number | 'large' | 'middle' | 'small'
  split?: ReactNode
  style?: CSSProperties
  wrap?: boolean
}

const sizeMap = {
  small: 'gap-2',
  middle: 'gap-4',
  large: 'gap-6',
} as const

const alignMap = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
} as const

/**
 * Custom Space component that replaces Ant Design's Space
 *
 * Why this component exists:
 * Ant Design's Space component uses CSS-in-JS with runtime style generation.
 * During SSR (Server-Side Rendering) in Next.js App Router, these dynamically
 * generated styles are not properly extracted and included in the initial HTML.
 * This causes a Flash of Unstyled Content (FOUC) where elements briefly appear
 * unstyled (e.g., buttons stacking vertically) before the JavaScript loads and
 * applies the proper flexbox styles.
 *
 * Our solution uses Tailwind CSS classes which are statically generated and
 * included in the initial HTML payload, eliminating the FOUC completely.
 * This ensures consistent rendering from the first paint.
 */
export const Space: React.FC<SpaceProps> = ({
  align = 'center',
  children,
  className,
  direction = 'horizontal',
  size = 'middle',
  split,
  style,
  wrap = false,
}) => {
  // Convert children to array for processing
  const childrenArray = React.Children.toArray(children).filter(
    (child) => child !== null && child !== undefined,
  )

  // Handle custom numeric size
  const gapClass = typeof size === 'number' ? undefined : sizeMap[size]
  const customStyle: CSSProperties = {
    ...style,
    ...(typeof size === 'number' ? { gap: `${size}px` } : {}),
  }

  // Build class names
  const classes = clsx(
    'inline-flex',
    direction === 'horizontal' ? 'flex-row' : 'flex-col',
    alignMap[align],
    gapClass,
    wrap && 'flex-wrap',
    className,
  )

  // If split is provided, insert it between children
  if (split) {
    const itemsWithSplit: Array<ReactNode> = []

    childrenArray.forEach((child, index) => {
      itemsWithSplit.push(
        <div className="flex-shrink-0" key={`item-${index}`}>
          {child}
        </div>,
      )

      if (index < childrenArray.length - 1) {
        itemsWithSplit.push(
          <div
            className={clsx(
              'flex-shrink-0',
              direction === 'horizontal' ? 'self-stretch' : 'self-auto',
            )}
            key={`split-${index}`}
          >
            {split}
          </div>,
        )
      }
    })

    return (
      <div className={classes} style={customStyle}>
        {itemsWithSplit}
      </div>
    )
  }

  // Wrap children in divs to ensure proper spacing
  const wrappedChildren = childrenArray.map((child, index) => (
    <div className="flex-shrink-0" key={index}>
      {child}
    </div>
  ))

  return (
    <div className={classes} style={customStyle}>
      {wrappedChildren}
    </div>
  )
}

Space.displayName = 'Space'
