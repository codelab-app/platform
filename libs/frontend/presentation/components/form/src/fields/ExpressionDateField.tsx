import type { DateFieldProps } from 'uniforms-antd'

import DatePicker from 'antd/lib/date-picker'
import { connectField, filterDOMProps } from 'uniforms'

import type { WithExpressionFieldProps } from './ToggleExpression'

import { ToggleExpressionWrapper } from './ToggleExpression'

export type DatePickerProps = WithExpressionFieldProps<Date, DateFieldProps>

const WrappedDatePicker = (props: DatePickerProps) => {
  return (
    <ToggleExpressionWrapper<Date> {...props}>
      <DatePicker<Date>
        disabled={props.disabled}
        inputReadOnly={props.readOnly}
        name={props.name}
        onChange={(value) => {
          if (!props.readOnly) {
            props.onChange(value)
          }
        }}
        placeholder={props.placeholder}
        // @ts-expect-error: `DatePicker` is an intersection.
        ref={props.inputRef}
        showTime={props.showTime}
        style={props.style}
        value={props.value && new Date(props.value)}
        {...filterDOMProps(props)}
      />
    </ToggleExpressionWrapper>
  )
}

export const ExpressionDateField = connectField(WrappedDatePicker, {
  kind: 'leaf',
})
