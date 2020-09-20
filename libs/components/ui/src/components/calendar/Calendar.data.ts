import { Calendar } from './Calendar.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const calendarData: NodeDtoReactI<Calendar.Props> = {
  type: 'React.Calendar',
  props: {
    onSelect: {
      eval: true,
      value: 'return (value) => { console.log(value.format("YYYY-MM-DD")) }',
    },
  },
}
