import { Button } from '../button'
import { Text } from '../text'
import { Space } from './Space.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const spaceData: NodeReactI<Space.Props | Button.Props | Text.Props> = {
  type: NodeType.React_Space,
  props: {
    size: 'middle',
  },
  children: [
    {
      type: NodeType.React_Button,
      props: { type: 'primary' },
      children: [{ type: NodeType.React_Text, props: { value: 'Primary' } }],
    },
    {
      type: NodeType.React_Button,
      props: { type: 'default' },
      children: [{ type: NodeType.React_Text, props: { value: 'Default' } }],
    },
    {
      type: NodeType.React_Button,
      props: { type: 'dashed' },
      children: [{ type: NodeType.React_Text, props: { value: 'Dashed' } }],
    },
  ],
}
