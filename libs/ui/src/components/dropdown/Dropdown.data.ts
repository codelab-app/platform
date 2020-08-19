import { ReactNodeI } from '@codelab/graph'
import { PropsFromKeys } from '@codelab/props'
import { TextProps } from '../text/Text'

export const dropdownPropKeys = [
  'arrow',
  'disabled',
  'getPopupContainer',
  'overlay',
  'overlayClassName',
  'overlayStyle',
  'placement',
  'trigger',
  'visible',
  'onVisibleChange',
] as const

export const dropdownButtonPropKeys = [
  'disabled',
  'icon',
  'overlay',
  'placement',
  'size',
  'trigger',
  'type',
  'visible',
  'onClick',
  'onVisibleChange',
  'buttonsRender',
] as const

type DropdownProps = PropsFromKeys<typeof dropdownPropKeys[number]>

type DropdownButtonProps = PropsFromKeys<typeof dropdownButtonPropKeys[number]>

export const dropdownData: ReactNodeI<
  DropdownProps | TextProps | DropdownButtonProps
> = {
  type: 'Dropdown',
  nodeType: 'React',
  props: {
    overlay: {
      type: 'Menu',
      nodeType: 'React',
      props: { style: { width: 120 } },
      children: [
        {
          type: 'Menu.Item',
          nodeType: 'React',
          props: {
            key: '1',
          },
          children: [
            {
              type: 'Text',
              nodeType: 'React',
              props: {
                value: 'Option 1',
              },
            },
          ],
        },
        {
          type: 'Menu.Item',
          nodeType: 'React',
          props: {
            key: '2',
          },
          children: [
            {
              type: 'Text',
              nodeType: 'React',
              props: {
                value: 'Option 2',
              },
            },
          ],
        },
      ],
    },
  },
  children: [
    {
      type: 'Html.a',
      nodeType: 'React',
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Hover me',
          },
        },
      ],
    },
  ],
}
