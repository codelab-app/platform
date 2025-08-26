'use client'

import type { ObjectLike } from '@codelab/shared-abstract-types'
import type { ReactElement } from 'react'

import { isArray } from 'radash'
import { Children, cloneElement, isValidElement } from 'react'
import { connectField } from 'uniforms'
import { ListAddField, type ListFieldProps, ListItemField } from 'uniforms-antd'

import type { WithExpressionFieldProps } from './ToggleExpression'

import { ExpressionAutoField } from './ExpressionAutoField'
import { ToggleExpressionWrapper } from './ToggleExpression'

export type WrappedListFieldProps = WithExpressionFieldProps<
  Array<unknown>,
  ListFieldProps
>

const defaultStyle = {
  marginBottom: '5px',
  marginTop: '5px',
  padding: '10px',
}

const errorStyle = { borderColor: 'rgb(255, 85, 0)' }

const WrappedListField = (props: WrappedListFieldProps) => {
  const {
    children = (
      <ListItemField name="$">
        <ExpressionAutoField name="" />
      </ListItemField>
    ),
    error,
    errorMessage,
    itemProps,
    labelCol,
    showInlineError,
    style = defaultStyle,
    value,
    wrapperCol,
  } = props

  const wrapperStyle = error ? { ...errorStyle, ...style } : style

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ToggleExpressionWrapper<Array<unknown>> {...props} style={wrapperStyle}>
      {Boolean(error && showInlineError) && <div>{errorMessage}</div>}
      {isArray(value) &&
        value.map((item, itemIndex) => {
          return Children.map(children, (child, childIndex) => {
            return isValidElement<{ name?: string }>(child)
              ? cloneElement(
                  child as ReactElement<{
                    name?: string
                    labelCol?: ObjectLike
                    wrapperCol?: ObjectLike
                  }>,
                  {
                    key: `${itemIndex}-${childIndex}`,
                    labelCol,
                    name: child.props.name?.replace('$', String(itemIndex)),
                    wrapperCol,
                    ...itemProps,
                  },
                )
              : child
          })
        })}
      <ListAddField name="$" />
    </ToggleExpressionWrapper>
  )
}

export const ExpressionListField = connectField(WrappedListField)
