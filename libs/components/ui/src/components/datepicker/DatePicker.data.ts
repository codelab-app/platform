import { DatePicker } from './DatePicker.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const datePickerData: NodeDtoReactI<
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
