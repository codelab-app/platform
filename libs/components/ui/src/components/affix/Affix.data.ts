import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { Button } from '../button'
import { Affix } from './Affix.types'

export const affixData: ReactNodeI<Affix.Props | Text.Props | Button.Props> = {
  type: 'Affix',
  nodeType: 'React',
  props: {
    offsetTop: 120,
  },
  children: [
    {
      type: 'Button',
      nodeType: 'React',
      props: {
        type: 'primary',
      },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: '120px to affix top',
          },
        },
      ],
    },
  ],
}
