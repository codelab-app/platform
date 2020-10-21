import { Text } from '../text'
import { Typography } from './Typography.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const typographyData: NodeReactI<
  | Typography.TextProps
  | Typography.TitleProps
  | Typography.ParagraphProps
  | Text.Props
> = {
  type: NodeType.React_Typography,
  children: [
    {
      type: NodeType.React_Typography_Title,
      props: {},
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Introduction',
          },
        },
      ],
    },
    {
      type: NodeType.React_Typography_Paragraph,
      props: {},
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value:
              'In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development.',
          },
        },
      ],
    },
    {
      type: NodeType.React_Typography_Paragraph,
      props: {},
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value:
              'After massive project practice and summaries, Ant Design, a design language for background applications, is refined by Ant UED Team, which aims to ',
          },
        },
        {
          type: NodeType.React_Typography_Text,
          props: {
            strong: true,
          },
          children: [
            {
              type: NodeType.React_Text,
              props: {
                value:
                  'uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end development.',
              },
            },
          ],
        },
      ],
    },
  ],
}
