'use client'

import type { Maybe, ObjectLike } from '@codelab/shared-abstract-types'
import type { FieldProps } from 'uniforms'

import { CodeMirrorEditor } from '@codelab/frontend-presentation-components-codemirror'
import { ICodeMirrorLanguage } from '@codelab/shared-abstract-core'
import { hasExpression } from '@codelab/shared-infra-eval'
import { useEffect, useState } from 'react'

import type { WrapperProps } from './FieldWrapper'

import { FieldWrapper } from './FieldWrapper'

export interface onToggleProps<Value> {
  expressionValue: string
  isExpression: boolean
  staticValue?: Value
  onChange(value?: string | Value): void
}

export type WithExpressionFieldProps<Value, T> = ToggleExpressionProps<Value> &
  FieldProps<
    Value,
    T,
    {
      field?: {
        default?: Value
      }
    }
  >

export interface ToggleExpressionProps<Value> extends ObjectLike, WrapperProps {
  defaultExpression?: string
  field: { default?: Value }
  value?: string | Value
  onChange(value?: string | Value): void
}

export const ToggleExpressionWrapper = <Value,>({
  children,
  defaultExpression,
  onChange,
  value,
  ...props
}: ToggleExpressionProps<Value>) => {
  const [isExpression, setIsExpression] = useState<boolean>(
    hasExpression(value),
  )

  const [expressionValue, setExpressionValue] = useState<string>(
    isExpression ? (value as string) : defaultExpression ?? '{{}}',
  )

  const [staticValue, setStaticValue] = useState<Maybe<Value>>(
    !isExpression ? (value as Value) : props.field.default,
  )

  useEffect(() => {
    if (isExpression) {
      setExpressionValue(value as string)
    } else {
      setStaticValue(value as Value)
    }
  }, [value])

  useEffect(() => {
    onChange(isExpression ? expressionValue : staticValue)
  }, [isExpression])

  return (
    <FieldWrapper
      isExpression={isExpression}
      toggle={() => setIsExpression(!isExpression)}
      {...props}
    >
      {isExpression ? (
        <CodeMirrorEditor
          language={ICodeMirrorLanguage.Typescript}
          onChange={(expression) => onChange(expression)}
          value={expressionValue}
        />
      ) : (
        children
      )}
    </FieldWrapper>
  )
}
