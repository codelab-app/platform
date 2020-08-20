import { ReactNodeI } from '@codelab/graph'
import { CalendarProps } from './Calendar.types'

export const calendarData: ReactNodeI<CalendarProps> = {
  type: 'Calendar',
  nodeType: 'React',
  props: {
    onSelect: {
      eval: true,
      value: 'return (value) => { console.log(value.format("YYYY-MM-DD")) }',
    },
  },
}
