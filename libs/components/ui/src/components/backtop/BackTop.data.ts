import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { BackTop } from './BackTop.types'

export const backtopData: ReactNodeI<BackTop.Props | Text.Props> = {
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
