'use client'

import type { ObjectLike } from '@codelab/shared-abstract-types'
import type { NestFieldProps } from 'uniforms-antd'

import { connectField, filterDOMProps } from 'uniforms'

import type { WithExpressionFieldProps } from './ToggleExpression'

import { ExpressionAutoField } from './ExpressionAutoField'

export type WrappedNestFieldProps = WithExpressionFieldProps<
  ObjectLike,
  NestFieldProps
>

const WrappedNestField = ({
  children,
  error,
  errorMessage,
  fields,
  itemProps,
  label,
  showInlineError,
  ...props
}: WrappedNestFieldProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div {...filterDOMProps(props)}>
    {label && <label>{label}</label>}
    {Boolean(error && props.showInlineError) && <div>{errorMessage}</div>}
    {children ||
      fields.map((field) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <ExpressionAutoField key={field} name={field} {...itemProps} />
      })}
  </div>
)
export const ExpressionNestField = connectField(WrappedNestField)
