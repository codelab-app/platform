import { PropType } from '../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const calendarData: NodeI = {
  type: AtomType.ReactCalendar,
  props: {
    onSelect: {
      __type: [PropType.Eval],
      value: 'return (value) => { console.log(value.format("YYYY-MM-DD")) }',
    },
  },
}
