'use client'

import type { RadioFieldProps } from 'uniforms-antd'

import Radio from 'antd/lib/radio'
import { connectField, filterDOMProps } from 'uniforms'

import type { WithExpressionFieldProps } from './ToggleExpression'

import { ToggleExpressionWrapper } from './ToggleExpression'

type WrappedRadioProps = WithExpressionFieldProps<string, RadioFieldProps>

const WrappedRadio = (props: WrappedRadioProps) => (
  <ToggleExpressionWrapper<string> {...props}>
    <Radio.Group
      {...filterDOMProps(props)}
      disabled={props.disabled}
      name={props.name}
      onChange={(event) => {
        if (!props.readOnly) {
          props.onChange(event.target.value as string | undefined)
        }
      }}
      options={props.options?.map((option) => ({
        ...option,
        label: option.label ?? option.value,
      }))}
      value={props.value ?? ''}
    >
      {props.options?.map((option) => (
        <Radio
          disabled={option.disabled}
          id={`${props.id}-${escape(option.value)}`}
          key={option.key ?? option.value}
          style={{ display: 'block' }}
          value={option.value}
        >
          {option.label ?? option.value}
        </Radio>
      ))}
    </Radio.Group>
  </ToggleExpressionWrapper>
)

export const ExpressionRadioField = connectField(WrappedRadio, {
  kind: 'leaf',
})
