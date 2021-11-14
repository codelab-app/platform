import React from 'react'

export type ConditionalViewProps = {
  condition: boolean
  children?: React.ReactNode
}

export const ConditionalView = ({
  condition,
  children,
}: ConditionalViewProps) => (condition ? <>{children}</> : null)
