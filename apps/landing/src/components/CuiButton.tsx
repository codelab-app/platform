import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type { ButtonProps } from 'antd'
import type { VariantProps } from 'class-variance-authority'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import { cva } from 'class-variance-authority'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

const buttonVariants = cva('', {
  variants: {
    variant: {
      // Hero buttons
      heroPrimary: 'bg-blue-500 text-white hover:bg-blue-600',
      heroSecondary:
        'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50',

      // Primary buttons
      primary: '',
      secondary: '',

      // Ghost buttons
      ghost: '',
      ghostWhite: '',

      // Outline buttons
      outline: '',

      // Text buttons
      text: '',

      // CTA buttons
      cta: '',
      ctaLarge: '',
    },
    size: {
      small: 'h-8 px-3 text-sm',
      medium: 'h-10 px-4 text-base',
      large: 'h-12 px-6 text-lg',
      xl: 'h-14 px-8 text-xl',

      // Custom sizes for specific use cases
      hero: 'h-10 w-36 text-sm sm:h-12 sm:w-48 sm:text-lg md:h-14',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
    rounded: 'md',
  },
})

// Extract specific props we want from ButtonProps, excluding the index signature
type ButtonPropsSubset = Pick<
  ButtonProps,
  | 'block'
  | 'children'
  | 'className'
  | 'danger'
  | 'disabled'
  | 'ghost'
  | 'htmlType'
  | 'loading'
  | 'onClick'
  | 'shape'
  | 'style'
>

interface CuiButtonProps
  extends ButtonPropsSubset,
    VariantProps<typeof buttonVariants> {
  'data-fancybox'?: string
  'data-src'?: string
  href?: string
  icon?: IconDefinition
  iconClassName?: string
  iconPosition?: 'left' | 'right'
  type?: ButtonProps['type']
}

export const CuiButton = ({
  children,
  className,
  'data-fancybox': dataFancybox,
  'data-src': dataSrc,
  disabled,
  ghost,
  href,
  htmlType,
  icon,
  iconClassName,
  iconPosition = 'left',
  loading,
  onClick,
  rounded,
  size,
  type,
  variant,
}: CuiButtonProps) => {
  // Handle ghost prop for backward compatibility
  const finalVariant = ghost ? 'ghost' : variant

  // Render icon - FontAwesome IconDefinition
  const renderIcon = () => {
    if (!icon) {
      return null
    }

    // Default icon sizing based on button size
    const defaultIconClass =
      size === 'hero'
        ? 'mr-2 text-sm sm:text-lg md:text-xl'
        : size === 'large' || size === 'xl'
        ? 'mr-2 text-base'
        : 'mr-2 text-sm'

    return (
      <FontAwesomeIcon
        className={iconClassName || defaultIconClass}
        icon={icon}
      />
    )
  }

  const buttonClasses = twMerge(
    buttonVariants({ variant: finalVariant, size, rounded }),
    className,
  )

  // Map our size prop to Ant Design size
  const antSize =
    size === 'hero' || size === 'xl'
      ? 'large'
      : size === 'small'
      ? 'small'
      : 'middle'

  // If href is provided, wrap Button with Link
  if (href) {
    // Use Next.js Link for internal navigation
    if (href.startsWith('/') || href.startsWith('#')) {
      return (
        <Link href={href}>
          <Button
            className={buttonClasses}
            data-fancybox={dataFancybox}
            data-src={dataSrc}
            disabled={disabled}
            ghost={ghost}
            htmlType={htmlType}
            icon={icon && iconPosition === 'left' ? renderIcon() : undefined}
            loading={loading}
            onClick={onClick}
            size={antSize}
            type={type}
          >
            {children}
            {icon && iconPosition === 'right' && renderIcon()}
          </Button>
        </Link>
      )
    }

    // Use regular anchor for external links
    return (
      <Button
        className={buttonClasses}
        data-fancybox={dataFancybox}
        data-src={dataSrc}
        disabled={disabled}
        ghost={ghost}
        href={href}
        htmlType={htmlType}
        icon={icon && iconPosition === 'left' ? renderIcon() : undefined}
        loading={loading}
        onClick={onClick}
        size={antSize}
        type={type}
      >
        {children}
        {icon && iconPosition === 'right' && renderIcon()}
      </Button>
    )
  }

  return (
    <Button
      className={buttonClasses}
      data-fancybox={dataFancybox}
      data-src={dataSrc}
      disabled={disabled}
      ghost={ghost}
      htmlType={htmlType}
      icon={icon && iconPosition === 'left' ? renderIcon() : undefined}
      loading={loading}
      onClick={onClick}
      size={antSize}
      type={type}
    >
      {children}
      {icon && iconPosition === 'right' && renderIcon()}
    </Button>
  )
}
