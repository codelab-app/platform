import { TimePicker } from './TimePicker.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const timePickerData: NodeDtoI<
  TimePicker.Props | TimePicker.RangePickerProps
> = {
  type: 'React.TimePicker',
}
