import { Button } from '../button'
import { Text } from '../text'
import { Result } from './Result.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const resultData: NodeReactI<
  Result.Props | Button.Props | Text.Props
> = {
  type: NodeType.React_Result,
  props: {
    status: 'info',
    title: 'Your operation has been executed',
    extra: {
      type: NodeType.React_Button,
      props: { type: 'primary', key: 'console' },
      children: [
        {
          type: NodeType.React_Text,
          props: { value: 'Go Console' },
        },
      ],
    },
  },
}
