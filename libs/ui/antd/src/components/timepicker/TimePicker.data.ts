import { TimePicker } from './TimePicker.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const timePickerData: NodeReactI<
  TimePicker.Props | TimePicker.RangePickerProps
> = {
  type: NodeType.React_TimePicker,
}
