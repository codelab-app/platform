import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { Button } from '../button'
import { Space } from './Space.types'

export const spaceData: ReactNodeI<Space.Props | Button.Props | Text.Props> = {
  type: 'Space',
  nodeType: 'React',
  props: {
    size: 'middle',
  },
  children: [
    {
      type: 'Button',
      nodeType: 'React',
      props: { type: 'primary' },
      children: [
        { type: 'Text', nodeType: 'React', props: { value: 'Primary' } },
      ],
    },
    {
      type: 'Button',
      nodeType: 'React',
      props: { type: 'default' },
      children: [
        { type: 'Text', nodeType: 'React', props: { value: 'Default' } },
      ],
    },
    {
      type: 'Button',
      nodeType: 'React',
      props: { type: 'dashed' },
      children: [
        { type: 'Text', nodeType: 'React', props: { value: 'Dashed' } },
      ],
    },
  ],
}
