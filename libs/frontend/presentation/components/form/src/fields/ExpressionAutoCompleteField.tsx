'use client'

import type { AutoCompleteProps } from 'antd/lib/auto-complete'

import AutoComplete from 'antd/lib/auto-complete'
import { connectField, filterDOMProps } from 'uniforms'

import type { WithExpressionFieldProps } from './ToggleExpression'

import { ToggleExpressionWrapper } from './ToggleExpression'

type WrappedAutoCompleteProps = WithExpressionFieldProps<
  string | Array<string>,
  AutoCompleteProps<string | Array<string>>
>

const WrappedAutoComplete = (props: WrappedAutoCompleteProps) => (
  <ToggleExpressionWrapper<string | Array<string>> {...props}>
    <AutoComplete<string | Array<string>>
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

export const ExpressionAutoCompleteField = connectField(WrappedAutoComplete, {
  kind: 'leaf',
})
