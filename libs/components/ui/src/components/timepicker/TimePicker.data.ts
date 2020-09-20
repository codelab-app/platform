import { TimePicker } from './TimePicker.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const timePickerData: NodeDtoReactI<
  TimePicker.Props | TimePicker.RangePickerProps
> = {
  type: 'React.TimePicker',
}
