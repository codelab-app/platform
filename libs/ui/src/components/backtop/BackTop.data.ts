import { ReactNodeI } from '@codelab/graph'
import { TextProps } from '../text/Text.types'
import { BackTopProps } from './BackTop.types'

export const backtopData: ReactNodeI<BackTopProps | TextProps> = {
  type: 'Html.div',
  nodeType: 'React',
  props: { style: { height: '200vh' } },
  children: [
    {
      type: 'Text',
      nodeType: 'React',
      props: { value: 'Scroll down to see the bottom-right gray button' },
    },
    {
      type: 'BackTop',
      nodeType: 'React',
      props: { visibilityHeight: 100 },
    },
  ],
}
