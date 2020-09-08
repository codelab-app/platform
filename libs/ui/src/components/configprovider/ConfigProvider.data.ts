import { ReactNodeI } from '@codelab/node'
import { TextProps } from '../text/Text.types'
import { ButtonProps } from '../button'
import { SelectProps } from '../select/Select.types'
import { InputProps } from '../input/Input.types'
import { ConfigProviderProps } from './ConfigProvider.types'

export const configProviderData: ReactNodeI<
  ConfigProviderProps | TextProps | ButtonProps | SelectProps | InputProps
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
