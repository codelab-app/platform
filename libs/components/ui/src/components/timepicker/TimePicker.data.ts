import { ReactNodeI } from '@codelab/shared/interface/node'
import { TimePicker } from './TimePicker.types'

export const timePickerData: ReactNodeI<
  TimePicker.Props | TimePicker.RangePickerProps
> = {
  type: 'TimePicker',
  nodeType: 'React',
}
