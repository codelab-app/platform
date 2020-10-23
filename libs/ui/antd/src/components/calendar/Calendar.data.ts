import { Calendar } from './Calendar.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'

export const calendarData: NodeReactI<Calendar.Props> = {
  type: NodeType.React_Calendar,
  props: {
    onSelect: {
      __type: [PropType.Eval],
      value: 'return (value) => { console.log(value.format("YYYY-MM-DD")) }',
    },
  },
}
