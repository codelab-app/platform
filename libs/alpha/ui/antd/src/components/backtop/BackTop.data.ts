import { AtomType, NodeI } from '@codelab/frontend'

export const backtopData: NodeI = {
  type: AtomType.ReactHtmlDiv,
  props: { style: { height: '200vh' } },
  children: [
    {
      type: AtomType.ReactText,
      props: { value: 'Scroll down to see the bottom-right gray button' },
    },
    {
      type: AtomType.ReactBackTop,
      props: { visibilityHeight: 100 },
    },
  ],
}
