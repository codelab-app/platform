import { AtomType, NodeI } from '@codelab/frontend'

export const typographyData: NodeI = {
  type: AtomType.ReactTypography,
  children: [
    {
      type: AtomType.ReactTypographyTitle,
      props: {},
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Introduction',
          },
        },
      ],
    },
    {
      type: AtomType.ReactTypographyParagraph,
      props: {},
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value:
              'In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development.',
          },
        },
      ],
    },
    {
      type: AtomType.ReactTypographyParagraph,
      props: {},
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value:
              'After massive project practice and summaries, Ant Design, a design language for background applications, is refined by Ant UED Team, which aims to ',
          },
        },
        {
          type: AtomType.ReactTypographyText,
          props: {
            strong: true,
          },
          children: [
            {
              type: AtomType.ReactText,
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
