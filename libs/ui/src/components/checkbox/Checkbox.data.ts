import { ReactNodeI } from '@codelab/graph'
import { PropsFromKeys } from '@codelab/props'
import { TextProps } from '../text/Text'

export const checkboxPropKeys = [
  'autoFocus',
  'checked',
  'defaultChecked',
  'disabled',
  'indeterminate',
  'onChange',
] as const

export const checkboxGroupPropKeys = [
  'defaultValue',
  'disabled',
  'name',
  'options',
  'value',
  'onChange',
] as const

type CheckBoxProps = PropsFromKeys<typeof checkboxPropKeys[number]>

type CheckboxGroupProps = PropsFromKeys<typeof checkboxGroupPropKeys[number]>

export const checkboxData: ReactNodeI<
  CheckBoxProps | CheckboxGroupProps | TextProps
> = {
  type: 'Checkbox',
  nodeType: 'React',
  children: [
    {
      type: 'Text',
      nodeType: 'React',
      props: {
        value: 'Checkbox',
      },
    },
  ],
}
