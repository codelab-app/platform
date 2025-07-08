import type { SelectFieldProps } from 'uniforms-antd'

import Select from 'antd/lib/select'
import { connectField, filterDOMProps } from 'uniforms'

import type { WithExpressionFieldProps } from './ToggleExpression'

import { ToggleExpressionWrapper } from './ToggleExpression'

type WrappedSelectProps = WithExpressionFieldProps<
  string | Array<string>,
  SelectFieldProps
>

const WrappedSelect = (props: WrappedSelectProps) => {
  return (
    <ToggleExpressionWrapper<string | Array<string>> {...props}>
      <Select<string | Array<string>>
        allowClear={!props.required}
        id={props.id}
        mode={props.fieldType === Array ? 'multiple' : undefined}
        onChange={(value: string | Array<string>) => {
          if (!props.readOnly) {
            props.onChange(value)
          }
        }}
        value={props.value}
        {...filterDOMProps(props)}
      />
    </ToggleExpressionWrapper>
  )
}

export const ExpressionSelectField = connectField(WrappedSelect, {
  kind: 'leaf',
})
