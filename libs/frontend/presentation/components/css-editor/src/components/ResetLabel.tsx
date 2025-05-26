'use client'

import { Reset } from './Reset'

interface ResetLabelProps {
  canReset?: boolean
  label: string
  onReset?(): unknown
}

export const ResetLabel = ({ canReset, label, onReset }: ResetLabelProps) => {
  if (!canReset) {
    return (
      <span className="whitespace-nowrap rounded-[2px] p-[2px] text-[11px]">
        {label}
      </span>
    )
  }

  return (
    <Reset onReset={onReset}>
      <span
        className={`
          whitespace-nowrap rounded-[2px] bg-sky-100
          p-[2px] text-[11px]
          hover:bg-sky-200
        `}
      >
        {label}
      </span>
    </Reset>
  )
}
