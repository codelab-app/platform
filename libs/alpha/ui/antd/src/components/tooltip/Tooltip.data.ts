import { Text } from '../text'
import { Tooltip } from './Tooltip.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const tooltipData: NodeReactI<Tooltip.Props | Text.Props> = {
  type: NodeType.React_Tooltip,
  props: {
    title: 'prompt text',
  },
  children: [
    {
      type: NodeType.React_Html_Span,
      children: [
        {
          type: NodeType.React_Text,
          props: { value: 'Tooltip will show on mouse enter.' },
        },
      ],
    },
  ],
}
