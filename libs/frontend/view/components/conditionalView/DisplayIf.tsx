import React from 'react'

export interface DisplayIfProps {
  children: React.ReactNode
  condition: boolean
  fallback?: React.ReactNode
}

export const DisplayIf = ({
  children,
  condition,
  fallback,
}: DisplayIfProps) => {
  return <>{condition ? <>{children}</> : fallback ?? <></>}</>
}
