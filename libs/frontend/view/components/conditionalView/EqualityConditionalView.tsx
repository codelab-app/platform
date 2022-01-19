import React from 'react'
import { ConditionalView } from './ConditionalView'

export type EqualityConditionalViewProps<T> = {
  expectedValue: T
  value: T
  children?: React.ReactNode
}

export const EqualityConditionalView = <T extends string>({
  expectedValue,
  value,
  children,
}: EqualityConditionalViewProps<T>) => (
  <ConditionalView children={children} condition={expectedValue === value} />
)
