import { Text } from '../text'
import { Divider } from './Divider.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const dividerData: NodeReactI<Divider.Props | Text.Props> = {
  type: NodeType.React_Fragment,
  children: [
    {
      type: NodeType.React_Html_P,
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo',
          },
        },
      ],
    },
    {
      type: NodeType.React_Divider,
      props: {
        orientation: 'center',
        type: 'horizontal',
      },
    },
    {
      type: NodeType.React_Html_P,
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo',
          },
        },
      ],
    },
  ],
}
