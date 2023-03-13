import React from 'react'

export interface DisplayIfProps {
  condition: boolean
  fallback?: React.ReactNode
  children: React.ReactNode
}

export const DisplayIf = ({
  children,
  condition,
  fallback,
}: DisplayIfProps) => {
  return <>{condition ? <>{children}</> : fallback ?? <></>}</>
}
