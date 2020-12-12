import { Text } from '../text'
import { BackTop } from './BackTop.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const backtopData: NodeReactI<BackTop.Props | Text.Props> = {
  type: NodeType.React_Html_Div,
  props: { style: { height: '200vh' } },
  children: [
    {
      type: NodeType.React_Text,
      props: { value: 'Scroll down to see the bottom-right gray button' },
    },
    {
      type: NodeType.React_BackTop,
      props: { visibilityHeight: 100 },
    },
  ],
}
