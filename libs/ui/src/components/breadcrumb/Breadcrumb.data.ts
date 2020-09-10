import { ReactNodeI } from '@codelab/shared/interface/node'
import { TextProps } from '../text/Text.types'
import { BreadcrumbProps, ItemProps, SeparatorProps } from './Breadcrumb.types'

export const breadcrumbData: ReactNodeI<
  BreadcrumbProps | ItemProps | SeparatorProps | TextProps
> = {
  type: 'Breadcrumb',
  nodeType: 'React',
  children: [
    {
      type: 'Breadcrumb.Item',
      nodeType: 'React',
      props: { href: '#' },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Home',
          },
        },
      ],
    },
    {
      type: 'Breadcrumb.Item',
      nodeType: 'React',
      props: { href: '#' },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Application Center',
          },
        },
      ],
    },
    {
      type: 'Breadcrumb.Item',
      nodeType: 'React',
      props: {
        href: '#',
        overlay: {
          type: 'Menu',
          nodeType: 'React',
          children: [
            {
              type: 'Menu.Item',
              nodeType: 'React',
              children: [
                {
                  type: 'Text',
                  nodeType: 'React',
                  props: {
                    value: 'Detail 1',
                  },
                },
              ],
            },
            {
              type: 'Menu.Item',
              nodeType: 'React',
              children: [
                {
                  type: 'Text',
                  nodeType: 'React',
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
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Application List',
          },
        },
      ],
    },
    {
      type: 'Breadcrumb.Item',
      nodeType: 'React',
      props: { href: '#' },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'An Application',
          },
        },
      ],
    },
  ],
}
