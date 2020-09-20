import { TimePicker } from './TimePicker.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const timePickerData: NodeReactDtoI<
  TimePicker.Props | TimePicker.RangePickerProps
> = {
  type: 'React.TimePicker',
}
