import classNames from 'classnames'

interface HamburgerIconProps {
  isOpen: boolean
  className?: string
}

export const HamburgerIcon = ({ isOpen, className }: HamburgerIconProps) => {
  return (
    <div className={classNames('relative w-6 h-5', className)}>
      <span
        className={classNames(
          'absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ease-in-out',
          isOpen ? 'top-2.5 rotate-45' : 'top-0',
        )}
      />
      <span
        className={classNames(
          'absolute left-0 top-2.5 w-full h-0.5 bg-current transition-all duration-300 ease-in-out',
          isOpen && 'opacity-0',
        )}
      />
      <span
        className={classNames(
          'absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ease-in-out',
          isOpen ? 'top-2.5 -rotate-45' : 'top-5',
        )}
      />
    </div>
  )
}