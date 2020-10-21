import { Calendar } from './Calendar.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const calendarData: NodeReactI<Calendar.Props> = {
  type: NodeType.React_Calendar,
  props: {
    onSelect: {
      __type: ['Eval'],
      value: 'return (value) => { console.log(value.format("YYYY-MM-DD")) }',
    },
  },
}
