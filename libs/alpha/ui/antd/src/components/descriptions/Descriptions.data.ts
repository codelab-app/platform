import { AtomType, NodeI } from '@codelab/frontend'

export const descriptionsData: NodeI = {
  type: AtomType.ReactDescriptions,
  props: {
    title: 'User Info',
  },
  children: [
    {
      type: AtomType.ReactDescriptionsItem,
      props: {
        label: 'UserName',
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Zhou Maomao',
          },
        },
      ],
    },
    {
      type: AtomType.ReactDescriptionsItem,
      props: {
        label: 'Telephone',
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: '1810000000',
          },
        },
      ],
    },
    {
      type: AtomType.ReactDescriptionsItem,
      props: {
        label: 'Live',
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Hangzhou, Zhejiang',
          },
        },
      ],
    },
    {
      type: AtomType.ReactDescriptionsItem,
      props: {
        label: 'Address',
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value:
              'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
          },
        },
      ],
    },
  ],
}
