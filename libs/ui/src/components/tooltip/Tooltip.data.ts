import { ReactNodeI } from '@codelab/graph'
import { PropsFromKeys } from '@codelab/props'
import { TextProps } from '../text/Text.types'

export const tooltipPropKeys = [
  'title',
  'arrowPointAtCenter',
  'autoAdjustOverflow',
  'defaultVisible',
  'getPopupContainer',
  'mouseEnterDelay',
  'mouseLeaveDelay',
  'overlayClassName',
  'overlayStyle',
  'placement',
  'trigger',
  'visible',
  'onVisibleChange',
  'align',
  'destroyTooltipOnHide',
] as const

type TooltipProps = PropsFromKeys<typeof tooltipPropKeys[number]>

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
