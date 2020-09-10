import { ReactNodeI } from '@codelab/shared/interface/node'
import { TimePickerProps, RangePickerProps } from './TimePicker.types'

export const timePickerData: ReactNodeI<TimePickerProps | RangePickerProps> = {
  type: 'TimePicker',
  nodeType: 'React',
}
