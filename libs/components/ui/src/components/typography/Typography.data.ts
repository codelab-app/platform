import { Text } from '../text'
import { Typography } from './Typography.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const typographyData: NodeReactI<
  | Typography.TextProps
  | Typography.TitleProps
  | Typography.ParagraphProps
  | Text.Props
> = {
  type: 'React.Typography',
  children: [
    {
      type: 'React.Typography.Title',
      props: {},
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Introduction',
          },
        },
      ],
    },
    {
      type: 'React.Typography.Paragraph',
      props: {},
      children: [
        {
          type: 'React.Text',
          props: {
            value:
              'In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development.',
          },
        },
      ],
    },
    {
      type: 'React.Typography.Paragraph',
      props: {},
      children: [
        {
          type: 'React.Text',
          props: {
            value:
              'After massive project practice and summaries, Ant Design, a design language for background applications, is refined by Ant UED Team, which aims to ',
          },
        },
        {
          type: 'React.Typography.Text',
          props: {
            strong: true,
          },
          children: [
            {
              type: 'React.Text',
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
