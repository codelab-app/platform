import { Calendar } from './Calendar.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const calendarData: NodeReactI<Calendar.Props> = {
  type: 'React.Calendar',
  props: {
    onSelect: {
      __type: ['Eval'],
      value: 'return (value) => { console.log(value.format("YYYY-MM-DD")) }',
    },
  },
}
