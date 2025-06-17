import type { ReactNode } from 'react'

import { hasExpression } from '@codelab/shared-infra-eval'
import { useEffect, useState } from 'react'

import type { FieldWrapperProps } from './FieldWrapper'

import { FieldWrapper } from './FieldWrapper'

interface ToggleExpressionFieldV2Props<T>
  extends Omit<FieldWrapperProps, 'isExpression' | 'toggle'> {
  ExpressionField: ReactNode
  StaticField: ReactNode
  value: string | T
  fromExpression?(value: string): T
  onChange?(value: string | T): void
  toExpression?(value: T): string
}

export const ToggleExpressionFieldV2 = <T,>({
  children,
  ExpressionField,
  fromExpression,
  onChange,
  StaticField,
  toExpression,
  value,
  ...props
}: ToggleExpressionFieldV2Props<T>) => {
  const [isExpression, setIsExpression] = useState<boolean>(false)

  useEffect(() => {
    setIsExpression(hasExpression(value))
  }, [])

  useEffect(() => {
    const newExpressionValue =
      isExpression && toExpression ? toExpression(value as T) : value

    const newStaticValue =
      !isExpression && fromExpression ? fromExpression(value as string) : value

    onChange?.(isExpression ? newExpressionValue : newStaticValue)
  }, [isExpression])

  return (
    <FieldWrapper
      {...props}
      isExpression={isExpression}
      toggle={() => setIsExpression(!isExpression)}
    >
      {isExpression ? ExpressionField : StaticField}
    </FieldWrapper>
  )
}
