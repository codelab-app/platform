import React from 'react'

export type ConditionalViewProps = {
  condition: boolean
  children?: React.ReactNode
  falseView?: React.ReactElement
}

export const ConditionalView = ({
  condition,
  children,
  falseView,
}: ConditionalViewProps) => (condition ? <>{children}</> : falseView ?? null)
