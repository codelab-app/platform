import type { TextFieldProps } from 'uniforms-antd'

import Input from 'antd/lib/input'
import { connectField, filterDOMProps } from 'uniforms'

import type { WithExpressionFieldProps } from './ToggleExpression'

import { ToggleExpressionWrapper } from './ToggleExpression'

export type InputProps = WithExpressionFieldProps<string, TextFieldProps>

const WrappedInput = (props: InputProps) => (
  <ToggleExpressionWrapper<string> {...props}>
    <Input
      disabled={props.disabled}
      name={props.name}
      onChange={(event) => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={props.inputRef}
      type={props.type ?? 'text'}
      value={props.value ?? ''}
      {...filterDOMProps(props)}
    />
  </ToggleExpressionWrapper>
)

export const ExpressionTextField = connectField(WrappedInput, {
  kind: 'leaf',
})
