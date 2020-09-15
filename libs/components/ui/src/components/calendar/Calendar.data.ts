import { Calendar } from './Calendar.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const calendarData: NodeDtoI<Calendar.Props> = {
  type: 'React.Calendar',
  props: {
    onSelect: {
      eval: true,
      value: 'return (value) => { console.log(value.format("YYYY-MM-DD")) }',
    },
  },
}
