import { Button } from '../button'
import { Text } from '../text'
import { Affix } from './Affix.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const affixData: NodeReactDtoI<
  Affix.Props | Text.Props | Button.Props
> = {
  type: 'React.Affix',
  props: {
    offsetTop: 120,
  },
  children: [
    {
      type: 'React.Button',
      props: {
        type: 'primary',
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: '120px to affix top',
          },
        },
      ],
    },
  ],
}
