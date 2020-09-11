import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { Button } from '../button'
import { Result } from './Result.types'

export const resultData: ReactNodeI<
  Result.Props | Button.Props | Text.Props
> = {
  type: 'Result',
  nodeType: 'React',
  props: {
    status: 'info',
    title: 'Your operation has been executed',
    extra: {
      type: 'Button',
      nodeType: 'React',
      props: { type: 'primary', key: 'console' },
      children: [
        { type: 'Text', nodeType: 'React', props: { value: 'Go Console' } },
      ],
    },
  },
}
