import { ReactNodeI } from '@codelab/graph'
import { TimePickerProps, RangePickerProps } from './TimePicker.types'

export const timePickerData: ReactNodeI<TimePickerProps | RangePickerProps> = {
  type: 'TimePicker',
  nodeType: 'React',
}
