import { AtomType, NodeI } from '@codelab/frontend'

export const collapseData: NodeI = {
  type: AtomType.ReactCollapse,
  props: {
    defaultActiveKey: '1',
  },
  children: [
    {
      type: AtomType.ReactCollapsePanel,
      props: {
        header: 'This is panel header 1',
        key: 1,
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'This is panel text 1',
          },
        },
      ],
    },
    {
      type: AtomType.ReactCollapsePanel,
      props: {
        header: 'This is panel header 2',
        key: 2,
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'This is panel text 2',
          },
        },
      ],
    },
    {
      type: AtomType.ReactCollapsePanel,
      props: {
        header: 'This is panel header 3',
        key: 3,
        disabled: 'true',
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'This is panel text 3',
          },
        },
      ],
    },
  ],
}
