import { Button } from '../button'
import { Text } from '../text'
import { Affix } from './Affix.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const affixData: NodeReactI<Affix.Props | Text.Props | Button.Props> = {
  type: NodeType.React_Affix,
  props: {
    offsetTop: 120,
  },
  children: [
    {
      type: NodeType.React_Button,
      props: {
        type: 'primary',
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: '120px to affix top',
          },
        },
      ],
    },
  ],
}
