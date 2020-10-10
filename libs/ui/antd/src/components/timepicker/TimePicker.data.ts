import { TimePicker } from './TimePicker.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const timePickerData: NodeReactI<
  TimePicker.Props | TimePicker.RangePickerProps
> = {
  type: 'React.TimePicker',
}
