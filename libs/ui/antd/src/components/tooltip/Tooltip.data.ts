import { Text } from '../text'
import { Tooltip } from './Tooltip.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const tooltipData: NodeReactI<Tooltip.Props | Text.Props> = {
  type: 'React.Tooltip',
  props: {
    title: 'prompt text',
  },
  children: [
    {
      type: 'React.Html.span',
      children: [
        {
          type: 'React.Text',
          props: { value: 'Tooltip will show on mouse enter.' },
        },
      ],
    },
  ],
}
