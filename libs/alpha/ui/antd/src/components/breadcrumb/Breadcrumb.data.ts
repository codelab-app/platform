import { AtomType, NodeI } from '@codelab/frontend'

export const breadcrumbData: NodeI = {
  type: AtomType.ReactBreadcrumb,
  children: [
    {
      type: AtomType.ReactBreadcrumbItem,
      props: { href: '#' },
      children: [
        {
          type: AtomType.ReactText,

          props: {
            value: 'Home',
          },
        },
      ],
    },
    {
      type: AtomType.ReactBreadcrumbItem,
      props: { href: '#' },
      children: [
        {
          type: AtomType.ReactText,

          props: {
            value: 'Application Center',
          },
        },
      ],
    },
    {
      type: AtomType.ReactBreadcrumbItem,
      props: {
        href: '#',
        overlay: {
          type: AtomType.ReactMenu,
          children: [
            {
              type: AtomType.ReactMenuItem,
              children: [
                {
                  type: AtomType.ReactText,
                  props: {
                    value: 'Detail 1',
                  },
                },
              ],
            },
            {
              type: AtomType.ReactMenuItem,
              children: [
                {
                  type: AtomType.ReactText,
                  props: {
                    value: 'Detail 2',
                  },
                },
              ],
            },
          ],
        },
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Application List',
          },
        },
      ],
    },
    {
      type: AtomType.ReactBreadcrumbItem,
      props: { href: '#' },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'An Application',
          },
        },
      ],
    },
  ],
}
