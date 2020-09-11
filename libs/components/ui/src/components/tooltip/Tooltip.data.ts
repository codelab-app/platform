import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { Tooltip } from './Tooltip.types'

export const tooltipData: ReactNodeI<Tooltip.Props | Text.Props> = {
  type: 'Tooltip',
  nodeType: 'React',
  props: {
    title: 'prompt text',
  },
  children: [
    {
      type: 'Html.span',
      nodeType: 'React',
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: { value: 'Tooltip will show on mouse enter.' },
        },
      ],
    },
  ],
}
