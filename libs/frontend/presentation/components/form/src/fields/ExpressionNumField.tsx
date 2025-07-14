'use client'

import type { NumFieldProps } from 'uniforms-antd'

import InputNumber from 'antd/lib/input-number'
import { connectField, filterDOMProps } from 'uniforms'

import type { WithExpressionFieldProps } from './ToggleExpression'

import { ToggleExpressionWrapper } from './ToggleExpression'

export type WrappedInputNumberProps = WithExpressionFieldProps<
  number,
  NumFieldProps
>

const WrappedInputNumber = (props: WrappedInputNumberProps) => (
  <ToggleExpressionWrapper<number> {...props}>
    <InputNumber
      disabled={props.disabled}
      max={props.max}
      min={props.min}
      name={props.name}
      onChange={(event) => {
        const parse = props.decimal ? parseFloat : parseInt
        const value = parse(String(event))

        props.onChange(isNaN(value) ? undefined : value)
      }}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={props.inputRef}
      step={props.step || (props.decimal ? 0.01 : 1)}
      style={{ width: '100%' }}
      type="number"
      value={props.value}
      {...filterDOMProps(props)}
    />
  </ToggleExpressionWrapper>
)

export const ExpressionNumField = connectField(WrappedInputNumber, {
  kind: 'leaf',
})
