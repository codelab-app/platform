import { Button } from '../button'
import { Input } from '../input'
import { Select } from '../select'
import { Text } from '../text'
import { ConfigProvider } from './ConfigProvider.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const configProviderData: NodeReactI<
  ConfigProvider.Props | Text.Props | Button.Props | Select.Props | Input.Props
> = {
  type: NodeType.React_ConfigProvider,
  props: {
    componentSize: 'large',
  },
  children: [
    {
      type: NodeType.React_Html_Div,
      children: [
        {
          type: NodeType.React_Input,
          props: { placeholder: 'Input' },
        },
      ],
    },
    {
      type: NodeType.React_Html_Div,
      children: [
        {
          type: NodeType.React_Select,
          props: { defaultValue: 'Demo', options: [{ value: 'Demo' }] },
        },
      ],
    },
    {
      type: NodeType.React_Html_Div,
      children: [{ type: NodeType.React_DatePicker }],
    },
    {
      type: NodeType.React_Html_Div,
      children: [
        {
          type: NodeType.React_Button,
          children: [
            {
              type: NodeType.React_Text,
              props: { value: 'Button' },
            },
          ],
        },
      ],
    },
  ],
}
