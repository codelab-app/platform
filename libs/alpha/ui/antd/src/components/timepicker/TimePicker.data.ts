import { TimePicker } from './TimePicker.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const timePickerData: NodeReactI<
  TimePicker.Props | TimePicker.RangePickerProps
> = {
  type: NodeType.React_TimePicker,
}
