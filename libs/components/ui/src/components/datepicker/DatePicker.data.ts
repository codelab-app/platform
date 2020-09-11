import { ReactNodeI } from '@codelab/shared/interface/node'
import { DatePicker } from './DatePicker.types'

export const datePickerData: ReactNodeI<
  | DatePicker.CommonPickerProps
  | DatePicker.DatePickerProps
  | DatePicker.YearPickerProps
  | DatePicker.QuarterPickerProps
  | DatePicker.MonthPickerProps
  | DatePicker.WeekPickerProps
  | DatePicker.RangePickerProps
> = {
  nodeType: 'React',
  type: 'DatePicker',
  props: {
    picker: 'date',
  },
}
