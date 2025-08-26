'use client'

import type { ObjectLike } from '@codelab/shared-abstract-types'

import { createBridge } from '@codelab/frontend-shared-utils'
import { set } from 'radash'
import { connectField, joinName, useForm } from 'uniforms'

import type { WithExpressionFieldProps } from './ToggleExpression'

import { useFormBridge } from '../components'
import { ExpressionAutoField } from './ExpressionAutoField'
import { ToggleExpressionWrapper } from './ToggleExpression'

type WrappedUnionFieldProps = WithExpressionFieldProps<
  ObjectLike,
  { discriminator: { propertyName: string }; oneOf: Array<ObjectLike> }
>

const WrappedUnionField = (props: WrappedUnionFieldProps) => {
  const discriminator = props.discriminator.propertyName
  const form = useForm<ObjectLike>()

  const { schema, setBridge } = useFormBridge()

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ToggleExpressionWrapper<ObjectLike> {...props}>
      {props.fields.map((field) => (
        <ExpressionAutoField
          key={field}
          name={field}
          onChange={(value: unknown) => {
            if (field === discriminator) {
              // replace array.index with array[index]
              const path = joinName(props.name, field).replace(
                /\.(\d+)\./g,
                '[$1].',
              )

              const model = set(form.model, path, value)
              const bridge = createBridge(schema, model)
              setBridge(bridge)
              form.onChange(props.name, bridge?.getInitialValue(props.name))
            } else {
              form.onChange(joinName(props.name, field), value)
            }
          }}
        />
      ))}
    </ToggleExpressionWrapper>
  )
}

export const ExpressionUnionField = connectField(WrappedUnionField)
