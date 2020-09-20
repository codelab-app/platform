import { Button } from '../button'
import { Input } from '../input'
import { Select } from '../select'
import { Text } from '../text'
import { ConfigProvider } from './ConfigProvider.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const configProviderData: NodeDtoReactI<
  ConfigProvider.Props | Text.Props | Button.Props | Select.Props | Input.Props
> = {
  type: 'React.ConfigProvider',
  props: {
    componentSize: 'large',
  },
  children: [
    {
      type: 'React.Html.div',
      children: [
        {
          type: 'React.Input',
          props: { placeholder: 'Input' },
        },
      ],
    },
    {
      type: 'React.Html.div',
      children: [
        {
          type: 'React.Select',
          props: { defaultValue: 'Demo', options: [{ value: 'Demo' }] },
        },
      ],
    },
    {
      type: 'React.Html.div',
      children: [{ type: 'React.DatePicker' }],
    },
    {
      type: 'React.Html.div',
      children: [
        {
          type: 'React.Button',
          children: [
            {
              type: 'React.Text',
              props: { value: 'Button' },
            },
          ],
        },
      ],
    },
  ],
}
