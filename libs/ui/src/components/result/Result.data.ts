import { ReactNodeI } from '@codelab/graph'
import { TextProps } from '../text/Text.types'
import { ButtonProps } from '../button/Button'
import { ResultProps } from './Result.types'

export const resultData: ReactNodeI<ResultProps | ButtonProps | TextProps> = {
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
