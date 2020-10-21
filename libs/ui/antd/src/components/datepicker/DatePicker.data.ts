import { DatePicker } from './DatePicker.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const datePickerData: NodeReactI<
  | DatePicker.CommonPickerProps
  | DatePicker.DatePickerProps
  | DatePicker.YearPickerProps
  | DatePicker.QuarterPickerProps
  | DatePicker.MonthPickerProps
  | DatePicker.WeekPickerProps
  | DatePicker.RangePickerProps
> = {
  type: NodeType.React_DatePicker,
  props: {
    picker: 'date',
  },
}
