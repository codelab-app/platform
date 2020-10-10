import { DatePicker } from './DatePicker.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const datePickerData: NodeReactI<
  | DatePicker.CommonPickerProps
  | DatePicker.DatePickerProps
  | DatePicker.YearPickerProps
  | DatePicker.QuarterPickerProps
  | DatePicker.MonthPickerProps
  | DatePicker.WeekPickerProps
  | DatePicker.RangePickerProps
> = {
  type: 'React.DatePicker',
  props: {
    picker: 'date',
  },
}
