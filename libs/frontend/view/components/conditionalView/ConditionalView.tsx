import React from 'react'

export type ConditionalViewProps = React.PropsWithChildren<{
  condition: boolean
  falseView?: React.ReactElement
}>

export const ConditionalView = ({
  condition,
  children,
  falseView,
}: ConditionalViewProps) => (condition ? <>{children}</> : falseView ?? null)
