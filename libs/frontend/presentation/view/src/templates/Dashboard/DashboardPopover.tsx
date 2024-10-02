import type { ReactNode } from 'react'

/**
 * Layout is static, so we can't put this popover in layout, need to wrap it around the slot
 */
export const DashboardPopover = ({ children }: { children: ReactNode }) => {
  return <div className="absolute inset-y-0 z-10 flex w-80">{children}</div>
}
