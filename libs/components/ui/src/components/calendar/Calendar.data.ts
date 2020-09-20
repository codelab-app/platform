import { Calendar } from './Calendar.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const calendarData: NodeReactDtoI<Calendar.Props> = {
  type: 'React.Calendar',
  props: {
    onSelect: {
      eval: true,
      value: 'return (value) => { console.log(value.format("YYYY-MM-DD")) }',
    },
  },
}
