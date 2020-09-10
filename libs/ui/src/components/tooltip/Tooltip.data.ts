import { ReactNodeI } from '@codelab/shared/interface/node'
import { TextProps } from '../text/Text.types'
import { TooltipProps } from './Tooltip.types'

export const tooltipData: ReactNodeI<TooltipProps | TextProps> = {
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
