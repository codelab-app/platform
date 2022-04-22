import React from 'react'

export interface DisplayIfProps {
  condition: boolean
  fallback?: React.ReactNode
  children: React.ReactNode
}

export const DisplayIf = ({
  condition,
  children,
  fallback,
}: DisplayIfProps) => {
  return <>{condition ? <>{children}</> : fallback ?? <></>}</>
}
