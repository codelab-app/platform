import { AtomType, NodeI } from '@codelab/frontend'

export const tooltipData: NodeI = {
  type: AtomType.ReactTooltip,
  props: {
    title: 'prompt text',
  },
  children: [
    {
      type: AtomType.ReactHtmlSpan,
      children: [
        {
          type: AtomType.ReactText,
          props: { value: 'Tooltip will show on mouse enter.' },
        },
      ],
    },
  ],
}
