import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { Button } from '../button'
import { Select } from '../select'
import { Input } from '../input'
import { ConfigProvider } from './ConfigProvider.types'

export const configProviderData: ReactNodeI<
  ConfigProvider.Props | Text.Props | Button.Props | Select.Props | Input.Props
> = {
  type: 'ConfigProvider',
  nodeType: 'React',
  props: {
    componentSize: 'large',
  },
  children: [
    {
      type: 'Html.div',
      nodeType: 'React',
      children: [
        { type: 'Input', nodeType: 'React', props: { placeholder: 'Input' } },
      ],
    },
    {
      type: 'Html.div',
      nodeType: 'React',
      children: [
        {
          type: 'Select',
          nodeType: 'React',
          props: { defaultValue: 'Demo', options: [{ value: 'Demo' }] },
        },
      ],
    },
    {
      type: 'Html.div',
      nodeType: 'React',
      children: [{ type: 'DatePicker', nodeType: 'React' }],
    },
    {
      type: 'Html.div',
      nodeType: 'React',
      children: [
        {
          type: 'Button',
          nodeType: 'React',
          children: [
            { type: 'Text', nodeType: 'React', props: { value: 'Button' } },
          ],
        },
      ],
    },
  ],
}
