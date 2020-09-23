import { Button } from '../button'
import { Text } from '../text'
import { Result } from './Result.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const resultData: NodeReactI<
  Result.Props | Button.Props | Text.Props
> = {
  type: 'React.Result',
  props: {
    status: 'info',
    title: 'Your operation has been executed',
    extra: {
      type: 'React.Button',
      props: { type: 'React.primary', key: 'console' },
      children: [
        {
          type: 'React.Text',
          props: { value: 'Go Console' },
        },
      ],
    },
  },
}
