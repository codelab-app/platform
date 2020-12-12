import { Calendar } from './Calendar.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

export const calendarData: NodeReactI<Calendar.Props> = {
  type: NodeType.React_Calendar,
  props: {
    onSelect: {
      __type: [PropType.Eval],
      value: 'return (value) => { console.log(value.format("YYYY-MM-DD")) }',
    },
  },
}
