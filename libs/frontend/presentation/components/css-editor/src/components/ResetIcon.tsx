import type { ReactNode } from 'react'
import React from 'react'
import { Reset } from './Reset'

interface ResetIconProps {
  canReset?: boolean
  icon: ReactNode
  onReset?(): unknown
}

export const ResetIcon = ({
  canReset,
  icon,
  onReset,
}: ResetIconProps): ReactNode => {
  if (!canReset) {
    return icon
  }

  return (
    <Reset onReset={onReset}>
      <div className="bg-sky-100 hover:bg-sky-200">{icon}</div>
    </Reset>
  )
}
