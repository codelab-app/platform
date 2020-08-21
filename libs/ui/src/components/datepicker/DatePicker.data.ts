import { ReactNodeI } from '@codelab/graph'
import {
  CommonPickerProps,
  DatePickerProps,
  YearPickerProps,
  QuarterPickerProps,
  MonthPickerProps,
  WeekPickerProps,
  RangePickerProps,
} from './DatePicker.types'

export const datePickerData: ReactNodeI<
  | CommonPickerProps
  | DatePickerProps
  | YearPickerProps
  | QuarterPickerProps
  | MonthPickerProps
  | WeekPickerProps
  | RangePickerProps
> = {
  nodeType: 'React',
  type: 'DatePicker',
  props: {
    picker: 'date',
  },
}
