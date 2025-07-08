import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { ReactElement } from 'react'
import type { ListFieldProps } from 'uniforms-antd'

import { Children, cloneElement, isValidElement } from 'react'
import { connectField } from 'uniforms'

import type { WithExpressionFieldProps } from './ToggleExpression'

import { ToggleExpressionWrapper } from './ToggleExpression'

export type WrappedListFieldProps = WithExpressionFieldProps<
  Array<unknown>,
  ListFieldProps
>

const WrappedListField = (props: WrappedListFieldProps) => (
  <ToggleExpressionWrapper<Array<unknown>> {...props}>
    {Boolean(props.error && props.showInlineError) && (
      <div>{props.errorMessage}</div>
    )}
    {props.value?.map((item, itemIndex) =>
      Children.map(props.children, (child, childIndex) =>
        isValidElement<ObjectLike>(child)
          ? cloneElement(child as ReactElement<ObjectLike>, {
              key: `${itemIndex}-${childIndex}`,
              labelCol: props.labelCol,
              name: child.props.name?.replace('$', String(itemIndex)),
              wrapperCol: props.wrapperCol,
              ...(props.itemProps ?? []),
            })
          : child,
      ),
    )}
  </ToggleExpressionWrapper>
)

export const ExpressionListField = connectField(WrappedListField)
