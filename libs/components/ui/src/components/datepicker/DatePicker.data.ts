import { DatePicker } from './DatePicker.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const datePickerData: NodeDtoI<
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
