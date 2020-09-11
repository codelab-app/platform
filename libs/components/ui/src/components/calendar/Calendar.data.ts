import { ReactNodeI } from '@codelab/shared/interface/node'
import { Calendar } from './Calendar.types'

export const calendarData: ReactNodeI<Calendar.Props> = {
  type: 'Calendar',
  nodeType: 'React',
  props: {
    onSelect: {
      eval: true,
      value: 'return (value) => { console.log(value.format("YYYY-MM-DD")) }',
    },
  },
}
